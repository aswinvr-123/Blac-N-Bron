/**
 * BLAC N BRON — EXCEPTIONAL AUDIO-VISUAL EXPERIENCES
 * Cinematic Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Navigation & Header Transition ---
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Menu Drawer ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 3. Scroll Reveal Animations (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 4. Portfolio Data & Filtering ---
  const projectDatabase = {
    '1': {
      title: 'The Malabar Grand Cinema',
      category: 'Luxury Home Theatres',
      location: 'Kozhikode, Kerala',
      image: 'assets/images/hero_cinema.jpg',
      desc: 'An ultra-luxury 9.4.6 Dolby Atmos private theatre engineered with custom acoustic velvet wall assemblies, 4K HDR laser cinema projection onto a 180" acoustically transparent woven screen, and bespoke dual-tier motorized Italian leather recliners.',
      specs: {
        'Acoustics': 'Custom Fabric Slat Baffles',
        'Display': '180" Micro-Perforated 4K',
        'Sound': '9.4.6 Spatial Audio Rig',
        'Seating': 'Dual-Tier Motorized Leather'
      }
    },
    '2': {
      title: 'Skyline Private Screening Lounge',
      category: 'Private Cinemas',
      location: 'Wayanad Road, Kozhikode',
      image: 'assets/images/about_theatre.jpg',
      desc: 'Bespoke residential cinema designed seamlessly within high-ceiling architectural woodwork. Features acoustic diffusion concealed within fluted walnut panels and calibrated Reference Floorstanding Monitors with low-frequency boundary compensation.',
      specs: {
        'Acoustics': 'Concealed Walnut Diffusers',
        'Display': '150" Ultra-Bright Cinema Screen',
        'Sound': '7.2.4 Architectural Surround',
        'Atmosphere': 'Fiber-Optic Star Constellation'
      }
    },
    '3': {
      title: 'Horizon Club House Theatre',
      category: 'Club House Theatres',
      location: 'Malappuram, Kerala',
      image: 'assets/images/club_theatre.jpg',
      desc: 'A premium 24-seat community screening theatre built for luxury residential enclave clubhouses. Includes curved cinemascope display, multi-tier velvet club lounges, acoustic ceiling islands, and a rear hospitality lounge.',
      specs: {
        'Capacity': '24-Seat Tiered Club Seating',
        'Display': 'Panoramic Curved Screen',
        'Sound': 'High SPL Commercial Audio',
        'Integration': 'Automated Scene Lighting'
      }
    },
    '4': {
      title: 'Calyx Master Recording Suite',
      category: 'Recording Studios',
      location: 'Kozhikode, Kerala',
      image: 'assets/images/studio_recording.jpg',
      desc: 'Purpose-engineered sound recording control room featuring QRD (Quadratic Residue Diffusers), floating room-within-a-room acoustic decoupling, audiophile main monitors, and zero-resonance mixing ergonomics.',
      specs: {
        'Isolation': 'NC-15 Floating Acoustic Shell',
        'Diffusion': 'Solid Walnut QRD Panels',
        'Monitoring': 'Active 3-Way Midfield System',
        'Certification': 'Mastering Grade Acoustic Spec'
      }
    },
    '5': {
      title: 'Acoustic Architectural Treatment',
      category: 'Acoustic Installations',
      location: 'Chalappuram, Kozhikode',
      image: 'assets/images/acoustic_design.jpg',
      desc: 'Precision architectural acoustic design integrating sound dampening micro-perforated baffles with warm ambient LED reveals. Eliminates flutter echoes while elevating the visual elegance of the living space.',
      specs: {
        'Material': 'Perforated Acoustic Timber',
        'Absorption': 'NRC 0.90 Broadband Rating',
        'Lighting': 'Bronze LED Linear Channels',
        'Finish': 'American Dark Walnut'
      }
    },
    '6': {
      title: 'Bespoke Cinema Recliners',
      category: 'Theatre Seating',
      location: 'Kochi, Kerala',
      image: 'assets/images/theatre_seating.jpg',
      desc: 'Custom-configured motorized recliner seating crafted in supple dark charcoal leather with bronze diamond-stitch embroidery, dual silent whisper-motors, illuminated LED bronze cup holders, and individual USB charging.',
      specs: {
        'Mechanism': 'Dual Motor Lumbar & Footrest',
        'Upholstery': 'Full Grain Italian Leather',
        'Accents': 'Warm Bronze Illuminated Rings',
        'Ergonomics': 'High-Density Memory Foam'
      }
    },
    '7': {
      title: 'The Calicut Penthouse Cinema',
      category: 'Luxury Home Theatres',
      location: 'Calicut Beach, Kerala',
      image: 'assets/images/private_cinema_works.jpg',
      desc: 'Minimalist contemporary private theatre featuring high-contrast ambient light rejecting projection, deep espresso custom sectional seating, perimeter ambient lighting, and flush architectural in-wall speakers.',
      specs: {
        'Screen': '140" ALR Ambient Light Screen',
        'Sound': 'Invisible Flush Wall System',
        'Control': 'Single-Touch iPad Master UI',
        'Design': 'Modern Charcoal & Teak'
      }
    }
  };

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      workItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 5. Project Modal Lightbox ---
  const modal = document.getElementById('projectModal');
  const modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;
  const modalCloseBtn = modal ? modal.querySelector('.modal-close-btn') : null;
  const modalImg = modal ? document.getElementById('modalImage') : null;
  const modalCat = modal ? document.getElementById('modalCategory') : null;
  const modalTitle = modal ? document.getElementById('modalTitle') : null;
  const modalLoc = modal ? document.getElementById('modalLocation') : null;
  const modalDesc = modal ? document.getElementById('modalDescription') : null;
  const modalSpecsContainer = modal ? document.getElementById('modalSpecs') : null;
  const modalInquireBtn = modal ? document.getElementById('modalInquireBtn') : null;

  const openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data || !modal) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCat.textContent = data.category;
    modalTitle.textContent = data.title;
    modalLoc.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
      ${data.location}
    `;
    modalDesc.textContent = data.desc;

    // Render Specs
    modalSpecsContainer.innerHTML = '';
    for (const [key, val] of Object.entries(data.specs)) {
      const specEl = document.createElement('div');
      specEl.className = 'modal-spec-item';
      specEl.innerHTML = `
        <div class="modal-spec-label">${key}</div>
        <div class="modal-spec-val">${val}</div>
      `;
      modalSpecsContainer.appendChild(specEl);
    }

    if (modalInquireBtn) {
      modalInquireBtn.onclick = () => {
        closeModal();
        const projectTypeSelect = document.getElementById('projectType');
        if (projectTypeSelect) {
          projectTypeSelect.value = data.category.includes('Home') ? 'Home Theatre' :
                                    data.category.includes('Club') ? 'Club House Theatre' :
                                    data.category.includes('Studio') ? 'Recording Studio' :
                                    data.category.includes('Acoustic') ? 'Acoustic Consulting' :
                                    data.category.includes('Seating') ? 'Theatre Seating' : 'Home Theatre';
        }
        const messageInput = document.getElementById('message');
        if (messageInput) {
          messageInput.value = `Hello Blac N Bron, I am interested in learning more about the design and solutions featured in '${data.title}' (${data.category}).`;
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const projectId = item.getAttribute('data-id');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  // Close modal on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 6. Contact Form Processing ---
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  const showToast = (message) => {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const projectType = document.getElementById('projectType').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !phone) {
        showToast('Please fill in your name and phone number.');
        return;
      }

      // Simulate successful receipt
      showToast(`Thank you, ${name}! Your consultation request has been received. Our team will contact you shortly.`);
      contactForm.reset();
    });
  }

  // --- 7. Back to Top Smooth Scroll ---
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
