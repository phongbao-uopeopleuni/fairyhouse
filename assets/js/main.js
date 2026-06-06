/**
 * Fairy's House Huế - Interactive JavaScript Controller
 * Handcrafted, robust vanilla JS with zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Detect homepage dynamically to apply custom organic scroll snapping
  const pathname = window.location.pathname;
  const isHomePage = pathname === '/' || 
                     pathname.endsWith('/index.html') || 
                     pathname.endsWith('/en/') || 
                     pathname.endsWith('/en/index.html') ||
                     pathname === '' ||
                     // Matches root directory preview URLs too
                     (!pathname.includes('.html') && !pathname.includes('/en/phong') && !pathname.includes('/phong') && !pathname.includes('/cam-nang-hue') && !pathname.includes('/gioi-thieu') && !pathname.includes('/en/gioi-thieu') && !pathname.includes('/en/phong') && !pathname.includes('/en/cam-nang-hue'));
  
  if (isHomePage) {
    document.body.classList.add('page-home');
  }

  // 1. Mobile Menu Open/Close Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;

  if (menuToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove('active');
      body.classList.remove('menu-open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      navMenu.classList.add('active');
      body.classList.add('menu-open');
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    };

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        closeMenu();
        return;
      }

      openMenu();
      menuToggle.focus();
    });

    // Close menu when clicking outside on active mobile backdrop
    document.addEventListener('click', (e) => {
      if (body.classList.contains('menu-open') && 
          !navMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu when clicking navigation links
    const navLinks = navMenu.querySelectorAll('.nav-menu__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && body.classList.contains('menu-open')) {
        closeMenu();
      }
    });
  }

  // 2. Interactive Room Gallery switcher
  const galleryMain = document.getElementById('gallery-main');
  const galleryThumbs = document.querySelectorAll('.room-gallery__thumb');

  if (galleryMain && galleryThumbs.length > 0) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Toggle active thumbnail styling
        galleryThumbs.forEach(t => t.classList.remove('room-gallery__thumb--active'));
        thumb.classList.add('room-gallery__thumb--active');

        // Transition main image cleanly (fade effect)
        const newSrc = thumb.getAttribute('data-large-img');
        const altText = thumb.querySelector('img')?.getAttribute('alt') || '';
        
        galleryMain.style.opacity = '0.3';
        
        setTimeout(() => {
          galleryMain.setAttribute('src', newSrc);
          galleryMain.setAttribute('alt', altText);
          galleryMain.style.opacity = '1';
        }, 150);
      });
    });
  }

  // 3. Scroll Header shadow updates
  const header = document.querySelector('.header');
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run initially
  }

  // 4. House Gallery Tab Categories Switching
  const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

  if (galleryTabBtns.length > 0 && galleryItems.length > 0) {
    galleryTabBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });

    galleryTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Clear active class from all tabs
        galleryTabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

        const selectedCategory = btn.getAttribute('data-category');

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          const pendingTimer = item.dataset.filterTimer;

          if (pendingTimer) {
            window.clearTimeout(Number(pendingTimer));
            delete item.dataset.filterTimer;
          }
          
          if (selectedCategory === 'all' || itemCategory === selectedCategory) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.96)';
            item.dataset.filterTimer = String(window.setTimeout(() => {
              item.style.display = 'none';
              delete item.dataset.filterTimer;
            }, 300));
          }
        });
      });
    });
  }

  // 5. Robust Weather Widget Controller with Live Sync & Dynamic Local Recommendations
  const weatherCodes = {
    0: { vi: 'Trời quang, nắng đẹp', en: 'Clear sky, sunny', emoji: '☀️' },
    1: { vi: 'Ít mây, trời trong', en: 'Mainly clear', emoji: '🌤️' },
    2: { vi: 'Nhiều mây', en: 'Partly cloudy', emoji: '⛅' },
    3: { vi: 'Trời âm u', en: 'Overcast', emoji: '☁️' },
    45: { vi: 'Sương mù', en: 'Foggy', emoji: '🌫️' },
    48: { vi: 'Sương muối', en: 'Depositing rime fog', emoji: '🌫️' },
    51: { vi: 'Mưa phùn nhẹ', en: 'Light drizzle', emoji: '🌧️' },
    53: { vi: 'Mưa phùn vừa', en: 'Moderate drizzle', emoji: '🌧️' },
    55: { vi: 'Mưa phùn dày', en: 'Dense drizzle', emoji: '🌧️' },
    56: { vi: 'Mưa lạnh nhẹ', en: 'Light freezing drizzle', emoji: '🌧️' },
    57: { vi: 'Mưa lạnh dày', en: 'Dense freezing drizzle', emoji: '🌧️' },
    61: { vi: 'Mưa rào nhẹ', en: 'Slight rain', emoji: '🌦️' },
    63: { vi: 'Mưa rào vừa', en: 'Moderate rain', emoji: '🌧️' },
    65: { vi: 'Mưa to tầm tã', en: 'Heavy rain', emoji: '🌧️' },
    66: { vi: 'Mưa băng nhẹ', en: 'Light freezing rain', emoji: '🌧️' },
    67: { vi: 'Mưa băng to', en: 'Heavy freezing rain', emoji: '🌧️' },
    71: { vi: 'Tuyết rơi nhẹ', en: 'Slight snow fall', emoji: '🌨️' },
    73: { vi: 'Tuyết rơi vừa', en: 'Moderate snow fall', emoji: '🌨️' },
    75: { vi: 'Tuyết rơi dày', en: 'Heavy snow fall', emoji: '🌨️' },
    77: { vi: 'Hạt tuyết', en: 'Snow grains', emoji: '🌨️' },
    80: { vi: 'Mưa bóng mây nhẹ', en: 'Slight rain showers', emoji: '🌦️' },
    81: { vi: 'Mưa bóng mây vừa', en: 'Moderate rain showers', emoji: '🌧️' },
    82: { vi: 'Mưa rào rất to', en: 'Violent rain showers', emoji: '⛈️' },
    85: { vi: 'Mưa tuyết rào nhẹ', en: 'Slight snow showers', emoji: '🌨️' },
    86: { vi: 'Mưa tuyết rào dày', en: 'Heavy snow showers', emoji: '🌨️' },
    95: { vi: 'Giông bão sấm sét', en: 'Thunderstorm', emoji: '⛈️' },
    96: { vi: 'Giông bão kèm mưa đá nhẹ', en: 'Thunderstorm with slight hail', emoji: '⛈️' },
    99: { vi: 'Giông bão kèm mưa đá to', en: 'Thunderstorm with heavy hail', emoji: '⛈️' }
  };

  const shortDaysVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const shortDaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function getFallbackData() {
    const now = new Date();
    const month = now.getMonth();
    let temp, humidity, wind, code;
    
    // Season-based temperatures & codes for Hue City
    if (month >= 4 && month <= 8) { // Hot dry season
      temp = 31 + Math.floor(Math.random() * 5); 
      humidity = 65 + Math.floor(Math.random() * 10);
      wind = 6 + Math.floor(Math.random() * 8);
      code = Math.random() > 0.4 ? 0 : 2; 
    } else if (month >= 9 && month <= 10) { // Heavy rain transition
      temp = 24 + Math.floor(Math.random() * 4);
      humidity = 88 + Math.floor(Math.random() * 8);
      wind = 12 + Math.floor(Math.random() * 12);
      code = 80; 
    } else if (month === 11 || month <= 1) { // Winter chill & drizzle
      temp = 18 + Math.floor(Math.random() * 5);
      humidity = 82 + Math.floor(Math.random() * 12);
      wind = 8 + Math.floor(Math.random() * 8);
      code = 3; 
    } else { // Spring / Mild
      temp = 25 + Math.floor(Math.random() * 4);
      humidity = 72 + Math.floor(Math.random() * 12);
      wind = 5 + Math.floor(Math.random() * 6);
      code = 1; 
    }
    
    // Mock daily forecast
    const daily = {
      time: [],
      weather_code: [],
      temperature_2m_max: [],
      temperature_2m_min: []
    };
    
    for (let i = 1; i <= 5; i++) {
      const fDate = new Date();
      fDate.setDate(fDate.getDate() + i);
      daily.time.push(fDate.toISOString().split('T')[0]);
      daily.weather_code.push([0, 1, 2, 3, 61, 80][Math.floor(Math.random() * 6)]);
      daily.temperature_2m_max.push(temp + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2));
      daily.temperature_2m_min.push(temp - 6 - Math.floor(Math.random() * 2));
    }
    
    return {
      current: {
        temperature_2m: temp,
        relative_humidity_2m: humidity,
        apparent_temperature: temp + 2,
        weather_code: code,
        wind_speed_10m: wind
      },
      daily: daily
    };
  }

  function ensureHeaderWeatherTicker() {
    const header = document.querySelector('.header');
    if (!header) return null;

    const existingTicker = header.querySelector('.weather-ticker');
    if (existingTicker) return existingTicker;

    const isEn = window.location.pathname.includes('/en/');
    const ticker = document.createElement('div');
    ticker.className = 'weather-ticker';
    ticker.setAttribute('role', 'status');
    ticker.setAttribute('aria-live', 'polite');

    const loadingText = isEn
      ? 'Checking Hue weather for today...'
      : 'Đang cập nhật thời tiết Huế hôm nay...';

    ticker.innerHTML = `
      <div class="weather-ticker__viewport">
        <div class="weather-ticker__track">
          <span class="weather-ticker__text"></span>
          <span class="weather-ticker__text" aria-hidden="true"></span>
        </div>
      </div>
    `;

    ticker.querySelectorAll('.weather-ticker__text').forEach(item => {
      item.textContent = loadingText;
    });

    header.appendChild(ticker);
    return ticker;
  }

  function updateHeaderWeatherTicker(data) {
    const ticker = document.querySelector('.weather-ticker');
    if (!ticker || !data.current) return;

    const isEn = window.location.pathname.includes('/en/');
    const current = data.current;
    const codeInfo = weatherCodes[current.weather_code] || { vi: 'Ôn hòa', en: 'Mild', emoji: '⛅' };
    const temp = Math.round(current.temperature_2m);
    const feels = Math.round(current.apparent_temperature);
    const humidity = Math.round(current.relative_humidity_2m);
    const wind = Math.round(current.wind_speed_10m);

    let forecastText = '';
    if (data.daily && Array.isArray(data.daily.time)) {
      const forecastParts = data.daily.time.slice(0, 3).map((day, index) => {
        const dateObj = new Date(day);
        const dayName = isEn ? shortDaysEn[dateObj.getDay()] : shortDaysVi[dateObj.getDay()];
        const maxT = Math.round(data.daily.temperature_2m_max[index]);
        const minT = Math.round(data.daily.temperature_2m_min[index]);
        const dayCode = data.daily.weather_code[index];
        const dayInfo = weatherCodes[dayCode] || { vi: 'Ôn hòa', en: 'Mild', emoji: '⛅' };
        return `${dayName} ${dayInfo.emoji} ${maxT}/${minT}°`;
      }).join('  •  ');

      forecastText = forecastParts ? `  •  ${forecastParts}` : '';
    }

    const message = isEn
      ? `Hue now ${codeInfo.emoji} ${temp}°C, feels ${feels}°C, humidity ${humidity}%, wind ${wind} km/h${forecastText}`
      : `Thời tiết Huế ${codeInfo.emoji} ${temp}°C, cảm giác ${feels}°C, độ ẩm ${humidity}%, gió ${wind} km/h${forecastText}`;

    ticker.querySelectorAll('.weather-ticker__text').forEach(item => {
      item.textContent = message;
    });
  }

  const headerWeatherTicker = ensureHeaderWeatherTicker();
  if (headerWeatherTicker) {
    const lat = 16.4637;
    const lon = 107.5908;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Bangkok`;

    const loadWeather = () => {
      fetch(apiUrl)
        .then(res => {
          if (!res.ok) throw new Error('API failure');
          return res.json();
        })
        .then(data => {
          updateHeaderWeatherTicker(data);
        })
        .catch(err => {
          console.warn('Weather fallback logic triggered:', err);
          const fallback = getFallbackData();
          updateHeaderWeatherTicker(fallback);
        });
    };

    const scheduleWeatherLoad = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadWeather, { timeout: 2500 });
      } else {
        window.setTimeout(loadWeather, 700);
      }
    };

    if (document.readyState === 'complete') {
      scheduleWeatherLoad();
    } else {
      window.addEventListener('load', scheduleWeatherLoad, { once: true });
    }
  }

  // 6. Modern Scroll Reveal Engine (IntersectionObserver)
  const initScrollReveal = () => {
    // Select elements to reveal
    const revealSections = document.querySelectorAll('.about-block__img, .about-block__content, .map-embed, .map-info, .testimonial-slider-wrapper');
    const revealStaggers = document.querySelectorAll('.grid-3 .card, .features-grid .feature-box, .about-block__list-item');

    // Setup initial state dynamically so it degrades gracefully if JS is disabled
    revealSections.forEach(el => {
      if (!el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
      }
    });

    revealStaggers.forEach((el) => {
      if (!el.classList.contains('scroll-reveal-stagger')) {
        el.classList.add('scroll-reveal-stagger');
      }
      
      // Calculate delay based on index in parents to create cascading load effect
      const siblings = Array.from(el.parentNode?.children || []);
      const relativeIndex = siblings.indexOf(el);
      if (relativeIndex >= 0) {
        const delay = Math.min(relativeIndex * 150, 450); // caps at 450ms delay
        el.style.transitionDelay = `${delay}ms`;
      }
    });

    // IntersectionObserver setting up options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -8% 0px', // triggers slightly before entry to avoid awkward clipping
      threshold: 0.15 // trigger when at least 15% is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          // Once animated, we don't need to observe it anymore (keeps scroll smooth)
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Start observing elements
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger').forEach(el => {
      revealObserver.observe(el);
    });

    // Never let animation state permanently hide content on mobile browsers.
    window.setTimeout(() => {
      document.querySelectorAll('.scroll-reveal:not(.reveal-active), .scroll-reveal-stagger:not(.reveal-active)').forEach(el => {
        el.classList.add('reveal-active');
        revealObserver.unobserve(el);
      });
    }, 1800);
  };

  // Run the scroll reveal initializer
  if ('IntersectionObserver' in window) {
    initScrollReveal();
  } else {
    // Fail-safe fallback: instantly show all elements if observer is unsupported
    document.querySelectorAll('.about-block__img, .about-block__content, .map-embed, .map-info, .testimonial-slider-wrapper').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // 7. Interactive Scroll to Top Button (Dynamic Injection & Scrolling)
  const initScrollToTop = () => {
    // Create the button dynamically
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.setAttribute('title', window.location.pathname.includes('/en/') ? 'Scroll to top' : 'Cuộn lên đầu trang');
    
    // Inject clean SVG arrow up icon
    scrollBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    
    document.body.appendChild(scrollBtn);

    // Scroll display logic with performance throttle
    let isScrollThrottled = false;
    const handleScroll = () => {
      if (!isScrollThrottled) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 450) {
            scrollBtn.classList.add('show');
          } else {
            scrollBtn.classList.remove('show');
          }
          isScrollThrottled = false;
        });
        isScrollThrottled = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth-scroll function with standard click handler
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Fallback if behavior: 'smooth' is poorly handled or slow
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // 8. Luxury Photography Lightbox Modal Engine
  const initLightbox = () => {
    // Check if we need to create the lightbox HTML on-the-fly
    if (document.getElementById('luxuryLightbox')) return;

    // Create container
    const lightbox = document.createElement('div');
    lightbox.id = 'luxuryLightbox';
    lightbox.className = 'luxury-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Photography Lightbox');

    // Create inner structure
    lightbox.innerHTML = `
      <div class="luxury-lightbox__backdrop"></div>
      
      <div class="luxury-lightbox__header">
        <div class="luxury-lightbox__title-group">
          <div class="luxury-lightbox__counter">0 / 0</div>
          <div class="luxury-lightbox__caption">Fairy's House Hue</div>
        </div>
        <div class="luxury-lightbox__actions">
          <button class="luxury-lightbox__btn luxury-lightbox__btn--zoom-in" title="Phóng to / Zoom In (Scroll up / Key +)" aria-label="Zoom in">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button class="luxury-lightbox__btn luxury-lightbox__btn--zoom-out" title="Thu nhỏ / Zoom Out (Scroll down / Key -)" aria-label="Zoom out">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button class="luxury-lightbox__btn luxury-lightbox__btn--zoom-reset" title="Đặt lại / Reset (Dbl-click / Key 0)" aria-label="Reset zoom">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </button>
          <button class="luxury-lightbox__btn luxury-lightbox__btn--close" title="Đóng / Close (Esc)" aria-label="Close lightbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      
      <button class="luxury-lightbox__nav luxury-lightbox__nav--prev" title="Ảnh trước / Previous (ArrowLeft)" aria-label="Previous image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      
      <div class="luxury-lightbox__stage">
        <div class="luxury-lightbox__img-container">
          <img src="" alt="" class="luxury-lightbox__img">
        </div>
      </div>
      
      <button class="luxury-lightbox__nav luxury-lightbox__nav--next" title="Ảnh sau / Next (ArrowRight)" aria-label="Next image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    `;

    document.body.appendChild(lightbox);

    // Elements lookup
    const backdrop = lightbox.querySelector('.luxury-lightbox__backdrop');
    const header = lightbox.querySelector('.luxury-lightbox__header');
    const closeBtn = lightbox.querySelector('.luxury-lightbox__btn--close');
    const zoomInBtn = lightbox.querySelector('.luxury-lightbox__btn--zoom-in');
    const zoomOutBtn = lightbox.querySelector('.luxury-lightbox__btn--zoom-out');
    const zoomResetBtn = lightbox.querySelector('.luxury-lightbox__btn--zoom-reset');
    const prevNav = lightbox.querySelector('.luxury-lightbox__nav--prev');
    const nextNav = lightbox.querySelector('.luxury-lightbox__nav--next');
    const imgContainer = lightbox.querySelector('.luxury-lightbox__img-container');
    const lightboxImg = lightbox.querySelector('.luxury-lightbox__img');
    const lightboxCounter = lightbox.querySelector('.luxury-lightbox__counter');
    const lightboxCaption = lightbox.querySelector('.luxury-lightbox__caption');

    // State Variables
    let activeImages = [];
    let currentIndex = 0;
    
    let currentScale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Helper: translate low-res Unsplash CDN URLs into high-res (w=1600)
    const getHighResSrc = (src) => {
      if (!src) return '';
      if (src.includes('unsplash.com')) {
        return src.replace(/w=\d+/, 'w=1600').replace(/q=\d+/, 'q=90');
      }
      return src;
    };

    // Cybersecurity safe-escaping helper for dynamic attributes to prevent client-side DOM XSS
    const escapeHTML = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

    // Transform renderer
    const updateImageTransform = () => {
      if (currentScale === 1) {
        offsetX = 0;
        offsetY = 0;
        imgContainer.classList.remove('is-zoomed');
      } else {
        imgContainer.classList.add('is-zoomed');
      }
      imgContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${currentScale})`;
    };

    // Zoom Handlers
    const zoomIn = () => {
      currentScale = Math.min(currentScale + 0.5, 4);
      updateImageTransform();
    };

    const zoomOut = () => {
      currentScale = Math.max(currentScale - 0.5, 1);
      updateImageTransform();
    };

    const resetZoom = () => {
      currentScale = 1;
      offsetX = 0;
      offsetY = 0;
      updateImageTransform();
    };

    // Drag Handlers
    const startDrag = (e) => {
      if (currentScale <= 1) return;
      
      isDragging = true;
      imgContainer.classList.add('is-dragging');
      
      const clientX = e.type.indexOf('touch') !== -1 ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.indexOf('touch') !== -1 ? e.touches[0].clientY : e.clientY;
      
      startX = clientX - offsetX;
      startY = clientY - offsetY;
      
      if (e.cancelable) e.preventDefault();
    };

    const drag = (e) => {
      if (!isDragging) return;
      
      const clientX = e.type.indexOf('touch') !== -1 ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.indexOf('touch') !== -1 ? e.touches[0].clientY : e.clientY;
      
      offsetX = clientX - startX;
      offsetY = clientY - startY;
      
      // Prevent loose dragging outside visual boundary coordinates
      const maxDragX = (currentScale - 1) * (imgContainer.clientWidth / 2) + 50;
      const maxDragY = (currentScale - 1) * (imgContainer.clientHeight / 2) + 50;
      
      offsetX = Math.max(-maxDragX, Math.min(maxDragX, offsetX));
      offsetY = Math.max(-maxDragY, Math.min(maxDragY, offsetY));
      
      updateImageTransform();
    };

    const endDrag = () => {
      isDragging = false;
      imgContainer.classList.remove('is-dragging');
    };

    // Event Wireup - Dragging
    imgContainer.addEventListener('mousedown', startDrag);
    imgContainer.addEventListener('mousemove', drag);
    imgContainer.addEventListener('mouseup', endDrag);
    imgContainer.addEventListener('mouseleave', endDrag);

    imgContainer.addEventListener('touchstart', startDrag, { passive: false });
    imgContainer.addEventListener('touchmove', drag, { passive: false });
    imgContainer.addEventListener('touchend', endDrag);

    // Wheel Scroll Zoom
    imgContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      if (delta < 0) {
        currentScale = Math.min(currentScale + 0.25, 4);
      } else {
        currentScale = Math.max(currentScale - 0.25, 1);
      }
      updateImageTransform();
    }, { passive: false });

    // Double-click toggle Zoom
    imgContainer.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (currentScale > 1) {
        resetZoom();
      } else {
        currentScale = 2;
        updateImageTransform();
      }
    });

    // Zoom Buttons
    zoomInBtn.addEventListener('click', (e) => { e.stopPropagation(); zoomIn(); });
    zoomOutBtn.addEventListener('click', (e) => { e.stopPropagation(); zoomOut(); });
    zoomResetBtn.addEventListener('click', (e) => { e.stopPropagation(); resetZoom(); });

    // Image Loader with absolute fading
    const loadImage = (index) => {
      if (index < 0 || index >= activeImages.length) return;
      currentIndex = index;
      resetZoom();

      const imgData = activeImages[currentIndex];
      
      // Smooth fade-in
      lightboxImg.style.opacity = '0';
      lightboxImg.style.transition = 'none';

      const highRes = getHighResSrc(imgData.src);
      lightboxImg.setAttribute('src', highRes);
      lightboxImg.setAttribute('alt', imgData.alt || '');

      lightboxImg.onload = () => {
        lightboxImg.style.transition = 'opacity 0.3s ease';
        lightboxImg.style.opacity = '1';
      };

      // Header title & counters with sanitized values to prevent XSS vulnerabilities
      const labelStr = imgData.title || (window.location.pathname.includes('/en/') ? "Fairy's House Homestay" : "Fairy's House");
      const cleanLabel = escapeHTML(labelStr);
      const cleanDesc = imgData.desc ? escapeHTML(imgData.desc) : '';
      lightboxCaption.innerHTML = `<span style="font-weight: 500;">${cleanLabel}</span>${cleanDesc ? ` <span style="opacity: 0.75; font-size: 0.88em; font-family: var(--font-sans); margin-left: 0.5rem; border-left: 1px solid rgba(255,255,255,0.25); padding-left: 0.5rem;">${cleanDesc}</span>` : ''}`;
      lightboxCounter.textContent = `${currentIndex + 1} / ${activeImages.length}`;

      // Navigation visibility toggling
      if (activeImages.length <= 1) {
        prevNav.style.display = 'none';
        nextNav.style.display = 'none';
      } else {
        prevNav.style.display = 'flex';
        nextNav.style.display = 'flex';
      }
    };

    // Navegation actions
    const nextImage = () => {
      if (activeImages.length <= 1) return;
      let nextIdx = currentIndex + 1;
      if (nextIdx >= activeImages.length) nextIdx = 0;
      loadImage(nextIdx);
    };

    const prevImage = () => {
      if (activeImages.length <= 1) return;
      let prevIdx = currentIndex - 1;
      if (prevIdx < 0) prevIdx = activeImages.length - 1;
      loadImage(prevIdx);
    };

    prevNav.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
    nextNav.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

    // Open Lightbox
    const openLightbox = (images, startIndex) => {
      activeImages = images;
      if (activeImages.length === 0) return;
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // freezes background page bounds
      loadImage(startIndex);
    };

    // Close Lightbox
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // releases background bounds
      
      // Delay reset for transition finish
      setTimeout(() => {
        lightboxImg.setAttribute('src', '');
        resetZoom();
      }, 400);
    };

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);

    // Stop propagation so clicking inside controls and actions doesn't close it
    header.addEventListener('click', (e) => e.stopPropagation());

    // Connect page elements
    const setupGalleryEvents = () => {
      const getHomepageImagesList = () => {
        // Collect currently visible images from bento grid
        const wrappers = Array.from(document.querySelectorAll('.gallery-item-wrapper'))
          .filter(el => window.getComputedStyle(el).display !== 'none');

        return wrappers.map(wrapper => {
          const img = wrapper.querySelector('.gallery-item-img') || wrapper.querySelector('img');
          const h4 = wrapper.querySelector('.gallery-item-overlay h4') || wrapper.querySelector('h4');
          const p = wrapper.querySelector('.gallery-item-overlay p') || wrapper.querySelector('p');
          
          return {
            src: img ? img.getAttribute('src') : '',
            alt: img ? img.getAttribute('alt') : '',
            title: h4 ? h4.textContent.trim() : '',
            desc: p ? p.textContent.trim() : ''
          };
        }).filter(item => item.src);
      };

      // Add click handler to home bento items
      document.querySelectorAll('.gallery-item-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', (e) => {
          e.preventDefault();
          
          const currentList = getHomepageImagesList();
          const targetImg = wrapper.querySelector('.gallery-item-img') || wrapper.querySelector('img');
          const targetSrc = targetImg ? targetImg.getAttribute('src') : '';
          
          // Locate image index in matching active files
          const targetIndex = currentList.findIndex(item => item.src === targetSrc);
          openLightbox(currentList, targetIndex >= 0 ? targetIndex : 0);
        });
      });

      // Special bonus support: Interactive room page detail galleries
      const roomMainImg = document.getElementById('gallery-main');
      if (roomMainImg) {
        roomMainImg.style.cursor = 'zoom-in';
        roomMainImg.addEventListener('click', (e) => {
          e.preventDefault();
          const thumbs = Array.from(document.querySelectorAll('.room-gallery__thumb'));
          const images = thumbs.map(thumb => {
            const largeSrc = thumb.getAttribute('data-large-img');
            const thumbImg = thumb.querySelector('img');
            const alt = thumbImg ? thumbImg.getAttribute('alt') : '';
            return {
              src: largeSrc,
              alt: alt,
              title: alt,
              desc: ''
            };
          }).filter(item => item.src);

          const activeThumb = document.querySelector('.room-gallery__thumb--active');
          const activeIndex = thumbs.indexOf(activeThumb);
          openLightbox(images, activeIndex >= 0 ? activeIndex : 0);
        });
      }
    };

    setupGalleryEvents();

    // Keyboard bindings
    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case '=':
        case '+':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
      }
    });
  };

  initScrollToTop();
  initLightbox();

  // 9. Premium Delicate Scroll Progress Bar (Boutique Interactive Showcase)
  const initScrollProgress = () => {
    // Generate container and bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    const updateProgressBar = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();
  };

  // 10. Image Slideshows
  const initSliders = () => {
    const sliders = document.querySelectorAll('.exterior-slider, .image-slider');
    sliders.forEach((slider, index) => {
      const images = slider.querySelectorAll('.slider-image');
      if (images.length <= 1) return;
      
      let currentIndex = 0;
      // Add a small offset based on index so they don't all change at the exact same millisecond
      const intervalDelay = 3500 + (index * 400); 
      
      setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
      }, intervalDelay);
    });
  };
  initSliders();

  initScrollProgress();
});
