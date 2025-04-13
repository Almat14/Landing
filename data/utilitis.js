let slideIndex = 0;
const maxIndex = 3;
const x = document.getElementsByClassName("slider-heading");
const z = document.getElementById("slider-image");
const y = document.getElementsByClassName("slider-dot");
const upButton = document.getElementsByClassName("up-button")[0];
let carouselInterval = null;

function showSlide(index) {
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    z.children[i].style.display = "none";
    y[i].firstElementChild.style.display = "none";
    y[i].lastElementChild.style.display = "block";
  }

  x[index].style.display = "block";
  z.children[index].style.display = "block";
  y[index].lastElementChild.style.display = "none";
  y[index].firstElementChild.style.display = "block";
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    slideIndex = (slideIndex + 1) % maxIndex;
    showSlide(slideIndex);
  }, 3000);
}

function resetCarousel() {
  clearInterval(carouselInterval);
  startCarousel();
}

function moveSlide(num) {
  clearInterval(carouselInterval);
  slideIndex = num - 1;
  showSlide(slideIndex);
  startCarousel();
}

const toggleButton = document.getElementById('toggle-button');
  const body = document.body;

  // Check if the dark theme is already applied (localStorage or cookies could be used here)
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
  }

  // Toggle theme on button click
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    // Save the theme in localStorage to persist it across page reloads
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      toggleButton.lastElementChild.style.display = "inline";
      toggleButton.firstElementChild.style.display = "none";
    } else {
      localStorage.removeItem('theme');
      toggleButton.lastElementChild.style.display = "none";
      toggleButton.firstElementChild.style.display = "inline";
    }
  });


window.addEventListener('scroll', function() {
  if (window.scrollY >= 300) {
    upButton.style.display = "block";
    // You can trigger any actions here if you reach 300px
  } else {
    upButton.style.display = "none";
  }
});


startCarousel();
