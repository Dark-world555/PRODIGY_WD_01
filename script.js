// navbar ressponsiveness
// Select the burger menu and navbar
const burgerMenu = document.getElementById('burger-menu');
const navbar = document.querySelector('.navbar');

// Toggle the .show class when the burger menu is clicked
burgerMenu.addEventListener('click', () => {
  navbar.classList.toggle('show');
});

// Optional: Automatically close the menu when resizing back to desktop size
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navbar.classList.remove('show');
  }
});


// toggle dark mode and light mode
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  document.getElementById("theme-toggle").checked = newTheme === "dark";
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.getElementById("theme-toggle").checked = savedTheme === "dark";
});


// for hero section slider
let currentSlide = 0;
let slidesData = [
  {
    "name": "Air Max Runner",
    "description": "Lightweight running shoes with advanced cushioning.",
    "image": "./img/hero-3.png"
  },
  {
    "name": "Classic Sneakers",
    "description": "Stylish sneakers for casual outings.",
    "image": "./img/hero-2.png"
  },
  {
    "name": "Pro Basketball Shoes",
    "description": "High-top shoes for excellent ankle support.",
    "image": "./img/hero-1.png"
  }
  // Add more slides as needed
];

// Initialize slider by populating slides
function loadSlides() {
  const heroSlider = document.querySelector(".hero-slider");

  slidesData.forEach((slide, index) => {
    const slideDiv = document.createElement("div");
    slideDiv.className = "slide" + (index === 0 ? " active" : "");
    slideDiv.innerHTML = `
      <img src="${slide.image}" alt="${slide.name}">
      <div class="slide-text">
        <h2>${slide.name}</h2>
        <p>${slide.description}</p>
      </div>

    `;
    heroSlider.insertBefore(slideDiv, heroSlider.querySelector(".prev"));
  });
}

// Show the slide at the currentSlide index
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

// Move to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slidesData.length;
  showSlide(currentSlide);
}

// Move to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
  showSlide(currentSlide);
}

// Auto-cycle slides every 5 seconds
setInterval(nextSlide, 5000);

// Load slides on DOM content load
document.addEventListener("DOMContentLoaded", loadSlides);




document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        const container = document.querySelector(".shoe-container");
        data.forEach(shoe => {
          const card = document.createElement("div");
          card.className = "shoe-card";
  
          card.innerHTML = `
            <img src="${shoe.image}" alt="${shoe.name}" class="shoe-image">
            <div class="shoe-details">
              <h3 class="shoe-name">${shoe.name}</h3>
              <p class="shoe-price">${shoe.price}</p>
              <p class="shoe-description">${shoe.description}</p>
              <button class="btn">Buy now </button>
              <button class="btn"><i class="fa-solid fa-cart-shopping"></i> Add to cart </button>
            </div>
          `;
  
          container.appendChild(card);
        });
      });
  });

  // for contact form
  document.querySelector('.contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents actual form submission
    alert('Thank you! Your message has been sent.');
    this.reset(); // Clears the form fields
  });
  
  