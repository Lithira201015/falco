/**
 * FALCO TRAILS SL - Tailor-Made Bespoke Trip Planner (trip-planner.js)
 * Step-by-Step Custom Trip Builder with Real-time Preference Summary
 */

(function () {
  'use strict';

  var currentStep = 1;
  var totalSteps = 5;

  var plannerForm = document.getElementById('falco-tailor-made-form');
  var progressBar = document.querySelector('.planner-progress-fill');
  var stepIndicator = document.querySelector('.planner-step-indicator');
  var stepTitle = document.querySelector('.planner-step-title');
  var btnPrev = document.getElementById('planner-btn-prev');
  var btnNext = document.getElementById('planner-btn-next');

  var stepTitles = [
    'How long would you like your Sri Lankan journey to be?',
    'Who will be exploring Sri Lanka with you?',
    'What experiences ignite your wanderlust?',
    'What is your preferred accommodation style?',
    'Where should we send your handcrafted itinerary & quote?'
  ];

  // Trip Configuration State
  var tripPreferences = {
    duration: '',
    travelDates: '',
    travelerType: '',
    guests: '2',
    interests: [],
    accommodation: '',
    fullName: '',
    email: '',
    phone: '',
    specialNotes: ''
  };

  function updateStepUI() {
    // Hide all steps
    var steps = document.querySelectorAll('.planner-step');
    steps.forEach(function (s) { s.classList.remove('active'); });

    // Show active step
    var activeStepEl = document.querySelector('.planner-step[data-step="' + currentStep + '"]');
    if (activeStepEl) activeStepEl.classList.add('active');

    // Update Progress Bar
    if (progressBar) {
      var percent = (currentStep / totalSteps) * 100;
      progressBar.style.width = percent + '%';
    }

    // Update Step Indicator & Heading
    if (stepIndicator) stepIndicator.textContent = 'Step ' + currentStep + ' of ' + totalSteps;
    if (stepTitle) stepTitle.textContent = stepTitles[currentStep - 1] || 'Design Your Custom Trail';

    // Update Buttons
    if (btnPrev) {
      btnPrev.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    }
    if (btnNext) {
      if (currentStep === totalSteps) {
        btnNext.textContent = 'Request Handcrafted Itinerary ➔';
        btnNext.style.background = '#25D366';
      } else {
        btnNext.textContent = 'Continue ➔';
        btnNext.style.background = 'var(--primary)';
      }
    }
  }

  // Handle Card Click Selection in Step 1, 2, 3, 4
  function setupCardSelectors() {
    var cards = document.querySelectorAll('.selection-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var group = this.getAttribute('data-group');
        var val = this.getAttribute('data-value');
        var isMulti = this.getAttribute('data-multi') === 'true';

        if (isMulti) {
          this.classList.toggle('selected');
          if (this.classList.contains('selected')) {
            if (!tripPreferences.interests.includes(val)) tripPreferences.interests.push(val);
          } else {
            tripPreferences.interests = tripPreferences.interests.filter(function (i) { return i !== val; });
          }
        } else {
          // Single select group
          var siblings = document.querySelectorAll('.selection-card[data-group="' + group + '"]');
          siblings.forEach(function (sib) { sib.classList.remove('selected'); });
          this.classList.add('selected');

          if (group === 'duration') tripPreferences.duration = val;
          if (group === 'travelerType') tripPreferences.travelerType = val;
          if (group === 'accommodation') tripPreferences.accommodation = val;
        }
      });
    });
  }

  // Step Validation before progressing
  function validateCurrentStep() {
    if (currentStep === 1) {
      if (!tripPreferences.duration) {
        window.FalcoSecurity.showToast('Please select your preferred tour duration.', 'error');
        return false;
      }
    } else if (currentStep === 2) {
      if (!tripPreferences.travelerType) {
        window.FalcoSecurity.showToast('Please select your traveler style.', 'error');
        return false;
      }
    } else if (currentStep === 3) {
      if (tripPreferences.interests.length === 0) {
        window.FalcoSecurity.showToast('Please choose at least one activity or trail interest.', 'error');
        return false;
      }
    } else if (currentStep === 4) {
      if (!tripPreferences.accommodation) {
        window.FalcoSecurity.showToast('Please select an accommodation preference.', 'error');
        return false;
      }
    }
    return true;
  }

  // Button Handlers
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      if (currentStep > 1) {
        currentStep--;
        updateStepUI();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      if (!validateCurrentStep()) return;

      if (currentStep < totalSteps) {
        currentStep++;
        updateStepUI();
      } else {
        // Final Step Submission
        submitCustomTrip();
      }
    });
  }

  function submitCustomTrip() {
    if (!plannerForm || !window.FalcoSecurity) return;

    var nameInput = document.getElementById('planner-name');
    var emailInput = document.getElementById('planner-email');
    var phoneInput = document.getElementById('planner-phone');
    var datesInput = document.getElementById('planner-dates');
    var notesInput = document.getElementById('planner-notes');
    var guestsInput = document.getElementById('planner-guests');

    tripPreferences.fullName = nameInput ? nameInput.value : '';
    tripPreferences.email = emailInput ? emailInput.value : '';
    tripPreferences.phone = phoneInput ? phoneInput.value : '';
    tripPreferences.travelDates = datesInput ? datesInput.value : '';
    tripPreferences.specialNotes = notesInput ? notesInput.value : '';
    if (guestsInput && guestsInput.value) tripPreferences.guests = guestsInput.value;

    // Validate using FalcoSecurity
    var result = window.FalcoSecurity.validateForm(plannerForm);
    if (!result.valid) {
      window.FalcoSecurity.showToast(result.errors.join(' '), 'error');
      return;
    }

    window.FalcoSecurity.recordSubmission();
    window.FalcoSecurity.showToast('Tailor-Made request verified! Launching secure concierge...', 'success');

    var dispatchPayload = {
      fullName: tripPreferences.fullName,
      email: tripPreferences.email,
      phone: tripPreferences.phone,
      tourPackage: 'Custom Tailor-Made Tour (' + tripPreferences.duration + ')',
      travelDates: tripPreferences.travelDates || 'Flexible',
      guests: tripPreferences.guests + ' (' + tripPreferences.travelerType + ')',
      accommodation: tripPreferences.accommodation,
      interests: tripPreferences.interests,
      specialNotes: tripPreferences.specialNotes
    };

    var waUrl = window.FalcoSecurity.createSafeWhatsAppLink(dispatchPayload);

    setTimeout(function () {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      window.location.href = 'index.html?inquiry=success';
    }, 1200);
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function () {
    setupCardSelectors();
    updateStepUI();
  });
})();
