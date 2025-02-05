document.addEventListener('DOMContentLoaded', () => {
  let bgColorIndex = 0;
  const colors = [
    "linear-gradient(135deg, #1e293b, #3b82f6)",
    "#1e293b",
    "rgb(15, 54, 115)",
    "darkblue"
  ];
  document.body.style.background = colors[bgColorIndex];
  document.body.style.transition = "background 1s ease-in-out";

  // Change background color every 4 seconds
  setInterval(() => {
    bgColorIndex = (bgColorIndex + 1) % colors.length;
    document.body.style.background = colors[bgColorIndex];
  }, 4000);

  // Smooth scrolling (Cross-browser support via CSS)
  document.documentElement.style.scrollBehavior = "smooth";

  // Navigation menu hover effect
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseover', () => link.style.cssText = "color: #d1d5db !important;");
    link.addEventListener('mouseout', () => link.style.cssText = "");
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('href').substring(1));
      if (target) {
        window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      }
    });
  });

  // Profile image hover effect
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.addEventListener('mouseover', () => profileImg.style.transform = 'scale(1.1) rotate(5deg)');
    profileImg.addEventListener('mouseout', () => profileImg.style.transform = 'scale(1) rotate(0)');
  }

  // Project slider functionality
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');

  // Adjust slides per view based on screen width
  function getSlidesPerView() {
    if (window.innerWidth < 576) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  }

  let slidesPerView = getSlidesPerView();
  let totalSlides = slides.length;
  let slideIndex = 0;

  function updateSlider() {
    const shift = (100 / slidesPerView) * slideIndex; // Adjust for multiple images
    slider.style.transform = `translateX(-${shift}%)`;
  }

  window.nextSlide = function () {
    if (slideIndex < totalSlides - slidesPerView) {
      slideIndex++;
    } else {
      slideIndex = 0; // Loop back to start
    }
    updateSlider();
  };

  window.prevSlide = function () {
    if (slideIndex > 0) {
      slideIndex--;
    } else {
      slideIndex = totalSlides - slidesPerView;
    }
    updateSlider();
  };

  document.querySelector('.next')?.addEventListener('click', nextSlide);
  document.querySelector('.prev')?.addEventListener('click', prevSlide);

  // Auto-slide functionality (Pause when page is not visible)
  let autoSlide = setInterval(nextSlide, 4000);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(autoSlide);
    } else {
      autoSlide = setInterval(nextSlide, 4000);
    }
  });

  // Update slidesPerView on window resize
  window.addEventListener("resize", function () {
    slidesPerView = getSlidesPerView();
    updateSlider();
  });
});