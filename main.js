  function showMobilemenu() {
      const mobilemenu = document.querySelector(".mobilemenu");
      mobilemenu.style.display = 'flex';
      setTimeout(() => {
          mobilemenu.style.transform = 'translateX(0)'; 
      }, 10);
  }

  function closeMobilemenu() {
      const mobilemenu = document.querySelector(".mobilemenu");
      mobilemenu.style.transform = 'translateX(100%)'; 
      setTimeout(() => {
          mobilemenu.style.display = 'none';
      }, 300);
  }

  const carousel = document.querySelector('.carousel');
  const slider = carousel.querySelector('.carousel_track');
  let slides = [...slider.children];

  // Initial slides position, so user can go from first to last slide (click to the left first)
  slider.prepend(slides[slides.length - 1]);

  // Creating dot for each slide
  const createDots = (carousel, initSlides) => {
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel_nav');

    initSlides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.classList.add('carousel_dot');
      dot.setAttribute('aria-label', `Slide number ${index + 1}`);
      slide.dataset.position = index;
      if (slide.classList.contains('is-selected')) {
        dot.classList.add('is-selected');
      }
      dotsContainer.appendChild(dot);
    });

    carousel.appendChild(dotsContainer);

    return dotsContainer;
  };

  // Updating relevant dot
  const updateDot = (slide) => {
    const currDot = dotNav.querySelector('.is-selected');
    const targetDotIndex = slide.dataset.position;

    currDot.classList.remove('is-selected');
    dots[targetDotIndex].classList.add('is-selected');
  };

  // Handling arrow buttons
  const handleArrowClick = (arrow) => {
    arrow.addEventListener('click', () => {
      slides = [...slider.children];
      const currSlide = slider.querySelector('.is-selected');
      currSlide.classList.remove('is-selected');
      let targetSlide;

      if (arrow.classList.contains('jsPrev')) {
        targetSlide = currSlide.previousElementSibling || slides[slides.length - 1];
        slider.prepend(slides[slides.length - 1]);
      }

      if (arrow.classList.contains('jsNext')) {
        targetSlide = currSlide.nextElementSibling || slides[0];
        slider.append(slides[0]);
      }

      targetSlide.classList.add('is-selected');
      updateDot(targetSlide);
    });
  };

  const buttons = carousel.querySelectorAll('.carousel_btn');
  buttons.forEach(handleArrowClick);

  // Handling dot buttons
  const handleDotClick = (dot) => {
    const dotIndex = dots.indexOf(dot);
    const currSlidePos = slider.querySelector('.is-selected').dataset.position;
    const targetSlide = slider.querySelector(`[data-position='${dotIndex}']`);

    const count = Math.abs(currSlidePos - dotIndex);

    if (currSlidePos < dotIndex) {
      for (let i = 0; i < count; i++) nextBtn.click();
    } else if (currSlidePos > dotIndex) {
      for (let i = 0; i < count; i++) prevBtn.click();
    }
  };

  const dotNav = createDots(carousel, slides);
  const dots = [...dotNav.children];
  const prevBtn = buttons[0];
  const nextBtn = buttons[1];

  dotNav.addEventListener('click', (e) => {
    const dot = e.target.closest('button');
    if (!dot) return;
    handleDotClick(dot);
  });

  // Auto sliding
  const slideTiming = 5000;
  let interval;
  const slideInterval = () => interval = setInterval(() => nextBtn.click(), slideTiming);

  carousel.addEventListener('mouseover', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', slideInterval);
  slideInterval();




  // Testimonial Card Slider
  document.addEventListener('DOMContentLoaded', function () {
      const carousel = document.querySelector('.testimonial-carousel');
      const items = carousel.querySelectorAll('.testimonial-item');
      const arrowLeft = carousel.querySelector('.arrow-left');
      const arrowRight = carousel.querySelector('.arrow-right');
      let currentIndex = 0;

      function updateClasses() {
          items.forEach((item, index) => {
              item.classList.remove('active', 'next', 'prev');
              if (index === currentIndex) {
                  item.classList.add('active');
              } else if (index === (currentIndex + 1) % items.length) {
                  item.classList.add('next');
              } else if (index === (currentIndex - 1 + items.length) % items.length) {
                  item.classList.add('prev');
              }
          });
      }

      function showNextSlide() {
          currentIndex = (currentIndex + 1) % items.length;
          updateClasses();
      }

      function showPrevSlide() {
          currentIndex = (currentIndex - 1 + items.length) % items.length;
          updateClasses();
      }

      arrowLeft.addEventListener('click', showPrevSlide);
      arrowRight.addEventListener('click', showNextSlide);

      updateClasses();
      setInterval(showNextSlide, 4500);
  });

  document.addEventListener("DOMContentLoaded", function() {
      // Toggle dropdown menus on click for mobile view
      const dropdownToggles = document.querySelectorAll('.mobilemenu .nav-item > a');

      dropdownToggles.forEach(function(dropdownToggle) {
          dropdownToggle.addEventListener('click', function(e) {
              if (window.innerWidth < 768) {
                  const parentNavItem = this.parentElement;
                  if (parentNavItem.querySelector('.dropdown-menu')) {
                      e.preventDefault();
                      parentNavItem.classList.toggle('open');
                  }
              }
          });
      });
  });
