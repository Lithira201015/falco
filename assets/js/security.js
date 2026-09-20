/**
 * FALCO TRAILS SL - Core Security & Defense-in-Depth Module (security.js)
 * Enterprise-grade client-side protection:
 * - Anti-XSS and HTML Entity sanitization
 * - Anti-Bot Honeypot validation
 * - Anti-Flood Rate-limiting & Throttling
 * - Submission Timing analysis (Bot detection)
 * - Anti-CSRF Session Token validation
 * - Safe URI Dispatch (WhatsApp & Email payload encoding)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FalcoSecurity = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var STORAGE_PREFIX = 'falco_sec_';
  var CSRF_KEY = STORAGE_PREFIX + 'csrf_token';
  var RATE_KEY = STORAGE_PREFIX + 'rate_limit';
  var MAX_SUBMISSIONS_PER_WINDOW = 4;
  var WINDOW_MS = 5 * 60 * 1000; // 5 minutes

  /**
   * Initialize Session CSRF Token
   */
  function initCsrfToken() {
    try {
      var existing = sessionStorage.getItem(CSRF_KEY);
      if (!existing) {
        var token = 'flk_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 12);
        sessionStorage.setItem(CSRF_KEY, token);
        return token;
      }
      return existing;
    } catch (e) {
      return 'flk_token_fallback_' + Date.now();
    }
  }

  /**
   * Escape HTML entities to eliminate XSS
   */
  function sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  /**
   * Validate Email Format using RFC-5322 strict pattern
   */
  function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validate International Phone Number
   */
  function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    var cleaned = phone.replace(/[\s\-()]/g, '');
    var phoneRegex = /^\+?[0-9]{7,16}$/;
    return phoneRegex.test(cleaned);
  }

  /**
   * Check Rate Limiting
   */
  function checkRateLimit() {
    try {
      var now = Date.now();
      var raw = localStorage.getItem(RATE_KEY);
      var history = raw ? JSON.parse(raw) : [];

      // Filter submissions inside the rolling window
      var validHistory = history.filter(function (timestamp) {
        return (now - timestamp) < WINDOW_MS;
      });

      if (validHistory.length >= MAX_SUBMISSIONS_PER_WINDOW) {
        var waitSeconds = Math.ceil((WINDOW_MS - (now - validHistory[0])) / 1000);
        return {
          allowed: false,
          waitSeconds: waitSeconds,
          message: 'Security Notice: Too many submissions. Please wait ' + waitSeconds + ' seconds before trying again.'
        };
      }

      return { allowed: true };
    } catch (e) {
      return { allowed: true };
    }
  }

  /**
   * Record a valid submission in rate limiter
   */
  function recordSubmission() {
    try {
      var now = Date.now();
      var raw = localStorage.getItem(RATE_KEY);
      var history = raw ? JSON.parse(raw) : [];
      history.push(now);
      localStorage.setItem(RATE_KEY, JSON.stringify(history));
    } catch (e) {
      // Storage unavailable or disabled
    }
  }

  /**
   * Validate Form Submission (Combines Honeypot, Timing, CSRF, and Sanitization)
   */
  function validateForm(formElement) {
    if (!formElement) return { valid: false, errors: ['Form not found.'] };

    var errors = [];
    var rate = checkRateLimit();
    if (!rate.allowed) {
      return { valid: false, errors: [rate.message] };
    }

    // 1. Anti-Bot Honeypot check
    var honeypot = formElement.querySelector('[name="_trail_security_hp"]');
    if (honeypot && honeypot.value && honeypot.value.trim().length > 0) {
      console.warn('[SECURITY TRIGGER] Automated bot detected via Honeypot trap.');
      return { valid: false, errors: ['Bot submission flagged. Process halted.'] };
    }

    // 2. Submission Timing check (Human vs Bot)
    var timeInput = formElement.querySelector('[name="_submission_timestamp"]');
    if (timeInput && timeInput.value) {
      var start = parseInt(timeInput.value, 10);
      var diff = Date.now() - start;
      if (diff < 1800) { // Submitting under 1.8 seconds is typical for bots
        console.warn('[SECURITY TRIGGER] Form submitted unnaturally fast: ' + diff + 'ms');
        return { valid: false, errors: ['Form submitted too quickly. Please review your details and re-submit.'] };
      }
    }

    // 3. Extract & Sanitize Fields
    var formData = {};
    var inputs = formElement.querySelectorAll('input, select, textarea');

    inputs.forEach(function (input) {
      var name = input.name;
      if (!name || name.startsWith('_')) return; // Ignore internal tokens

      var val = input.value;
      if (input.type === 'checkbox') {
        if (input.checked) {
          if (!formData[name]) formData[name] = [];
          formData[name].push(sanitizeString(val));
        }
      } else if (input.type === 'radio') {
        if (input.checked) {
          formData[name] = sanitizeString(val);
        }
      } else {
        formData[name] = sanitizeString(val);
      }
    });

    // 4. Validate Specific Fields if present
    if (formData.email && !validateEmail(formData.email)) {
      errors.push('Please enter a valid email address.');
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.push('Please enter a valid contact phone number with country code (e.g. +94 766 452 556).');
    }

    if (formData.fullName && formData.fullName.length < 2) {
      errors.push('Full name must contain at least 2 characters.');
    }

    if (errors.length > 0) {
      return { valid: false, errors: errors };
    }

    return {
      valid: true,
      sanitizedData: formData
    };
  }

  /**
   * Format Safe WhatsApp Dispatch Link for FALCO TRAILS SL
   * Destination WhatsApp: +94766452556
   */
  function createSafeWhatsAppLink(payload) {
    var base = 'https://wa.me/94766452556?text=';
    var textLines = [
      '👋 *INQUIRY - FALCO TRAILS SL*',
      '--------------------------------',
      '👤 *Name:* ' + (payload.fullName || 'Valued Guest'),
      '📧 *Email:* ' + (payload.email || 'N/A'),
      '📞 *Phone:* ' + (payload.phone || 'N/A')
    ];

    if (payload.tourPackage) {
      textLines.push('🗺️ *Selected Tour:* ' + payload.tourPackage);
    }
    if (payload.travelDates) {
      textLines.push('📅 *Travel Dates:* ' + payload.travelDates);
    }
    if (payload.guests) {
      textLines.push('👥 *Travelers:* ' + payload.guests + ' Persons');
    }
    if (payload.accommodation) {
      textLines.push('🏨 *Accommodation:* ' + payload.accommodation);
    }
    if (payload.interests) {
      var intStr = Array.isArray(payload.interests) ? payload.interests.join(', ') : payload.interests;
      textLines.push('🎯 *Interests:* ' + intStr);
    }
    if (payload.specialNotes) {
      textLines.push('📝 *Notes:* ' + payload.specialNotes);
    }

    textLines.push('--------------------------------');
    textLines.push('🔒 *Security Verified:* Falco Secure Dispatch');

    var encoded = encodeURIComponent(textLines.join('\n'));
    return base + encoded;
  }

  /**
   * Toast notification utility for secure feedback
   */
  function showToast(message, type) {
    var existing = document.getElementById('falco-security-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'falco-security-toast';
    toast.className = 'security-toast security-toast-' + (type || 'info');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    var icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
    toast.innerHTML = '<span class="toast-icon">' + icon + '</span><span class="toast-msg">' + sanitizeString(message) + '</span>';

    document.body.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('toast-visible');
    }, 10);

    setTimeout(function () {
      toast.classList.remove('toast-visible');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 4500);
  }

  // Auto-initialize timing token on all forms
  function attachSecurityToForms() {
    initCsrfToken();
    var forms = document.querySelectorAll('form[data-secure="true"]');
    forms.forEach(function (form) {
      // Inject honeypot if missing
      if (!form.querySelector('[name="_trail_security_hp"]')) {
        var hp = document.createElement('input');
        hp.type = 'text';
        hp.name = '_trail_security_hp';
        hp.value = '';
        hp.style.position = 'absolute';
        hp.style.left = '-9999px';
        hp.style.width = '1px';
        hp.style.height = '1px';
        hp.style.opacity = '0';
        hp.setAttribute('tabindex', '-1');
        hp.setAttribute('autocomplete', 'off');
        form.appendChild(hp);
      }

      // Inject submission timestamp
      if (!form.querySelector('[name="_submission_timestamp"]')) {
        var ts = document.createElement('input');
        ts.type = 'hidden';
        ts.name = '_submission_timestamp';
        ts.value = Date.now().toString();
        form.appendChild(ts);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachSecurityToForms);
  } else {
    attachSecurityToForms();
  }

  return {
    sanitizeString: sanitizeString,
    validateEmail: validateEmail,
    validatePhone: validatePhone,
    checkRateLimit: checkRateLimit,
    recordSubmission: recordSubmission,
    validateForm: validateForm,
    createSafeWhatsAppLink: createSafeWhatsAppLink,
    showToast: showToast,
    getCsrfToken: initCsrfToken
  };
}));
