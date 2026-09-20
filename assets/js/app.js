/**
 * FALCO TRAILS SL - Core Application Logic (app.js)
 * Navigation, Tour Catalog Data, Modal Timeline Viewer, Filter Tabs, and Inquiries
 */

(function () {
  'use strict';

  // Tour Catalog Data Store
  var TOURS_DATA = [
    {
      id: 'knuckles-highland-trek',
      title: 'Knuckles & Central Highlands Trekking Expedition',
      category: 'trekking',
      categoryLabel: 'Trekking & Hiking',
      duration: '8 Days / 7 Nights',
      route: 'Colombo → Kandy → Knuckles → Ella → Horton Plains',
      image: 'assets/images/hero-bg.jpg',
      price: '$1,290',
      summary: 'Venture off the beaten track into the UNESCO World Heritage Knuckles Range, remote cloud forests, pristine waterfalls, and Ella’s dramatic ridges.',
      highlights: ['Knuckles Cloud Forest Trek', 'Mini World’s End & River Basecamps', 'Ella Rock & Little Adam’s Peak', 'Horton Plains World’s End'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival & Scenic Transfer to Kandy', desc: 'Warm VIP greeting at Bandaranaike International Airport by your private Falco Trails naturalist-chauffeur. Scenic drive to Kandy, check-in at luxury eco-lodge.' },
        { day: 'Day 2', title: 'Sacred Kandy & Udawatta Kele Forest', desc: 'Morning visit to the Temple of the Sacred Tooth Relic. Afternoon hike in Udawatta Kele Sanctuary spotting endemic avian species.' },
        { day: 'Day 3', title: 'Into the Knuckles Wilderness Range', desc: 'Full-day deep trek through terraced paddy fields, endemic pine forests, and cascading mountain streams. Overnight at a secluded safari glamping camp.' },
        { day: 'Day 4', title: 'Five Peaks Ridge & Hidden Waterfalls', desc: 'Challenging high-altitude trek across the rugged Knuckles ridges with panoramic views. Swim in crystal natural rock pools.' },
        { day: 'Day 5', title: 'Scenic Hill Country Rail to Ella', desc: 'Board the legendary Ceylon blue observation train winding through emerald tea mountains, mist-draped viaducts, and remote hamlets.' },
        { day: 'Day 6', title: 'Ella Rock Ascent & Nine Arch Viaduct', desc: 'Early morning sunrise hike to Ella Rock summit overlooking the southern plains. Sunset walk to the architectural marvel of the Nine Arch Bridge.' },
        { day: 'Day 7', title: 'Horton Plains & Baker’s Falls', desc: 'Dawn expedition to Horton Plains National Park plateau, peering down the 880-meter vertical drop of World’s End and Baker’s Falls.' },
        { day: 'Day 8', title: 'Descent to Colombo / Airport Departure', desc: 'Leisurely organic breakfast, private transfer to Kotugoda / Colombo Airport with unforgettable memories of Sri Lanka’s untamed trails.' }
      ],
      inclusions: [
        'Private luxury AC 4x4 / Chauffeur-Guide throughout',
        '7 Nights luxury boutique eco-lodges & glamping',
        'Daily breakfast & select gourmet trail lunches',
        'Knuckles conservation permits & professional trekking trackers',
        'Scenic 1st class reserved hill country train tickets',
        'Horton Plains National Park entrance fees',
        '24/7 Falco Trails dedicated tour concierge support'
      ],
      exclusions: [
        'International flights & visa fees',
        'Travel insurance',
        'Alcoholic beverages & personal expenditures'
      ]
    },
    {
      id: 'wild-ceylon-safari',
      title: 'Untamed Wildlife & Leopard Safari Expedition',
      category: 'wildlife',
      categoryLabel: 'Wildlife & Safari',
      duration: '9 Days / 8 Nights',
      route: 'Wilpattu → Sigiriya → Minneriya → Yala → Galle',
      image: 'assets/images/yala-safari.jpg',
      price: '$1,580',
      summary: 'Experience Sri Lanka’s big game: highest density leopard habitats in Yala, Asian elephant gatherings, and primeval wilderness safaris.',
      highlights: ['Yala Block 1 & 5 Leopard Safaris', 'Minneriya Great Elephant Gathering', 'Wilpattu Leopard & Sloth Bear Tracking', 'Mirissa Blue Whale Marine Safari'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival & Wilpattu Gateway', desc: 'Airport pickup and private transfer to a boutique safari camp bordering Wilpattu National Park.' },
        { day: 'Day 2', title: 'Wilpattu Willu Safari', desc: 'Full-day game drive searching for Sri Lankan leopards and elusive sloth bears around natural rainwater basins.' },
        { day: 'Day 3', title: 'Cultural Triangle & Minneriya Elephants', desc: 'Drive to Habarana. Afternoon open-top 4x4 safari witnessing hundreds of wild elephants grazing on Minneriya reservoir banks.' },
        { day: 'Day 4', title: 'Sigiriya Rock & Country Village Walk', desc: 'Early morning climb of the 5th-century Sigiriya Lion Rock citadel before midday heat. Authentic traditional village lunch.' },
        { day: 'Day 5', title: 'Journey South to Yala Wilderness', desc: 'Scenic transition across the central plains toward the arid southern coast. Check-in at an award-winning eco-safari retreat.' },
        { day: 'Day 6', title: 'Dawn & Dusk Yala Game Drives', desc: 'Two dedicated private 4x4 safaris inside Yala National Park guided by Falco Trails wildlife experts.' },
        { day: 'Day 7', title: 'Coastal Udawalawe Elephant Transit', desc: 'Visit the Udawalawe Elephant Transit Home for rehabilitated orphan calves before heading to the Indian Ocean coast.' },
        { day: 'Day 8', title: 'Mirissa Blue Whale Cruise & Galle Fort', desc: 'Private morning catamaran charter searching for Blue Whales and playful dolphins. Sunset walk on Galle Dutch Fort ramparts.' },
        { day: 'Day 9', title: 'Colombo / Departure', desc: 'Coastal highway return to Colombo or Airport.' }
      ],
      inclusions: [
        'Exclusive private safari jeeps with expert wildlife naturalists',
        '8 Nights luxury safari lodges & coastal boutique villas',
        'All national park permits, tracker fees & government taxes',
        'Private whale watching boat expedition in Mirissa',
        'Full board meals on safari days'
      ],
      exclusions: [
        'Gratuities for safari trackers',
        'Personal camera permits where applicable'
      ]
    },
    {
      id: 'heritage-tea-trail',
      title: 'Ancient Kingdoms & High Tea Trails Odyssey',
      category: 'culture',
      categoryLabel: 'Culture & Heritage',
      duration: '7 Days / 6 Nights',
      route: 'Colombo → Sigiriya → Polonnaruwa → Kandy → Nuwara Eliya',
      image: 'assets/images/sigiriya.jpg',
      price: '$1,150',
      summary: 'Discover 2,500 years of civilization, UNESCO archaeological treasures, cave temples, and royal colonial Ceylon tea bungalows.',
      highlights: ['Sigiriya Lion Rock Fortress', 'Polonnaruwa Ancient Royal City', 'Dambulla Golden Cave Temple', 'Colonial Tea Factory Private Tasting'],
      itinerary: [
        { day: 'Day 1', title: 'Colombo to Cultural Heartland', desc: 'Greeted at airport; private travel to Dambulla. Afternoon tour of the 2,000-year-old painted cave monasteries.' },
        { day: 'Day 2', title: 'Sigiriya Citadel & Rural Catamaran Ride', desc: 'Ascend the iconic Lion Rock fortress. Afternoon catamaran boat ride on an ancient man-made irrigation reservoir.' },
        { day: 'Day 3', title: 'Polonnaruwa Medieval Kingdom by Bicycle', desc: 'Cycle through the ancient capital’s stone palaces, monumental stupas, and the Gal Vihara rock-carved Buddhas.' },
        { day: 'Day 4', title: 'Spice Hills & Sacred Kandy', desc: 'Journey to Kandy visiting organic spice gardens in Matale. Evening cultural dance performance and Temple of the Tooth Relic.' },
        { day: 'Day 5', title: 'Misty Nuwara Eliya & Tea Estates', desc: 'Climb into Little England. Private tour of a functioning artisan tea factory with master tea sommelier.' },
        { day: 'Day 6', title: 'Ramboda Waterfalls & Colonial High Tea', desc: 'Hike to the roaring twin cascades of Ramboda Falls. Afternoon high tea at a heritage colonial club.' },
        { day: 'Day 7', title: 'Return via Kotugoda to Airport', desc: 'Picturesque descent through rubber and coconut groves to Kotugoda and airport.' }
      ],
      inclusions: [
        'Private Chauffeur-Guide throughout with fuel & tolls',
        '6 Nights heritage luxury accommodation',
        'All UNESCO monument entrance fees & cycling gear',
        'Master tea tasting session & factory entrance'
      ],
      exclusions: ['Personal expenses & tips']
    },
    {
      id: 'scenic-train-tea-country',
      title: 'The Iconic Scenic Rail & Misty Peaks Escape',
      category: 'luxury',
      categoryLabel: 'Scenic & Luxury',
      duration: '6 Days / 5 Nights',
      route: 'Kandy → Nuwara Eliya → Ella → Nine Arch Bridge',
      image: 'assets/images/ella-train.jpg',
      price: '$980',
      summary: 'Ride one of the world’s most scenic railway routes through rolling emerald tea carpets, cloud forests, and dramatic mountain ravines.',
      highlights: ['World-Famous Blue Train Journey', 'Nine Arch Bridge Sunset Trek', 'Lipton’s Seat Tea Panorama', 'Luxury Boutique Hill Bungalows'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival & Scenic Kandy Foothills', desc: 'Pickup from airport or hotel; transfer to Kandy luxury hillside estate.' },
        { day: 'Day 2', title: 'The Great Tea Railway Experience', desc: 'Board the reserved observation carriage. Gaze at dramatic mountain passes and gushing waterfalls.' },
        { day: 'Day 3', title: 'Nuwara Eliya to Ella Scenic Crossing', desc: 'Traverse the highest railway elevation in Sri Lanka into vibrant Ella mountain village.' },
        { day: 'Day 4', title: 'Nine Arch Bridge & Little Adam’s Peak', desc: 'Photographic walking trail to Nine Arch Bridge and sunset hike to Little Adam’s Peak.' },
        { day: 'Day 5', title: 'Lipton’s Seat Sunrise & Dambatenne', desc: 'Sunrise 4x4 ascent to Lipton’s Seat where Sir Thomas Lipton surveyed his vast tea empire.' },
        { day: 'Day 6', title: 'Return to Airport', desc: 'Comfortable private chauffeur transfer back to the airport.' }
      ],
      inclusions: [
        'First-class train observation carriage tickets',
        '5 Nights boutique luxury colonial suites',
        'Private chauffeur transfer accompanying train luggage',
        'Guided hikes with Falco Trails local trail guides'
      ],
      exclusions: ['Travel insurance']
    },
    {
      id: 'coastal-galle-southern-trail',
      title: 'Southern Coast, Whales & Galle Maritime Trail',
      category: 'luxury',
      categoryLabel: 'Coastal & Marine',
      duration: '6 Days / 5 Nights',
      route: 'Colombo → Bentota → Galle Fort → Mirissa → Tangalle',
      image: 'assets/images/galle-fort.jpg',
      price: '$1,080',
      summary: 'Golden sandy beaches, UNESCO maritime fortress history, sea turtle conservation, and azure Indian Ocean whale watching.',
      highlights: ['Galle Dutch Fort Heritage Walk', 'Mirissa Whale & Dolphin Cruise', 'Madu River Mangrove Boat Safari', 'Beachside Boutique Villa Relaxation'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival & Coastal Transfer', desc: 'Scenic ocean-view expressway drive to the golden palm-fringed coast.' },
        { day: 'Day 2', title: 'Madu River Safari & Turtle Sanctuary', desc: 'Explore coastal mangrove islets by boat and visit a community-led sea turtle hatchery.' },
        { day: 'Day 3', title: 'Historic Galle Fort & Sunset Ramparts', desc: 'Private walking tour of 17th-century ramparts, cobblestone alleys, and artisan cafes.' },
        { day: 'Day 4', title: 'Mirissa Blue Whale Watching', desc: 'Early morning sea excursion to spot the largest mammal on earth in its natural migration corridor.' },
        { day: 'Day 5', title: 'Southern Surf, Sun & Ayurveda', desc: 'Relax at your beach boutique resort with rejuvenating herbal Ayurvedic oil massage.' },
        { day: 'Day 6', title: 'Airport Departure', desc: 'Private transfer to Kotugoda / Colombo Airport.' }
      ],
      inclusions: [
        '5 Nights ocean-view luxury boutique resorts',
        'Private chauffeur guide & transport',
        'Whale watching yacht excursion & river boat permits'
      ],
      exclusions: ['Personal shopping & gratuities']
    }
  ];

  // DOM Elements
  var header = document.querySelector('.main-header');
  var mobileToggle = document.querySelector('.mobile-toggle');
  var mobileDrawer = document.querySelector('.mobile-drawer');
  var drawerOverlay = document.querySelector('.drawer-overlay');
  var drawerClose = document.querySelector('.drawer-close');
  var backToTopBtn = document.querySelector('.btn-back-to-top');

  var tourGrid = document.getElementById('tour-grid-container');
  var filterButtons = document.querySelectorAll('.filter-btn');

  // Modal Elements
  var modalBackdrop = document.getElementById('itinerary-modal-backdrop');
  var modalCloseBtn = document.getElementById('modal-close-button');
  var modalHeroImg = document.getElementById('modal-hero-img');
  var modalTourTitle = document.getElementById('modal-tour-title');
  var modalTourMeta = document.getElementById('modal-tour-meta');
  var modalTimeline = document.getElementById('modal-timeline-container');
  var modalInclusions = document.getElementById('modal-inclusions-list');
  var modalExclusions = document.getElementById('modal-exclusions-list');
  var modalWaBtn = document.getElementById('modal-wa-book-btn');

  // 1. Header Scroll Effect
  function handleScroll() {
    var scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (header) {
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Drawer
  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // 3. Render Tour Cards
  function renderTours(category) {
    if (!tourGrid) return;
    tourGrid.innerHTML = '';

    var filtered = TOURS_DATA;
    if (category && category !== 'all') {
      filtered = TOURS_DATA.filter(function (t) {
        return t.category === category;
      });
    }

    filtered.forEach(function (tour) {
      var card = document.createElement('article');
      card.className = 'tour-card';
      card.setAttribute('data-id', tour.id);

      var highlightsHtml = tour.highlights.map(function (h) {
        return '<span class="highlight-tag">' + h + '</span>';
      }).join('');

      card.innerHTML = 
        '<div class="tour-card-img-wrap">' +
          '<img src="' + tour.image + '" alt="' + tour.title + '" class="tour-card-img" loading="lazy" />' +
          '<span class="tour-badge-duration">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>' +
            tour.duration +
          '</span>' +
          '<span class="tour-badge-category">' + tour.categoryLabel + '</span>' +
        '</div>' +
        '<div class="tour-card-body">' +
          '<div class="tour-route-preview">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>' +
            tour.route +
          '</div>' +
          '<h3 class="tour-card-title">' + tour.title + '</h3>' +
          '<p class="tour-card-summary">' + tour.summary + '</p>' +
          '<div class="tour-highlights-list">' + highlightsHtml + '</div>' +
          '<div class="tour-card-footer">' +
            '<div class="tour-price-box">' +
              '<span class="tour-price-label">From</span>' +
              '<span class="tour-price-value">' + tour.price + ' <small style="font-size:0.75rem;font-weight:400;color:var(--text-muted)">/ person</small></span>' +
            '</div>' +
            '<button class="btn-view-itinerary" data-tour-id="' + tour.id + '">' +
              'View Itinerary' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>';

      tourGrid.appendChild(card);
    });

    // Attach event listeners to newly rendered "View Itinerary" buttons
    var detailBtns = tourGrid.querySelectorAll('.btn-view-itinerary');
    detailBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-tour-id');
        openItineraryModal(id);
      });
    });
  }

  // 4. Category Filter Buttons
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var cat = this.getAttribute('data-filter');
      renderTours(cat);
    });
  });

  // 5. Open Itinerary Modal
  function openItineraryModal(tourId) {
    var tour = TOURS_DATA.find(function (t) { return t.id === tourId; });
    if (!tour || !modalBackdrop) return;

    if (modalHeroImg) modalHeroImg.src = tour.image;
    if (modalTourTitle) modalTourTitle.textContent = tour.title;
    if (modalTourMeta) {
      modalTourMeta.innerHTML = 
        '<span>⏱️ ' + tour.duration + '</span> • ' +
        '<span>📍 ' + tour.route + '</span> • ' +
        '<span>🏷️ From ' + tour.price + '</span>';
    }

    // Populate Day-by-Day Timeline
    if (modalTimeline) {
      modalTimeline.innerHTML = tour.itinerary.map(function (step) {
        return (
          '<div class="timeline-step">' +
            '<span class="timeline-bullet"></span>' +
            '<h5 class="timeline-day-title">' + step.day + ': ' + step.title + '</h5>' +
            '<p class="timeline-day-desc">' + step.desc + '</p>' +
          '</div>'
        );
      }).join('');
    }

    // Populate Inclusions
    if (modalInclusions) {
      modalInclusions.innerHTML = tour.inclusions.map(function (inc) {
        return '<li><span style="color:#0d5c3a;font-weight:bold">✓</span> ' + inc + '</li>';
      }).join('');
    }

    // Populate Exclusions
    if (modalExclusions) {
      modalExclusions.innerHTML = tour.exclusions.map(function (exc) {
        return '<li><span style="color:#c53929;font-weight:bold">✕</span> ' + exc + '</li>';
      }).join('');
    }

    // Configure WhatsApp Direct Book Button
    if (modalWaBtn) {
      modalWaBtn.onclick = function () {
        var waUrl = window.FalcoSecurity ? 
          window.FalcoSecurity.createSafeWhatsAppLink({
            fullName: 'Website Traveler',
            tourPackage: tour.title + ' (' + tour.duration + ')',
            specialNotes: 'I am interested in booking this itinerary. Please advise availability and tailored customization.'
          }) :
          'https://wa.me/94766452556?text=' + encodeURIComponent('Inquiry for ' + tour.title);

        window.open(waUrl, '_blank', 'noopener,noreferrer');
      };
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeItineraryModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeItineraryModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeItineraryModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeItineraryModal();
      closeDrawer();
    }
  });

  // 6. Homepage Finder Bar Execution
  var finderForm = document.getElementById('home-finder-form');
  if (finderForm) {
    finderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var destination = document.getElementById('finder-dest') ? document.getElementById('finder-dest').value : '';
      var tourType = document.getElementById('finder-type') ? document.getElementById('finder-type').value : '';
      var duration = document.getElementById('finder-duration') ? document.getElementById('finder-duration').value : '';

      // Direct to tours section or filter immediately
      var toursSection = document.getElementById('tours-catalog-section');
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: 'smooth' });
        if (tourType && tourType !== 'all') {
          var matchingBtn = document.querySelector('.filter-btn[data-filter="' + tourType + '"]');
          if (matchingBtn) matchingBtn.click();
        }
      } else {
        // If on another page, redirect to tours.html
        window.location.href = 'tours.html?type=' + encodeURIComponent(tourType) + '&dest=' + encodeURIComponent(destination);
      }
    });
  }

  // 7. General Inquiry Form with 100% Security Validation
  var inquiryForms = document.querySelectorAll('form[data-secure="true"]');
  inquiryForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!window.FalcoSecurity) return;

      var result = window.FalcoSecurity.validateForm(form);
      if (!result.valid) {
        window.FalcoSecurity.showToast(result.errors.join(' '), 'error');
        return;
      }

      window.FalcoSecurity.recordSubmission();
      window.FalcoSecurity.showToast('Security Verified: Directing your inquiry safely to Falco Trails SL Concierge...', 'success');

      var waUrl = window.FalcoSecurity.createSafeWhatsAppLink(result.sanitizedData);

      setTimeout(function () {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        form.reset();
      }, 1000);
    });
  });

  // Initial render on page load
  renderTours('all');

  // Export tours data for other pages if needed
  window.FalcoToursData = TOURS_DATA;
})();
