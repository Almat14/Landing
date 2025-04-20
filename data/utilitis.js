let slideIndex = 0;
const maxIndex = 3;
const x = document.getElementsByClassName("slider-heading");
const z = document.getElementById("slider-image");
const y = document.getElementsByClassName("slider-dot");
const upButton = document.getElementsByClassName("up-button")[0];
const burgerButton = document.getElementById("burger-button");
const body = document.body;
const toggleTheme = document.getElementById("toggle-theme");
const filterButton = document.getElementsByClassName("filter-btn");
var savedTheme;
let carouselInterval = null;
let articles;

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

function GetTheme() {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    toggleTheme.checked = true;
  }
  else {
    toggleTheme.checked = false;
  }
}

function ChangeTheme() {
  if (toggleTheme.checked) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.removeItem("theme");
  }
}




window.addEventListener('scroll', function() {
  if (window.scrollY >= 300) {
    upButton.style.display = "block";
  } else {
    upButton.style.display = "none";
  }
});



async function fetchProjects() {
  try {
      const response = await fetch('data/data.json');
      const data = await response.json();
       return data.articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
}



function SetProjects(articles) {
  document.documentElement = "project"
  var projectContainer = document.getElementById("project-container");
  if (articles) {
      projectContainer.innerHTML = ``;
      for(let i =0; i< articles.length; i++) {
          var card = CreateCard(articles[i]);
          projectContainer.append(card);
      }
  }
}

function SetDate(days) {
  const daysInt = parseInt(days, 10);

  const weeks = Math.floor(daysInt / 7);
  const remainingDays = daysInt % 7;
  const months = Math.floor(daysInt / 30);
  const remainingDaysAfterMonths = daysInt % 30;

  if (months > 0) {
    return months +  " " + "months";
  }
  else if (weeks > 0) {
    return weeks + " "  + "weeks";
  }
  else {
    return daysInt + " " + "day";
  }
}

function CreateCard(article) {
  var card = document.createElement("article");
  card.classList.add("project-box")
  card.innerHTML = `
   <img src="${article.image}" alt="${article.title}">
   <p class="guid-color">${article.tag}</p>
   <section class="project-type">
    <h1 class="project-title">${article.title}</h1>
    <img src="assets/arrow-up-right.png" alt="arrow" class="arrow-icon">
    </section>
     <p class="project-desc">${article.description}</p>
     <article class="project-details">
                <p>
                  ${SetDate(article.meta.duration_days)} | ${article.meta.technologies.map(tech => tech).join(" | ")}
                </p>
                <p>
                  ${article.created_at}
                </p> 
              </article>
  `
  return card;
}

function closeSideMenu() {
  burgerButton.checked = false;
}

 async function initProjects() {
   articles = await fetchProjects();
    SetProjects(articles)
}

async function RandomProjects() {
  let articles = await fetchProjects();
    SetRandomProjects(articles)
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}

function SetRandomProjects(articles) {
  var projectContainer = document.getElementById("project-container");
  if (articles && articles.length > 0) {
    projectContainer.innerHTML = ``;

    // Shuffle articles
    const shuffled = [...articles].sort(() => Math.random() - 0.5);

    // Take the first 3 unique ones
    const selected = shuffled.slice(0, 3);

    for (const article of selected) {
      var card = CreateCard(article);
      projectContainer.append(card);
    }
  }
}

function filter(num, tag) {
  let filtered = articles;
 for(let i = 0; i < filterButton.length; i++) {
  filterButton[i].style.textDecoration ="none";
 }
  filterButton[num].style.textDecoration ="underline";
    filtered = filterByTags(filtered, tag);
    //filtered = sortByCreatedAt(filtered);
  SetProjects(filtered);
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function filterByTags(arts, tag) {
  if (!tag) return arts; 
  return tag ? arts.filter(art => art.tag === tag) : arts;
}

function handleFaq(event) {
  const clickedElement = event.target;

  // Find the closest parent with the class 'faq-content' (the container of this FAQ)
  const faqContent = clickedElement.closest('.faq-content');

  // Find the 'details' element inside the faqContent
  const details = faqContent.querySelector('details');
  details.open = !details.open;
}



