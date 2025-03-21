document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu toggle
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const body = document.body;

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function() {
      body.classList.toggle("mobile-menu-open");
    });
  }

  // Mobile submenu toggle
  const hasSubmenuItems = document.querySelectorAll(".has-submenu");

  hasSubmenuItems.forEach(item => {
    const link = item.querySelector("a");

    if (window.innerWidth < 768) {
      link.addEventListener("click", function(e) {
        if (body.classList.contains("mobile-menu-open")) {
          e.preventDefault();
          item.classList.toggle("active");
        }
      });
    }
  });

  // Testimonials slider
  const testimonialsSlider = document.getElementById("testimonials-slider");
  const prevButton = document.getElementById("prev-testimonial");
  const nextButton = document.getElementById("next-testimonial");

  if (testimonialsSlider && prevButton && nextButton) {
    const testimonials = testimonialsSlider.querySelectorAll(".testimonial");
    let currentIndex = 0;

    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = "none";
      }
    });

    // Show the testimonial at the current index
    function showTestimonial(index) {
      testimonials.forEach(testimonial => {
        testimonial.style.display = "none";
      });
      testimonials[index].style.display = "block";
    }

    // Previous button click handler
    prevButton.addEventListener("click", function() {
      currentIndex = (currentIndex === 0) ?
        testimonials.length - 1 : currentIndex - 1;
      showTestimonial(currentIndex);
    });

    // Next button click handler
    nextButton.addEventListener("click", function() {
      currentIndex = (currentIndex === testimonials.length - 1) ?
        0 : currentIndex + 1;
      showTestimonial(currentIndex);
    });

    // Auto slide every 5 seconds
    setInterval(function() {
      currentIndex = (currentIndex === testimonials.length - 1) ?
        0 : currentIndex + 1;
      showTestimonial(currentIndex);
    }, 5000);
  }

  // Destination filters
  const applyFiltersButton = document.getElementById("apply-filters");

  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", function() {
      const regionFilter = document.getElementById("region-filter").value;
      const typeFilter = document.getElementById("type-filter").value;
      const durationFilter = document.getElementById("duration-filter").value;

      const destinationCards = document.querySelectorAll(".destination-card");

      destinationCards.forEach(card => {
        let showCard = true;

        // Check region filter
        if (regionFilter !== "all" &&
            !card.dataset.region.includes(regionFilter)) {
          showCard = false;
        }

        // Check type filter
        if (typeFilter !== "all" &&
            !card.dataset.type.includes(typeFilter)) {
          showCard = false;
        }

        // Check duration filter
        if (durationFilter !== "all" &&
            !card.dataset.duration.includes(durationFilter)) {
          showCard = false;
        }

        card.style.display = showCard ? "block" : "none";
      });
    });
  }

  // Season tabs
  const seasonTabs = document.querySelectorAll(".season-tab");

  if (seasonTabs.length > 0) {
    seasonTabs.forEach(tab => {
      tab.addEventListener("click", function() {
        // Remove active class from all tabs and panels
        document.querySelectorAll(".season-tab")
          .forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".season-panel")
          .forEach(p => p.classList.remove("active"));

        // Add active class to clicked tab
        tab.classList.add("active");

        // Show corresponding panel
        const season = tab.dataset.season;
        document.getElementById(`${season}-panel`).classList.add("active");
      });
    });
  }

  // Form validation
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      let isValid = true;

      // Validate name
      if (nameInput.value.trim() === "") {
        isValid = false;
        nameInput.style.borderColor = "red";
      } else {
        nameInput.style.borderColor = "";
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = "red";
      } else {
        emailInput.style.borderColor = "";
      }

      // Validate message
      if (messageInput.value.trim() === "") {
        isValid = false;
        messageInput.style.borderColor = "red";
      } else {
        messageInput.style.borderColor = "";
      }

      if (!isValid) {
        e.preventDefault();
        alert("Controleer de velden met rode rand en probeer opnieuw.");
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");

      if (targetId !== "#") {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Lazy loading images
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img[loading=\"lazy\"]");
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/" +
      "lazysizes.min.js";
    document.body.appendChild(script);
  }

  // Initialize Google Map
  window.initMap = function() {
    const mapElement = document.getElementById("map");

    if (mapElement) {
      // Amsterdam coordinates
      const amsterdam = { lat: 52.3676, lng: 4.9041 };

      const map = new google.maps.Map(mapElement, {
        center: amsterdam,
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Add marker for office location
      const marker = new google.maps.Marker({
        position: { lat: 52.3702, lng: 4.8952 },
        map: map,
        title: "Wereldreizen Kantoor"
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: "<strong>Wereldreizen</strong><br>Damstraat 21<br>" +
                 "1012 JS Amsterdam"
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
  };
});