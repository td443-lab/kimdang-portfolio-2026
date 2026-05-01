const navToggle = document.querySelector(".site-nav__toggle");
const navMenu = document.querySelector(".site-nav__menu");
const navLinks = Array.from(document.querySelectorAll(".site-nav__link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const revealItems = document.querySelectorAll(".reveal");
const carousel = document.querySelector("[data-carousel]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("is-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    });
  });
}

if (sections.length && navLinks.length) {
  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      link.setAttribute("aria-current", isActive ? "location" : "false");
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-32% 0px -50% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (carousel) {
  const track = carousel.querySelector(".fiber-showcase__track");
  const slides = Array.from(carousel.querySelectorAll(".fiber-slide"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const currentCount = carousel.querySelector("[data-carousel-current]");
  const totalCount = carousel.querySelector("[data-carousel-total]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let autoAdvance = null;

  const renderSlide = (index) => {
    if (!track || !slides.length) {
      return;
    }

    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    if (currentCount) {
      currentCount.textContent = String(activeIndex + 1).padStart(2, "0");
    }
  };

  const stopAutoAdvance = () => {
    if (autoAdvance) {
      window.clearInterval(autoAdvance);
      autoAdvance = null;
    }
  };

  const startAutoAdvance = () => {
    if (reducedMotion || slides.length < 2) {
      return;
    }

    stopAutoAdvance();
    autoAdvance = window.setInterval(() => {
      renderSlide(activeIndex + 1);
    }, 4600);
  };

  prevButton?.addEventListener("click", () => {
    renderSlide(activeIndex - 1);
    startAutoAdvance();
  });

  nextButton?.addEventListener("click", () => {
    renderSlide(activeIndex + 1);
    startAutoAdvance();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      renderSlide(index);
      startAutoAdvance();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoAdvance);
  carousel.addEventListener("mouseleave", startAutoAdvance);
  carousel.addEventListener("focusin", stopAutoAdvance);
  carousel.addEventListener("focusout", startAutoAdvance);

  if (totalCount) {
    totalCount.textContent = String(slides.length).padStart(2, "0");
  }

  renderSlide(0);
  startAutoAdvance();
}
