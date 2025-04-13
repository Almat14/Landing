
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
    var projectContainer = document.getElementById("project-container");
    if (articles) {
        projectContainer.innerHTML = ``;
        for(let i =0; i< articles.length; i++) {
            var card = CreateCard(articles[i]);
            projectContainer.append(card);
        }
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
                    ${article.meta.duration_days} | ${article.meta.technologies.map(tech => tech).join(" | ")}
                  </p>
                  <p>
                    ${article.created_at}
                  </p> 
                </article>
    `
    return card;
  }

  window.onload = async () => {
    let articles = await fetchProjects();
    SetProjects(articles)
  };
