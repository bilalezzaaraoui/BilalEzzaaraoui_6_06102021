'use strict';

// const getData = async function () {
//   try {
//     const request = await fetch('./data.json');
//     const result = await request.json();
//     const { photographers } = result;

//     console.log(photographers);

//     photographers.forEach((data) => {
//       const html = `<article class="photo">
//         <a href="#" aria-label="Lien du photographe">
//           <img
//             src="img/Photographers ID Photos/${data.portrait}"
//             class="photo-img"
//             aria-label="Photo de profil du photographe"
//             alt=""
//           />
//           <h2 aria-label="Nom du photographe">${data.name}</h2>
//         </a>
//         <div aria-label="Text statique">
//           <p class="photo-city">${data.city}, ${data.country}</p>
//           <p class="photo-bio">${data.tagline}</p>
//           <p class="photo-tarif">${data.price}€/jour</p>
//           <div class="photo-grid-tag">
//             <ul>
//             ${data.tags
//               .map((item) => {
//                 return `<li><a href="#">#${item}</a></li>`;
//               })
//               .join('')}
//             </ul>
//           </div>
//         </div>
//       </article>`;

//       document.querySelector('.main').insertAdjacentHTML('beforeend', html);
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// getData();

class App {
  photographersList = [];

  constructor() {
    this.getData();
    this.filter();
  }

  async getData() {
    try {
      const request = await fetch('./data/data.json');
      const result = await request.json();
      const { photographers } = result;

      photographers.forEach((data) => {
        this.photographersList.push(data);
        const html = `<article class="photo">
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

        document.querySelector('.main').insertAdjacentHTML('beforeend', html);
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  filter() {
    const movements = [];
    const link = [];
    const photographers = document.querySelectorAll('.freelancer');
    // Récupération du tags = Step 1 Ok
    photographers.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        // Récuperation du tag = Step 2 Ok
        const tag = e.target.textContent.toLowerCase().trim();
        // console.log(tag);

        // Recuperation des cards = Step 3 Ok
        const allBox = document.querySelectorAll('.photo');

        // Je veux que tu récup tous les li de chaque box
        allBox.forEach((box) => {
          // Récupération des li de toutes les box en array  = Step 4 Ok
          const list = box.querySelectorAll('li');
          // console.log(list);
          //   console.log(list);

          list.forEach((el) => {
            const target = el.querySelector('a').textContent; // Text de chaque a
            const boxPhoto = el.closest('.photo'); // Box photo de chaque a

            // boxPhoto.forEach((ex) => console.log(ex));

            // // link.push(el.querySelector('a').textContent);
            if (target === tag) {
              console.log(target, tag);
              console.log(boxPhoto);
            }

            // if (target === tag) {
            //   boxPhoto.style.display = 'block';
            //   console.log(el.closest('.photo'));
            //   // console.log(target, tag);
            //   // console.log(typeof target, typeof tag);
            // } else {
            //   boxPhoto.style.display = 'none';
            //   // console.log(boxPhoto);
            // }

            // if (target != tag) {
            //   console.log(boxPhoto, typeof boxPhoto);
            // }

            // link.map((ex) => console.log(ex.parentElement));
            // console.log(li);
            // console.log(target);
            // console.log(tag);

            // if (target === tag) {
            //   boxPhoto.style.backgroundColor = 'blue';
            //   console.log('ok');
            // } else {
            //   boxPhoto.style.display = 'none';
            // }

            // switch (target === tag) {
            //   case true:
            //     boxPhoto.style.display = 'block';
            //     break;
            //   default:
            //     boxPhoto.style.display = 'none';
            // }
          });
        });

        // this.photographers.forEach((item) => {
        //   console.log(item.tags);
        // });
      });
    });
  }
}

const app = new App();
