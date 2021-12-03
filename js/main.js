'use strict';

class App {
  photographersList = [];

  constructor() {
    this.getData();
    this.clickPhotographer();
  }

  async getData() {
    try {
      const request = await fetch('./data/data.json');
      const result = await request.json();
      const { photographers } = result;
      this.photographersList = photographers.map(
        (item) => new Photographer(item)
      );

      this.displayPhotographer(photographers);
    } catch (err) {
      console.error(err.message);
    }
  }

  displayPhotographer(photographers) {
    let html = '';
    photographers.forEach((data) => {
      html += `<article class="photo">
              <a href="#" aria-label="Lien du photographe">
                <img
                  src="img/Photographers ID Photos/${data.portrait}"
                  class="photo-img"
                  aria-label="Photo de profil du photographe"
                  alt=""
                />
                <h2 aria-label="Nom du photographe">${data.name}</h2>
              </a>
              <div aria-label="Text statique">
                <p class="photo-city">${data.city}, ${data.country}</p>
                <p class="photo-bio">${data.tagline}</p>
                <p class="photo-tarif">${data.price}€/jour</p>
                <div class="photo-grid-tag">
                  <ul>
                  ${data.tags
                    .map((item) => `<li><a href="#">#${item}</a></li>`)
                    .join('')}
                  </ul>
                </div>
              </div>
            </article>`;

      document.querySelector('.main').innerHTML = html;
    });
    this.sendUrl();
  }

  clickPhotographer() {
    const photographers = document.querySelectorAll('.freelancer');
    // Récupération du tags = Step 1 Ok
    photographers.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        // Récuperation du tag = Step 2 Ok
        const tag = e.target.textContent.toLowerCase().trim().slice(1);
        this.filterPhotographer(tag);
      });
    });
  }

  filterPhotographer(data) {
    // eslint-disable-next-line array-callback-return
    const filterArr = this.photographersList.filter((photographer) => {
      if (photographer.tags.includes(data)) return photographer;
    });
    this.displayPhotographer(filterArr);
  }

  sendUrl() {
    const allPhotographer = document.querySelectorAll('.photo');
    allPhotographer.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const index = el.querySelector('h2').textContent;
        // eslint-disable-next-line array-callback-return
        this.photographersList.find((item) => {
          if (item.name === index) {
            console.log(item);
            const url = new URL(
              // eslint-disable-next-line no-restricted-globals
              `${location.origin}/pages/user.html?id=${item.id}`
            );
            window.location = url;
          }
        });
      });
    });
  }
}

const app = new App();
