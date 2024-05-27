document.addEventListener('DOMContentLoaded', function () {
  // Header JS
  let navbar = document.querySelector(".navbar");
  let searchBox = document.querySelector(".search-box .bx-search");

  searchBox.addEventListener("click", () => {
      navbar.classList.toggle("showInput");
      if (navbar.classList.contains("showInput")) {
          searchBox.classList.replace("bx-search", "bx-x");
      } else {
          searchBox.classList.replace("bx-x", "bx-search");
      }
  });

  let navLinks = document.querySelector(".nav-links");
  let menuOpenBtn = document.querySelector(".navbar .bx-menu");
  let menuCloseBtn = document.querySelector(".nav-links .bx-x");

  menuOpenBtn.onclick = function() {
      navLinks.style.left = "0";
  };
  menuCloseBtn.onclick = function() {
      navLinks.style.left = "-100%";
  };

  let htmlcssArrow = document.querySelector(".htmlcss-arrow");
  htmlcssArrow.onclick = function() {
      navLinks.classList.toggle("show1");
  };

  let moreArrow = document.querySelector(".more-arrow");
  moreArrow.onclick = function() {
      navLinks.classList.toggle("show2");
  };

  let jsArrowss = document.querySelector(".js-arrowss");
  jsArrowss.onclick = function() {
      navLinks.classList.toggle("show3");
  };

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



  // Testimonial Carousel JS
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  if (testimonialCarousel) {
      const items = testimonialCarousel.querySelectorAll('.testimonial-item');
      const arrowLeft = testimonialCarousel.querySelector('.arrow-left');
      const arrowRight = testimonialCarousel.querySelector('.arrow-right');
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
  }
});

// Load the YouTube Player API code asynchronously
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Define variables to store the player and player status
var player;
var playerStatus = 'paused';

// Function called when the YouTube Player API code is loaded
function onYouTubeIframeAPIReady() {
    // Create a new YouTube player object
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'bdM98XGwn1I', // Replace with your YouTube video ID
        playerVars: {
            'playsinline': 1 // Play inline on iOS devices
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// Function to handle player state changes
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        playerStatus = 'playing';
    } else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        playerStatus = 'paused';
    }
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
  const modals = document.getElementsByClassName('modal');
  for (let i = 0; i < modals.length; i++) {
      if (event.target == modals[i]) {
          modals[i].style.display = "none";
      }
  }
}
