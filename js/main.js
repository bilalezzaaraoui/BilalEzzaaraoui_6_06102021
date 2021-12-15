'use strict';

// eslint-disable-next-line import/extensions
import Photographer from './photographer.js';

const logo = document.querySelector('.logo');

class App {
  photographersList = [];

  constructor() {
    this.getData();
    this.clickPhotographer();
    this.scrollButton();
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
      // eslint-disable-next-line no-restricted-globals
      logo.href = location.href;
      // eslint-disable-next-line no-restricted-globals
    } catch (err) {
      console.error(err.message);
    }
  }

  scrollButton() {
    const button = document.querySelector('.btn-content');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;

      if (y >= 130) {
        button.style.display = 'flex';
      } else {
        button.style.display = 'none';
      }
    });
    console.log(button.querySelector('a'));
    button.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      console.log(window.location);
    });
  }

  displayPhotographer(photographers) {
    let html = '';
    photographers.forEach((data) => {
      html += `<article class="photo" aria-label="Profil de ${data.name}">
              <a href="#" aria-label="Lien du photographe">
                <img
                  src="img/Photographers ID Photos/${data.portrait}"
                  class="photo-img"
                  alt="${data.alt}"
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
    photographers.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const firstParent = e.target.parentElement;
        if (firstParent) {
          firstParent.classList.replace('off', 'active');
          const tag = e.target.textContent.toLowerCase().trim().slice(1);
          this.filterPhotographer(tag);
        }

        document.querySelectorAll('.list').forEach((el) => {
          if (el !== firstParent) {
            el.classList.replace('active', 'off');
          }
        });
      });
    });

    photographers.forEach((item) => {
      item.addEventListener('focus', (e) => {
        const tag = e.target.textContent.toLowerCase().trim().slice(1);
        document.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            this.filterPhotographer(tag);
          }
        });
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
            // Live server
            // const url = new URL(
            //   // eslint-disable-next-line no-restricted-globals
            //   `${location.origin}/pages/user.html?id=${item.id}`
            // );

            // Github
            const url = new URL(
              // eslint-disable-next-line no-restricted-globals
              `${location.href}pages/user.html?id=${item.id}`
            );

            window.location = url;
          }
        });
      });
    });
  }
}

const app = new App();
