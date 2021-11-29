// Element du DOM
const allInfo = document.querySelector('.info-user');
const nameInfo = allInfo.querySelector('h1');
const cityInfo = document.querySelector('.info-city');
const bioInfo = document.querySelector('.info-bio');
const imgInfo = document.querySelector('.photo-img');
const list = allInfo.querySelector('ul');
const showWork = document.querySelector('.photo');

class User {
  constructor() {
    this.getUrl();
  }

  async getUrl() {
    // Préparation du fichier JSON
    try {
      const request = await fetch('../data/data.json');
      if (!request.ok) throw new Error('La requête ne fonctionne pas');

      const response = await request.json();
      const { photographers, media } = response;

      // Récupération de l'id de l'url

      let params = new URLSearchParams(window.location.search);
      const id = params.get('id');

      const user = await this.getUser(photographers, id);
      this.updateInfo(user);
      const imgPortofolio = await this.mediaFilter(media, user);
      this.updatePortofolio(imgPortofolio, user);
      // Recherche du user en question
      console.log(this.getUser(photographers, id));
      //   const user = photographers.find((item) => {
      //     if (item.id == id) {
      //       return item;
      //     }
      //   });
      console.log(user);
      // Utilise la function UpdateUi
      //   nameInfo.textContent = user.name;
      //   cityInfo.textContent = `${user.city}, ${user.country}`;
      //   bioInfo.textContent = user.tagline;
      //   imgInfo.src = `../img/Photographers ID Photos/${user.portrait}`;

      //   let html = '';
      //   user.tags.forEach((element) => {
      //     html += `<li><span>#${element}</span></li>
      //     `;
      //   });
      //   list.innerHTML = html;

      //   const imgPortofolio = media.filter((element) => {
      //     if (element.photographerId == user.id) {
      //       return element;
      //     }
      //   });

      //   let name = user.name.split(' ')[0];
      //   if (name.includes('-')) {
      //     name = name.replace('-', ' ');
      //   }
      //   let portofolio = '';
      //   imgPortofolio.forEach((item) => {
      //     if (item.image == undefined) {
      //       portofolio += `<article class="card">
      //         <a class="card-link">
      //           <div class="card-img">
      //           <video controls="controls" src="../img/Sample Photos /${name}/${item.video}" role="button"></video>
      //           </div>
      //           <div class="card-footer">
      //             <p class="line">${item.title}</p>
      //             <div class="card-footer-likes" aria-label="likes">
      //               <p>${item.likes}</p>
      //               <i class="fas fa-heart"></i>
      //             </div>
      //           </div>
      //         </a>
      //       </article>`;
      //     } else {
      //       portofolio += `<article class="card">
      //         <a class="card-link">
      //           <div class="card-img">
      //             <img src="../img/Sample Photos /${name}/${item.image}" alt="##" />
      //           </div>
      //           <div class="card-footer">
      //             <p class="line">${item.title}</p>
      //             <div class="card-footer-likes" aria-label="likes">
      //               <p>${item.likes}</p>
      //               <i class="fas fa-heart"></i>
      //             </div>
      //           </div>
      //         </a>
      //       </article>`;
      //     }
      //   });
      //   showWork.innerHTML = portofolio;

      // Calcul des likes
    } catch (err) {
      console.log(err.message);
    }
  }

  getUser(data, index) {
    const user = data.find((item) => {
      if (item.id == index) {
        return item;
      }
    });
    return user;
  }

  updateInfo(data) {
    nameInfo.textContent = data.name;
    cityInfo.textContent = `${data.city}, ${data.country}`;
    bioInfo.textContent = data.tagline;
    imgInfo.src = `../img/Photographers ID Photos/${data.portrait}`;

    let html = '';
    data.tags.forEach((element) => {
      html += `<li><span>#${element}</span></li>
        `;
    });
    list.innerHTML = html;
  }

  mediaFilter(data, user) {
    const media = data.filter((element) => {
      if (element.photographerId == user.id) {
        return element;
      }
    });
    return media;
  }

  updatePortofolio(data, user) {
    let name = user.name.split(' ')[0];
    if (name.includes('-')) {
      name = name.replace('-', ' ');
    }

    let portofolio = '';
    data.forEach((item) => {
      if (item.image == undefined) {
        portofolio += `<article class="card">
          <a class="card-link">
            <div class="card-img">
            <video controls="controls" src="../img/Sample Photos /${name}/${item.video}" role="button"></video>
            </div>
            <div class="card-footer">
              <p class="line">${item.title}</p>
              <div class="card-footer-likes" aria-label="likes">
                <p>${item.likes}</p>
                <i class="fas fa-heart"></i>
              </div>
            </div>
          </a>
        </article>`;
      } else {
        portofolio += `<article class="card">
          <a class="card-link">
            <div class="card-img">
              <img src="../img/Sample Photos /${name}/${item.image}" alt="##" />
            </div>
            <div class="card-footer">
              <p class="line">${item.title}</p>
              <div class="card-footer-likes" aria-label="likes">
                <p>${item.likes}</p>
                <i class="fas fa-heart"></i>
              </div>
            </div>
          </a>
        </article>`;
      }
    });
    showWork.innerHTML = portofolio;
  }
}

const user = new User();
