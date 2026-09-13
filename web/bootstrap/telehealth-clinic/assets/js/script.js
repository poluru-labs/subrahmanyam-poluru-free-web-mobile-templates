/**
 * PoluruCare — Modern Telehealth Clinic Platform
 * Author: Subrahmanyam Poluru
 * Website: https://polurus.com
 * Brand Color: #780C28
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Doctors Data ---
  const doctors = [
    {
      id: 'doc-subrahmanyam',
      name: 'Dr. Subrahmanyam Poluru, MD, FACC',
      role: 'Chief Medical Officer & Cardiologist',
      specialty: 'cardiology',
      specialtyLabel: 'Cardiology & Internal Medicine',
      experience: '18+ Years Experience',
      rating: 4.98,
      reviewsCount: 480,
      fee: '$69',
      feeInsurance: '$15 Copay',
      languages: 'English, Telugu, Hindi',
      education: 'Harvard Medical School (MD), Stanford Cardiology Fellowship',
      bio: 'Dr. Subrahmanyam Poluru is a renowned cardiologist and internal medicine specialist with over 18 years of clinical experience. He leads the PoluruCare clinical protocol board, specializing in remote cardiovascular monitoring, hypertension management, and preventative metabolic wellness.',
      availableStatus: 'Online Now · Instant Visit',
      avatarIcon: 'bi-person-badge-fill',
      isOnline: true
    },
    {
      id: 'doc-subbu',
      name: 'Dr. Subbu Poluru, MD, FAAP',
      role: 'Head of Pediatric & Adolescent Telehealth',
      specialty: 'pediatrics',
      specialtyLabel: 'Pediatrics & Family Care',
      experience: '14+ Years Experience',
      rating: 4.95,
      reviewsCount: 390,
      fee: '$49',
      feeInsurance: '$10 Copay',
      languages: 'English, Spanish',
      education: 'Johns Hopkins School of Medicine, Boston Children’s Residency',
      bio: 'Dr. Subbu Poluru specializes in pediatric acute care, developmental screenings, childhood allergies, and virtual family medicine consultations. Known for his compassionate approach with kids and parents.',
      availableStatus: 'Available Today at 2:00 PM',
      avatarIcon: 'bi-person-heart',
      isOnline: true
    },
    {
      id: 'doc-subra',
      name: 'Dr. Subra Poluru, DO, FAPA',
      role: 'Director of Tele-Psychiatry & Behavioral Health',
      specialty: 'mental-health',
      specialtyLabel: 'Psychiatry & Behavioral Health',
      experience: '12+ Years Experience',
      rating: 4.96,
      reviewsCount: 512,
      fee: '$89',
      feeInsurance: '$20 Copay',
      languages: 'English',
      education: 'Columbia University College of Physicians, NYU Psychiatry',
      bio: 'Dr. Subra Poluru provides evidence-based tele-psychiatry, anxiety & depression therapy, ADHD management, and cognitive wellness plans in a confidential, supportive virtual setting.',
      availableStatus: 'Online Now · Slot in 15m',
      avatarIcon: 'bi-heart-pulse-fill',
      isOnline: true
    },
    {
      id: 'doc-priya',
      name: 'Dr. Priya Subbu Poluru, MD, FAAD',
      role: 'Lead Dermatologist & Tele-Derm Expert',
      specialty: 'dermatology',
      specialtyLabel: 'Dermatology & Skin Care',
      experience: '11+ Years Experience',
      rating: 4.92,
      reviewsCount: 320,
      fee: '$59',
      feeInsurance: '$15 Copay',
      languages: 'English, Hindi',
      education: 'Yale School of Medicine, UCSF Dermatology Department',
      bio: 'Dr. Priya Subbu Poluru is an expert in teledermatology, offering photo triage and live video evaluations for acne, psoriasis, eczema, atypical mole checks, and personalized topical prescriptions.',
      availableStatus: 'Available Tomorrow 9:30 AM',
      avatarIcon: 'bi-stars',
      isOnline: false
    },
    {
      id: 'doc-ananya',
      name: 'Dr. Ananya Poluru, MD',
      role: 'Primary Care & Women’s Health Specialist',
      specialty: 'primary-care',
      specialtyLabel: 'Primary Care & Women’s Health',
      experience: '9+ Years Experience',
      rating: 4.94,
      reviewsCount: 265,
      fee: '$49',
      feeInsurance: '$10 Copay',
      languages: 'English, Telugu',
      education: 'UCLA David Geffen School of Medicine, Mayo Clinic Fellow',
      bio: 'Dr. Ananya Poluru provides comprehensive primary care, annual health check-ins, routine lab result consultations, preventative health screenings, and women’s reproductive wellness.',
      availableStatus: 'Online Now · Instant Visit',
      avatarIcon: 'bi-hospital-fill',
      isOnline: true
    },
    {
      id: 'doc-arvind',
      name: 'Dr. Arvind Subra, MD',
      role: 'Urgent Care & Pulmonary Health',
      specialty: 'primary-care',
      specialtyLabel: 'Urgent Virtual Care',
      experience: '15+ Years Experience',
      rating: 4.91,
      reviewsCount: 410,
      fee: '$49',
      feeInsurance: '$10 Copay',
      languages: 'English, Spanish',
      education: 'Northwestern University Feinberg School, Emory Emergency Med',
      bio: 'Dr. Arvind Subra leads rapid response virtual triage for acute flu, respiratory symptoms, urinary tract infections, sinus flare-ups, and urgent digital prescription renewals.',
      availableStatus: 'Online Now · 5 min wait',
      avatarIcon: 'bi-activity',
      isOnline: true
    }
  ];

  // --- Doctor Specialty Filter ---
  const filterButtons = document.querySelectorAll('.th-filter-btn');
  const doctorCards = document.querySelectorAll('.th-doctor-card-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      doctorCards.forEach(card => {
        const specialty = card.getAttribute('data-specialty');
        if (filterValue === 'all' || specialty === filterValue) {
          card.style.display = 'block';
          card.classList.add('animate__animated', 'animate__fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Doctor Bio Modal ---
  const doctorModalEl = document.getElementById('doctorBioModal');
  let doctorModalInstance = null;
  if (doctorModalEl) {
    doctorModalInstance = new bootstrap.Modal(doctorModalEl);
  }

  document.addEventListener('click', function (e) {
    const viewBioBtn = e.target.closest('.js-view-doctor-bio');
    if (viewBioBtn) {
      e.preventDefault();
      const docId = viewBioBtn.getAttribute('data-doc-id');
      const doc = doctors.find(d => d.id === docId);

      if (doc && doctorModalEl) {
        document.getElementById('docModalName').textContent = doc.name;
        document.getElementById('docModalRole').textContent = doc.role;
        document.getElementById('docModalSpecialty').textContent = doc.specialtyLabel;
        document.getElementById('docModalRating').textContent = `${doc.rating} (${doc.reviewsCount} reviews)`;
        document.getElementById('docModalExp').textContent = doc.experience;
        document.getElementById('docModalLang').textContent = doc.languages;
        document.getElementById('docModalEdu').textContent = doc.education;
        document.getElementById('docModalBio').textContent = doc.bio;
        document.getElementById('docModalFee').textContent = doc.fee;
        document.getElementById('docModalFeeIns').textContent = doc.feeInsurance;

        const bookBtn = document.getElementById('docModalBookBtn');
        if (bookBtn) {
          bookBtn.setAttribute('data-doc-select', doc.id);
        }

        doctorModalInstance.show();
      }
    }
  });

  // --- Preselect Doctor in Booking Wizard ---
  document.addEventListener('click', function (e) {
    const bookDoctorBtn = e.target.closest('.js-book-doctor-direct');
    if (bookDoctorBtn) {
      e.preventDefault();
      const docId = bookDoctorBtn.getAttribute('data-doc-id');
      const doc = doctors.find(d => d.id === docId);
      
      if (doctorModalInstance) {
        doctorModalInstance.hide();
      }

      // Scroll to booking section
      const bookSection = document.getElementById('schedule');
      if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Pre-select doctor in select dropdown
      const selectDoc = document.getElementById('wizardDoctorSelect');
      if (selectDoc && doc) {
        selectDoc.value = doc.id;
        updateWizardSummary();
      }
    }
  });

  // --- Interactive Symptom Triage Tool ---
  const symptomChips = document.querySelectorAll('.th-symptom-chip');
  const triageResultBox = document.getElementById('triageResultBox');
  const triageSpecialist = document.getElementById('triageSpecialist');
  const triageDoctorName = document.getElementById('triageDoctorName');
  const triageWaitTime = document.getElementById('triageWaitTime');
  const triageActionBtn = document.getElementById('triageActionBtn');

  const triageMappings = {
    'cough-flu': {
      specialist: 'Primary & Urgent Virtual Care',
      docName: 'Dr. Arvind Subra, MD / Dr. Subrahmanyam Poluru',
      docId: 'doc-arvind',
      wait: '~5 mins wait',
      note: 'Ideal for fever, sore throat, cough, rapid flu/COVID prescriptions.'
    },
    'skin-rash': {
      specialist: 'Tele-Dermatology & Skin Specialist',
      docName: 'Dr. Priya Subbu Poluru, MD',
      docId: 'doc-priya',
      wait: 'Same-day photo & video review',
      note: 'Upload clear photos of rashes, acne, hives or suspicious spots for rapid Rx.'
    },
    'anxiety-mood': {
      specialist: 'Tele-Psychiatry & Behavioral Health',
      docName: 'Dr. Subra Poluru, DO',
      docId: 'doc-subra',
      wait: 'Slot available in 15 mins',
      note: 'Confidential 1-on-1 virtual therapy, mood evaluation & med management.'
    },
    'pediatric-fever': {
      specialist: 'Pediatrics & Child Care',
      docName: 'Dr. Subbu Poluru, MD',
      docId: 'doc-subbu',
      wait: 'Immediate pediatric queue (8m)',
      note: 'Specialized evaluation for infant fever, ear discomfort, rash & feeding issues.'
    },
    'cardio-bp': {
      specialist: 'Cardiology & Blood Pressure Care',
      docName: 'Dr. Subrahmanyam Poluru, MD, FACC',
      docId: 'doc-subrahmanyam',
      wait: 'Online Now',
      note: 'Comprehensive heart health review, BP log check & statin/ACE inhibitor review.'
    },
    'rx-refill': {
      specialist: 'Rapid Telehealth Rx Renewal',
      docName: 'Dr. Ananya Poluru, MD',
      docId: 'doc-ananya',
      wait: 'Sent to local pharmacy in 15m',
      note: 'Quick renewal for birth control, asthma inhalers, allergy & chronic medications.'
    }
  };

  symptomChips.forEach(chip => {
    chip.addEventListener('click', function () {
      symptomChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const symptomKey = this.getAttribute('data-symptom');
      const data = triageMappings[symptomKey];

      if (data && triageResultBox) {
        triageSpecialist.textContent = data.specialist;
        triageDoctorName.textContent = data.docName;
        triageWaitTime.textContent = data.wait;
        document.getElementById('triageNote').textContent = data.note;
        triageActionBtn.setAttribute('data-doc-id', data.docId);
        triageResultBox.style.display = 'block';
      }
    });
  });

  if (triageActionBtn) {
    triageActionBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const docId = this.getAttribute('data-doc-id');
      const selectDoc = document.getElementById('wizardDoctorSelect');
      if (selectDoc && docId) {
        selectDoc.value = docId;
      }
      const bookSection = document.getElementById('schedule');
      if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- Appointment Booking Wizard Logic ---
  let currentStep = 1;
  const totalSteps = 3;

  const btnNext = document.getElementById('wizardNextBtn');
  const btnPrev = document.getElementById('wizardPrevBtn');
  const wizardForm = document.getElementById('telehealthWizardForm');

  // Time slot buttons
  const timeSlotBtns = document.querySelectorAll('.th-time-slot-btn');
  let selectedTimeSlot = '02:30 PM (Today)';

  timeSlotBtns.forEach(slot => {
    slot.addEventListener('click', function () {
      timeSlotBtns.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      selectedTimeSlot = this.getAttribute('data-time') || this.textContent.trim();
      updateWizardSummary();
    });
  });

  // Wizard Select elements
  const wizardSpecialty = document.getElementById('wizardSpecialtySelect');
  const wizardDoctor = document.getElementById('wizardDoctorSelect');
  const wizardVisitType = document.getElementById('wizardVisitType');
  const wizardDateInput = document.getElementById('wizardDateInput');

  // Set default date to today
  if (wizardDateInput) {
    const today = new Date().toISOString().split('T')[0];
    wizardDateInput.value = today;
    wizardDateInput.min = today;
  }

  function updateWizardSummary() {
    const docId = wizardDoctor ? wizardDoctor.value : 'doc-subrahmanyam';
    const doc = doctors.find(d => d.id === docId) || doctors[0];
    const visitTypeVal = wizardVisitType ? wizardVisitType.value : 'HD Video Call';

    const summaryDoc = document.getElementById('summaryDoctorName');
    const summarySpec = document.getElementById('summarySpecialty');
    const summaryTime = document.getElementById('summaryDateTime');
    const summaryType = document.getElementById('summaryVisitType');
    const summaryPrice = document.getElementById('summaryTotalFee');

    if (summaryDoc) summaryDoc.textContent = doc.name;
    if (summarySpec) summarySpec.textContent = doc.specialtyLabel;
    if (summaryTime) summaryTime.textContent = `${wizardDateInput ? wizardDateInput.value : 'Today'} · ${selectedTimeSlot}`;
    if (summaryType) summaryType.textContent = visitTypeVal;
    if (summaryPrice) summaryPrice.textContent = `${doc.fee} (or ${doc.feeInsurance})`;
  }

  if (wizardSpecialty) {
    wizardSpecialty.addEventListener('change', function () {
      const spec = this.value;
      if (wizardDoctor) {
        wizardDoctor.innerHTML = '';
        const filteredDocs = (spec === 'all') ? doctors : doctors.filter(d => d.specialty === spec);
        (filteredDocs.length > 0 ? filteredDocs : doctors).forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.id;
          opt.textContent = `${d.name} (${d.specialtyLabel}) — ${d.fee}`;
          wizardDoctor.appendChild(opt);
        });
      }
      updateWizardSummary();
    });
  }

  if (wizardDoctor) {
    wizardDoctor.addEventListener('change', updateWizardSummary);
  }
  if (wizardVisitType) {
    wizardVisitType.addEventListener('change', updateWizardSummary);
  }
  if (wizardDateInput) {
    wizardDateInput.addEventListener('change', updateWizardSummary);
  }

  function showStep(step) {
    for (let i = 1; i <= totalSteps; i++) {
      const stepContent = document.getElementById(`wizardStep${i}`);
      const indicator = document.getElementById(`stepIndicator${i}`);
      if (stepContent) {
        stepContent.style.display = (i === step) ? 'block' : 'none';
      }
      if (indicator) {
        if (i < step) {
          indicator.classList.remove('active');
          indicator.classList.add('completed');
        } else if (i === step) {
          indicator.classList.add('active');
          indicator.classList.remove('completed');
        } else {
          indicator.classList.remove('active', 'completed');
        }
      }
    }

    if (btnPrev) {
      btnPrev.style.display = (step === 1) ? 'none' : 'inline-flex';
    }

    if (btnNext) {
      if (step === totalSteps) {
        btnNext.innerHTML = '<i class="bi bi-shield-check me-1"></i> Confirm & Book Consultation';
        btnNext.classList.remove('th-btn-primary');
        btnNext.classList.add('btn-success');
      } else {
        btnNext.innerHTML = 'Continue to Next Step <i class="bi bi-arrow-right ms-1"></i>';
        btnNext.classList.add('th-btn-primary');
        btnNext.classList.remove('btn-success');
      }
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      if (currentStep === 1) {
        currentStep = 2;
        showStep(currentStep);
        updateWizardSummary();
      } else if (currentStep === 2) {
        // Validation for step 2
        const pName = document.getElementById('patientFullName');
        const pEmail = document.getElementById('patientEmail');
        const pPhone = document.getElementById('patientPhone');

        if (pName && !pName.value.trim()) {
          pName.focus();
          showToast('Please provide your full name.', 'warning');
          return;
        }
        if (pEmail && (!pEmail.value.trim() || !pEmail.value.includes('@'))) {
          pEmail.focus();
          showToast('Please enter a valid email address.', 'warning');
          return;
        }
        if (pPhone && !pPhone.value.trim()) {
          pPhone.focus();
          showToast('Please enter your contact phone number.', 'warning');
          return;
        }

        currentStep = 3;
        showStep(currentStep);
        updateWizardSummary();
      } else if (currentStep === 3) {
        // Complete booking
        const bookingRef = 'POLURU-' + Math.floor(100000 + Math.random() * 900000);
        const pName = document.getElementById('patientFullName')?.value || 'Subbu K.';
        const docId = wizardDoctor ? wizardDoctor.value : 'doc-subrahmanyam';
        const doc = doctors.find(d => d.id === docId) || doctors[0];

        document.getElementById('confirmBookingRef').textContent = bookingRef;
        document.getElementById('confirmPatientName').textContent = pName;
        document.getElementById('confirmDoctorName').textContent = doc.name;
        document.getElementById('confirmDateTime').textContent = `${wizardDateInput ? wizardDateInput.value : 'Today'} at ${selectedTimeSlot}`;
        document.getElementById('confirmVisitType').textContent = wizardVisitType ? wizardVisitType.value : 'HD Video Call';

        const confirmationModalEl = document.getElementById('bookingConfirmationModal');
        if (confirmationModalEl) {
          const confirmModal = new bootstrap.Modal(confirmationModalEl);
          confirmModal.show();
        }

        // Reset wizard
        currentStep = 1;
        showStep(currentStep);
        if (wizardForm) wizardForm.reset();
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }

  // --- Insurance Checker Simulator ---
  const checkInsuranceBtn = document.getElementById('checkInsuranceBtn');
  const insuranceResult = document.getElementById('insuranceCheckResult');
  if (checkInsuranceBtn) {
    checkInsuranceBtn.addEventListener('click', function () {
      const provider = document.getElementById('insuranceProviderSelect')?.value;
      const memberId = document.getElementById('insuranceMemberId')?.value.trim();

      if (!memberId) {
        showToast('Please enter your Member or Policy ID to check eligibility.', 'warning');
        return;
      }

      checkInsuranceBtn.disabled = true;
      checkInsuranceBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Verifying with Provider...';

      setTimeout(() => {
        checkInsuranceBtn.disabled = false;
        checkInsuranceBtn.innerHTML = '<i class="bi bi-search me-1"></i> Verify Coverage';

        if (insuranceResult) {
          insuranceResult.style.display = 'block';
          insuranceResult.className = 'alert alert-success mt-3';
          insuranceResult.innerHTML = `
            <div class="d-flex align-items-center gap-2 mb-1">
              <i class="bi bi-check-circle-fill fs-5 text-success"></i>
              <strong>In-Network Coverage Confirmed!</strong>
            </div>
            <p class="mb-1 text-muted small">
              Your <strong>${provider || 'Plan'}</strong> plan qualifies for 100% covered virtual urgent care visits with a standard <strong>$10.00 copay</strong>. E-prescriptions sent with $0 copay tier.
            </p>
          `;
        }
      }, 900);
    });
  }

  // --- FAQs Live Search & Category Filter ---
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqCategoryBtns = document.querySelectorAll('.th-faq-cat-btn');
  const faqAccordionItems = document.querySelectorAll('.th-faq-item');

  function filterFAQs() {
    const query = faqSearchInput ? faqSearchInput.value.toLowerCase().trim() : '';
    const activeCategoryBtn = document.querySelector('.th-faq-cat-btn.active');
    const selectedCategory = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-cat') : 'all';

    let matchCount = 0;

    faqAccordionItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const text = item.textContent.toLowerCase();

      const matchesCat = (selectedCategory === 'all' || category === selectedCategory);
      const matchesQuery = (!query || text.includes(query));

      if (matchesCat && matchesQuery) {
        item.style.display = 'block';
        matchCount++;
      } else {
        item.style.display = 'none';
      }
    });

    const noResults = document.getElementById('faqNoResults');
    if (noResults) {
      noResults.style.display = (matchCount === 0) ? 'block' : 'none';
    }
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', filterFAQs);
  }

  faqCategoryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      faqCategoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterFAQs();
    });
  });

  // --- Video Room Simulator Modal Interactivity ---
  const videoModalEl = document.getElementById('videoRoomModal');
  const muteMicBtn = document.getElementById('videoMuteMicBtn');
  const muteCamBtn = document.getElementById('videoMuteCamBtn');
  const selfVideoFeed = document.getElementById('selfVideoFeed');
  const roomStatus = document.getElementById('videoRoomStatus');

  let isMicMuted = false;
  let isCamOff = false;

  if (muteMicBtn) {
    muteMicBtn.addEventListener('click', function () {
      isMicMuted = !isMicMuted;
      this.classList.toggle('active', isMicMuted);
      this.innerHTML = isMicMuted ? '<i class="bi bi-mic-mute-fill"></i>' : '<i class="bi bi-mic-fill"></i>';
      showToast(isMicMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
    });
  }

  if (muteCamBtn) {
    muteCamBtn.addEventListener('click', function () {
      isCamOff = !isCamOff;
      this.classList.toggle('active', isCamOff);
      this.innerHTML = isCamOff ? '<i class="bi bi-camera-video-off-fill"></i>' : '<i class="bi bi-camera-video-fill"></i>';
      if (selfVideoFeed) {
        selfVideoFeed.style.backgroundColor = isCamOff ? '#1E293B' : '#334155';
        selfVideoFeed.innerHTML = isCamOff ? '<i class="bi bi-person-x fs-3"></i>' : '<span class="text-white small">Your Camera</span>';
      }
      showToast(isCamOff ? 'Camera turned off' : 'Camera turned on', 'info');
    });
  }

  if (videoModalEl) {
    videoModalEl.addEventListener('show.bs.modal', function () {
      if (roomStatus) {
        roomStatus.innerHTML = '<span class="spinner-grow spinner-grow-sm text-success me-2"></span>Encrypted Telehealth Session Active · Dr. Subrahmanyam Poluru Connected';
      }
    });
  }

  // --- Patient Portal Mock Login Form ---
  const portalLoginForm = document.getElementById('portalLoginForm');
  if (portalLoginForm) {
    portalLoginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const loginBtn = this.querySelector('button[type="submit"]');
      if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Authenticating HIPAA ID...';
      }

      setTimeout(() => {
        if (loginBtn) {
          loginBtn.disabled = false;
          loginBtn.innerHTML = '<i class="bi bi-box-arrow-in-right me-1"></i> Sign In to Portal';
        }
        showToast('Welcome back, Subbu! Redirecting to secure patient health records...', 'success');
        const loginModalEl = document.getElementById('patientPortalModal');
        if (loginModalEl) {
          const loginModal = bootstrap.Modal.getInstance(loginModalEl);
          if (loginModal) loginModal.hide();
        }
      }, 1000);
    });
  }

  // --- Navbar Scroll Shadow ---
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // --- Toast Notification Helper ---
  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container position-fixed bottom-0 start-50 translate-middle-x p-3';
      container.style.zIndex = '1100';
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type === 'warning' ? 'dark' : (type === 'success' ? 'success' : 'dark')} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${type === 'success' ? 'bi-check-circle-fill text-success' : 'bi-info-circle-fill text-warning'}"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    container.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }

  // Initial Summary Setup
  updateWizardSummary();
});
