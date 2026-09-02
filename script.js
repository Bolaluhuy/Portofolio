/**
 * ==========================================================================
 * PORTFOLIO SCRIPTS - CYBER-LUXURY EXECUTIVE DARK
 * Muhammad Naufal Bilal Syam - SOC Analyst | Penetration Tester | Network Engineer
 * Official Email: nnaufalbilal@gmail.com
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular components
  initScrollProgress();
  initCyberCanvas();
  initTypewriter();
  initCounters();
  initScrollReveal();
  initNavigation();
  initProjectFilter();
  initProjectModal();
  initContactForm();
  initClipboardCopy();
  initInteractiveTerminal();
  initBackToTop();
  initLucideIcons();
});

/* ==========================================================================
   1. Reading / Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
  }, { passive: true });
}

/* ==========================================================================
   2. Interactive Network Mesh Canvas (Cyber Constellation)
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, maxDist: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Track mouse
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Number of particles based on screen width
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.6 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle repulsion / pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          const force = (mouse.maxDist - dist) / mouse.maxDist;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.55)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const opacity = (1 - dist / 110) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Connect to mouse
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const opacity = (1 - dist / 130) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Dynamic Typewriter Effect for Hero Subtitle
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typewriter-text');
  if (!targetElement) return;

  const roles = [
    'SOC Analyst',
    'Penetration Tester',
    'Network Security Engineer',
    'Threat Hunter',
    'Machine Learning Practitioner'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      targetElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

/* ==========================================================================
   4. Animated Number Counters on Scroll
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * target;

            if (isDecimal) {
              counter.textContent = currentVal.toFixed(1);
            } else {
              counter.textContent = Math.floor(currentVal);
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = isDecimal ? target.toFixed(1) : target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.2 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);
}

/* ==========================================================================
   5. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   6. Navigation, Active Link Spy & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('shadow-xl', 'bg-opacity-95');
    } else {
      navbar?.classList.remove('shadow-xl', 'bg-opacity-95');
    }
  }, { passive: true });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a, button');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 220;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-emerald-400', 'font-semibold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-emerald-400', 'font-semibold');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   7. Interactive Project Filtering
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
        b.classList.add('bg-white/5', 'text-slate-300', 'border-white/10');
      });
      btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
      btn.classList.remove('bg-white/5', 'text-slate-300', 'border-white/10');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   8. Interactive Project Details Modal
   ========================================================================== */
const projectDatabase = {
  'project-1': {
    title: 'Material & Price Forecasting Web Platform',
    client: 'PT Bagus Jaya Sejahtera (Construction Industry)',
    category: 'Machine Learning & Web Forecasting Platform',
    webLink: 'https://github.com/nnaufalbilal',
    githubLink: 'https://github.com/nnaufalbilal',
    description: 'Sistem web terintegrasi berbasis Machine Learning (Random Forest) untuk memprediksi fluktuasi harga komoditas dan material konstruksi secara berkala, meminimalkan risiko eskalasi biaya pengadaan dan mengoptimalkan efisiensi cashflow proyek.',
    highlights: [
      'Pelatihan algoritma Random Forest Regressor menggunakan data historis harga material, inflasi regional, dan tren rantai pasok.',
      'Akurasi peramalan model mencapai R² > 0.91 dengan Mean Absolute Error (MAE) minim.',
      'Dashboard analitik web responsif dengan grafik interaktif proyeksi fluktuasi harga 3 hingga 12 bulan mendatang.',
      'Memberikan rekomendasi waktu terbaik (procurement window) yang berhasil menghemat anggaran belanja konstruksi hingga 14.8%.'
    ],
    techStack: ['Python', 'Scikit-Learn', 'Random Forest', 'Pandas & NumPy', 'Flask REST API', 'Chart.js', 'Tailwind CSS']
  },
  'project-2': {
    title: 'Corporate Budget Decision Support System (AHP)',
    client: 'Corporate Strategic Resource Planning',
    category: 'Decision Science & Web SPK Platform',
    webLink: 'https://github.com/nnaufalbilal',
    githubLink: 'https://github.com/nnaufalbilal',
    description: 'Sistem Pendukung Keputusan (SPK) berbasis web menggunakan metodologi Analytic Hierarchy Process (AHP) untuk mengalokasikan anggaran modal departemen dengan validasi konsistensi logis matematis tingkat tinggi.',
    highlights: [
      'Kalkulasi otomatis matriks perbandingan berpasangan (Pairwise Comparison) antar-kriteria (ROI, Risiko, Waktu, Keselarasan Strategis).',
      'Validasi rasio konsistensi otomatis (Consistency Ratio CR < 0.08) guna memastikan objektivitas penetapan bobot.',
      'Simulasi skenario anggaran secara langsung (real-time recalculation) dengan visualisasi grafik persentase.',
      'Membantu jajaran manajemen eksekutif meningkatkan transparansi dan efisiensi modal hingga +22.4%.'
    ],
    techStack: ['PHP 8.x', 'MySQL', 'AHP Algorithm Engine', 'Tailwind CSS', 'JavaScript (ES6)', 'Chart.js']
  },
  'project-3': {
    title: 'SentinelSOC - Real-Time Network Threat Defense Dashboard',
    client: 'Enterprise Cybersecurity Lab',
    category: 'Cybersecurity & SOC Monitoring',
    webLink: 'https://github.com/nnaufalbilal',
    githubLink: 'https://github.com/nnaufalbilal',
    description: 'Dashboard pemantauan lalu lintas jaringan enterprise secara real-time yang mengintegrasikan ekstraksi paket mendalam (DPI), deteksi anomali port scanning, serta audit validasi aturan Cisco Access Control Lists (ACLs).',
    highlights: [
      'Inspeksi paket mendalam (Deep Packet Inspection) dengan ekstraksi metadata paket via Wireshark/Scapy engine.',
      'Pendeteksian otomatis pola serangan DoS/DDoS, brute-force SSH, dan unauthorized network probing.',
      'Audit kebijakan filtering Cisco ACL dan pemetaan rute dinamis OSPF untuk memvalidasi segmentasi zona aman.',
      'Konsol insiden triase terpadu dengan latency pemrosesan paket di bawah 42ms dan 200+ aturan firewall.'
    ],
    techStack: ['Python', 'Wireshark / Scapy', 'Cisco Packet Tracer', 'OSPF Routing', 'Linux IPTables', 'Docker', 'Tailwind CSS']
  },
  'project-4': {
    title: 'VulnGuard - Automated Vulnerability Assessment & Mobile Security Portal',
    client: 'Application & Infrastructure Security Assurance',
    category: 'Security Auditing & Mobile Pentest',
    webLink: 'https://github.com/nnaufalbilal',
    githubLink: 'https://github.com/nnaufalbilal',
    description: 'Portal otomasi pengujian penetrasi dan penilaian kerentanan aplikasi web serta mobile Android yang mengintegrasikan framework Drozer dan checklist kepatuhan OWASP Top 10.',
    highlights: [
      'Audit otomatis celah keamanan aplikasi mobile Android menggunakan framework Drozer (IPC injection, content provider leaks, exported activities).',
      'Pemindaian otomatis celah OWASP Top 10 pada endpoint API dan web.',
      'Sistem pembobotan risiko berbasis CVSS dengan rekomendasi kode remediasi langkah-demi-langkah bagi pengembang.',
      'Ekspor laporan audit kepatuhan seketika dalam format PDF profesional.'
    ],
    techStack: ['Drozer Framework', 'Kali Linux', 'Burp Suite', 'Python Automation', 'OWASP Mobile Security', 'ReportLab PDF']
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.open-project-btn');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-client').textContent = data.client;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-description').textContent = data.description;

    // Update Web & GitHub Links
    const webLinkBtn = document.getElementById('modal-web-link');
    const githubLinkBtn = document.getElementById('modal-github-link');
    if (webLinkBtn) webLinkBtn.href = data.webLink;
    if (githubLinkBtn) githubLinkBtn.href = data.githubLink;

    // Highlights list
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2.5 text-slate-300 text-sm';
      li.innerHTML = `<span class="text-emerald-400 mt-1 shrink-0">✦</span><span>${item}</span>`;
      highlightsList.appendChild(li);
    });

    // Tech stack chips
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tag-badge tag-emerald text-xs';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    initLucideIcons();
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. Direct Email Submission Handler (Sends to nnaufalbilal@gmail.com)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const formFeedback = document.getElementById('form-feedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('sender_name')?.value.trim();
    const email = document.getElementById('user_email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('execute_message')?.value.trim();

    if (!name || !email || !subject || !message) {
      showFeedback('Harap lengkapi seluruh kolom formulir terlebih dahulu.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Format alamat email tidak valid. Mohon periksa kembali.', 'error');
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Mengirimkan ke Bilal...';
    btnSpinner?.classList.remove('hidden');

    try {
      // Send directly to nnaufalbilal@gmail.com via FormSubmit AJAX endpoint
      const response = await fetch('https://formsubmit.co/ajax/nnaufalbilal@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[Portfolio Inquiry] ${subject} - Dari: ${name}`,
          Name: name,
          Email: email,
          Subject: subject,
          Message: message,
          Timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
        })
      });

      const result = await response.json();

      if (response.ok || result.success === "true") {
        showFeedback('✓ Pesan Anda telah berhasil terkirim langsung ke email Bilal (nnaufalbilal@gmail.com)! Terima kasih, saya akan segera merespon.', 'success');
        showToast('Pesan berhasil terkirim ke nnaufalbilal@gmail.com!');
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Gagal mengirim formulir.');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX attempt notice:', err);
      // Fallback: Message still generated with direct mailto shortcut
      showFeedback(
        'Pesan siap dikirim! Klik tautan berikut untuk membuka aplikasi email Anda:',
        'fallback',
        `mailto:nnaufalbilal@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`
      );
      showToast('Opsi pengiriman email cadangan disiapkan.');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Kirim Pesan ke Bilal';
      btnSpinner?.classList.add('hidden');
    }
  });

  function showFeedback(text, type, linkUrl = null) {
    if (!formFeedback) return;
    formFeedback.innerHTML = '';
    formFeedback.classList.remove('hidden', 'text-red-400', 'text-emerald-400', 'text-cyan-300', 'bg-red-500/10', 'bg-emerald-500/10', 'bg-cyan-500/10', 'border-red-500/30', 'border-emerald-500/30', 'border-cyan-500/30');

    if (type === 'error') {
      formFeedback.textContent = text;
      formFeedback.classList.add('text-red-400', 'bg-red-500/10', 'border-red-500/30');
    } else if (type === 'fallback') {
      formFeedback.classList.add('text-cyan-300', 'bg-cyan-500/10', 'border-cyan-500/30');
      formFeedback.innerHTML = `
        <div class="space-y-2">
          <p>${text}</p>
          <a href="${linkUrl}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30">
            <span>Buka Email Sekarang (nnaufalbilal@gmail.com)</span> &rarr;
          </a>
        </div>
      `;
    } else {
      formFeedback.textContent = text;
      formFeedback.classList.add('text-emerald-400', 'bg-emerald-500/10', 'border-emerald-500/30');
    }
  }
}

/* ==========================================================================
   10. Clipboard Copy Utility & Toast Notification
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

function initClipboardCopy() {
  const copyButtons = [
    document.getElementById('copy-email-top-btn'),
    document.getElementById('quick-copy-email-hero'),
    document.getElementById('copy-email-card-btn')
  ];

  const emailToCopy = 'nnaufalbilal@gmail.com';

  copyButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(emailToCopy)
        .then(() => {
          showToast(`Email ${emailToCopy} berhasil disalin ke clipboard!`);
        })
        .catch(() => {
          showToast(`Email: ${emailToCopy}`);
        });
    });
  });
}

/* ==========================================================================
   11. Interactive Cyber Terminal Drawer / Modal
   ========================================================================== */
function initInteractiveTerminal() {
  const modal = document.getElementById('terminal-modal');
  const backdrop = document.getElementById('terminal-backdrop');
  const closeBtn = document.getElementById('terminal-close-btn');
  const closeDot = document.getElementById('terminal-close-dot');
  const inputField = document.getElementById('terminal-input-field');
  const outputArea = document.getElementById('terminal-output');

  const openButtons = [
    document.getElementById('nav-terminal-btn'),
    document.getElementById('mobile-terminal-btn'),
    document.getElementById('floating-terminal-btn')
  ];

  let commandHistory = [];
  let historyIndex = -1;

  function openTerminal() {
    modal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputField?.focus(), 100);
  }

  function closeTerminal() {
    modal?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn?.addEventListener('click', openTerminal));
  closeBtn?.addEventListener('click', closeTerminal);
  closeDot?.addEventListener('click', closeTerminal);
  backdrop?.addEventListener('click', closeTerminal);

  // Keyboard shortcut: Press '~' (Tilde) to toggle terminal
  document.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (modal?.classList.contains('hidden')) {
          openTerminal();
        } else {
          closeTerminal();
        }
      }
    } else if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
      closeTerminal();
    }
  });

  // Terminal commands definition
  const commands = {
    'help': `
      <div class="text-cyan-300 font-semibold mb-1">Available System Commands:</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300 text-xs">
        <div><span class="text-emerald-400 font-bold">about</span> - Profil dan filosofi profesional Bilal</div>
        <div><span class="text-emerald-400 font-bold">skills</span> - Arsenal teknologi dan keahlian</div>
        <div><span class="text-emerald-400 font-bold">projects</span> - Daftar proyek dan tautan live demo</div>
        <div><span class="text-emerald-400 font-bold">contact</span> - Alamat email resmi dan koneksi sosial</div>
        <div><span class="text-emerald-400 font-bold">whoami</span> - Informasi identitas sistem</div>
        <div><span class="text-emerald-400 font-bold">stats</span> - Metrik pengawasan dan rekam jejak</div>
        <div><span class="text-emerald-400 font-bold">ping</span> - Tes latensi jaringan</div>
        <div><span class="text-emerald-400 font-bold">email</span> - Salin email resmi ke clipboard</div>
        <div><span class="text-emerald-400 font-bold">clear</span> - Bersihkan riwayat layar konsol</div>
        <div><span class="text-emerald-400 font-bold">exit</span> - Tutup terminal</div>
      </div>
    `,
    'about': `
      <div class="text-emerald-400 font-bold">Muhammad Naufal Bilal Syam</div>
      <div class="text-slate-300 text-xs mt-1 leading-relaxed">
        SOC Analyst, Penetration Tester & Network Engineer berdedikasi tinggi dalam pertahanan siber proaktif, audit celah kerentanan aplikasi mobile/web via Drozer dan Kali Linux, serta perancangan topologi jaringan Cisco zero-trust.
      </div>
    `,
    'skills': `
      <div class="text-cyan-400 font-bold mb-1">[+] Technical Arsenal:</div>
      <div class="text-xs text-slate-300 space-y-1">
        <div>&bull; <strong class="text-emerald-400">SOC & Defense:</strong> SIEM Monitoring, Incident Triage, Wireshark, Threat Hunting, Log Forensic.</div>
        <div>&bull; <strong class="text-cyan-400">Pentesting:</strong> Drozer Mobile Security, Kali Linux, Burp Suite, Nmap, OWASP Top 10.</div>
        <div>&bull; <strong class="text-emerald-400">Networking:</strong> Cisco Packet Tracer, OSPF Routing Protocol, ACL Filtering, VLANs & Subnetting.</div>
        <div>&bull; <strong class="text-violet-400">Software & ML:</strong> Python (Scikit-Learn, Random Forest), PHP Backend, MySQL, Docker, Bash.</div>
      </div>
    `,
    'projects': `
      <div class="text-cyan-400 font-bold mb-1">[+] Engineered Systems & Web Apps:</div>
      <div class="text-xs text-slate-300 space-y-2">
        <div>1. <strong class="text-white">Material & Price Forecasting Web Platform</strong> (PT BJS) - ML Random Forest, akurasi 94.1%.</div>
        <div>2. <strong class="text-white">Corporate Budget Decision Support System (AHP)</strong> - SPK matriks konsistensi CR &lt; 0.08.</div>
        <div>3. <strong class="text-white">SentinelSOC Network Threat Defense</strong> - Inspeksi paket Wireshark real-time & mitigasi ACLs.</div>
        <div>4. <strong class="text-white">VulnGuard Security Assessment Portal</strong> - Audit mobile Android Drozer & OWASP Top 10.</div>
      </div>
    `,
    'contact': `
      <div class="text-emerald-400 font-bold">[+] Direct Contact Channels:</div>
      <div class="text-xs text-slate-300 space-y-1">
        <div>&bull; Official Email: <a href="mailto:nnaufalbilal@gmail.com" class="text-cyan-300 underline">nnaufalbilal@gmail.com</a></div>
        <div>&bull; GitHub: <a href="https://github.com/nnaufalbilal" target="_blank" class="text-cyan-300 underline">github.com/nnaufalbilal</a></div>
        <div>&bull; LinkedIn: <span class="text-slate-200">Muhammad Naufal Bilal Syam</span></div>
      </div>
    `,
    'whoami': `
      <div class="text-xs font-mono text-emerald-400">
        uid=1000(guest_visitor) gid=1000(viewer) groups=1000(security_guest)<br>
        status: Authorized to view Bilal's cybersecurity portfolio.
      </div>
    `,
    'stats': `
      <div class="text-xs font-mono text-slate-300 space-y-0.5">
        <div>[METRIC] Uptime Vigilance     : <span class="text-emerald-400">99.9%</span></div>
        <div>[METRIC] Security Audits      : <span class="text-emerald-400">25+ Completed</span></div>
        <div>[METRIC] Secured Endpoints    : <span class="text-cyan-400">120+ Nodes</span></div>
        <div>[METRIC] Zero-Day Breaches    : <span class="text-emerald-400">0 Incident</span></div>
        <div>[METRIC] Threat Response Time : <span class="text-cyan-400">&lt; 15 Minutes</span></div>
      </div>
    `,
    'ping': `
      <div class="text-xs font-mono text-emerald-400">
        PING defense-node.bilal.sec (192.168.1.1): 56 data bytes<br>
        64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=1.84 ms<br>
        64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=1.42 ms<br>
        64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=1.29 ms<br>
        --- defense-node ping statistics --- 0% packet loss, min/avg/max = 1.29/1.51/1.84 ms
      </div>
    `,
    'email': () => {
      navigator.clipboard.writeText('nnaufalbilal@gmail.com');
      showToast('Email nnaufalbilal@gmail.com berhasil disalin!');
      return `<div class="text-emerald-400 font-mono text-xs">✓ Alamat email 'nnaufalbilal@gmail.com' berhasil disalin ke clipboard Anda!</div>`;
    }
  };

  inputField?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = inputField.value.trim();
      const cmd = rawCmd.toLowerCase();
      inputField.value = '';

      if (!rawCmd) return;

      commandHistory.push(rawCmd);
      historyIndex = commandHistory.length;

      // Print command line
      const cmdEntry = document.createElement('div');
      cmdEntry.className = 'flex items-center gap-2 font-mono text-xs';
      cmdEntry.innerHTML = `<span class="text-emerald-400 font-bold">bilal@sec:~$</span> <span class="text-white">${rawCmd}</span>`;
      outputArea?.appendChild(cmdEntry);

      // Handle command execution
      if (cmd === 'clear') {
        if (outputArea) outputArea.innerHTML = '';
        return;
      } else if (cmd === 'exit' || cmd === 'quit') {
        closeTerminal();
        return;
      }

      const resultContainer = document.createElement('div');
      resultContainer.className = 'py-1 text-xs';

      if (commands[cmd]) {
        const output = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
        resultContainer.innerHTML = output;
      } else {
        resultContainer.innerHTML = `
          <div class="text-red-400 font-mono text-xs">
            Perintah '${rawCmd}' tidak dikenali. Ketik <span class="text-cyan-300 font-bold">'help'</span> untuk daftar perintah yang tersedia.
          </div>
        `;
      }

      outputArea?.appendChild(resultContainer);
      outputArea?.scrollTo({ top: outputArea.scrollHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputField.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputField.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputField.value = '';
      }
    }
  });
}

/* ==========================================================================
   12. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   13. Initialize Lucide Icons
   ========================================================================== */
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
