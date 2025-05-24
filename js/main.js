document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();

  // =================== [ Direction Detection ] ===================
// Check if the page is RTL
const isRTL = document.documentElement.dir === 'rtl';

// If direction is LTR, also load the style-ltr.css after style.css
if (!isRTL) {
  const ltrStyle = document.createElement('link');
  ltrStyle.rel = 'stylesheet';
  ltrStyle.href = 'CSS/style-ltr.css'; // Adjust path if needed
  document.head.appendChild(ltrStyle);
}

// Optionally add a class to body for direction awareness
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add(isRTL ? 'rtl' : 'ltr');
});


  // =================== [ Offcanvas Management on Resize ] ===================
  const offcanvasMenu = document.getElementById("offcanvasMenu");
  const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasMenu);

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      if (offcanvasMenu.classList.contains("show")) {
        offcanvasInstance.hide();
      }
    }
  });

  // =================== [ Hero Video Behavior ] ===================
  const video = document.getElementById("hero-video");
  if (video) {
    video.addEventListener("ended", () => {
      const container = document.querySelector(".hero-video-container");
      if (container) container.remove();

      const heroSection = document.querySelector(".hero-section");
      if (heroSection) heroSection.style.backgroundColor = "black";
    });
  }

  // =================== [ Custom Select Menu Logic ] ===================
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((customSelect) => {
    const selectedText = customSelect.querySelector("span");
    const leftImage = customSelect.querySelector(".left-image");
    const options = customSelect.querySelectorAll(".option-item");

    customSelect.addEventListener("click", (e) => {
      customSelect.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedText.textContent = option.textContent.trim();
        leftImage.src = option.querySelector("img").src;
        options.forEach((o) => o.classList.remove("active"));
        option.classList.add("active");
        customSelect.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", (e) => {
    customSelects.forEach((customSelect) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("open");
      }
    });
  });

  // =================== [ Owl Carousel Initialization ] ===================
  $(".owl-carousel").owlCarousel({
    items: 5,
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    nav: false,
    dots: false,
    rtl: isRTL // Set RTL based on document direction
  });

  // =================== [ Additional RTL/LTR Adjustments ] ===================
  if (!isRTL) {
    // Adjustments for LTR layout
    const chevrons = document.querySelectorAll('.chevron');
    chevrons.forEach(chevron => {
      if (chevron.getAttribute('data-lucide') === 'chevron-left') {
        chevron.setAttribute('data-lucide', 'chevron-right');
      } else if (chevron.getAttribute('data-lucide') === 'chevron-right') {
        chevron.setAttribute('data-lucide', 'chevron-left');
      }
    });
    
    // Re-create icons after potential changes
    lucide.createIcons();
  }
});