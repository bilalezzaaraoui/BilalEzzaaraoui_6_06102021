// Element du DOM

// const { check } = require('prettier');

// Information et portfolio de l'utilisateur
const allInfo = document.querySelector('.info-user');
const nameInfo = allInfo.querySelector('h1');
const cityInfo = document.querySelector('.info-city');
const bioInfo = document.querySelector('.info-bio');
const imgInfo = document.querySelector('.photo-img');
const list = allInfo.querySelector('ul');
const showWork = document.querySelector('.photo');
// Contact
const contactBtn = document.getElementById('contact');
const overlay = document.querySelector('.overlay-modal');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.fa-times');
const submitBtn = document.getElementById('submit');
const userContact = document.querySelector('.user-contact');
// Input du formulaire
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const email = document.getElementById('email');
const message = document.getElementById('message');
const allForm = document.querySelectorAll('.form');
// Ordre de triage
const allOption = document.querySelectorAll('.option-order');
const optionSelected = document.getElementById('btn-choisi');
// Slider
const sliderContainer = document.querySelector('.slider-container');
const rightArrow = document.querySelector('.fa-angle-right');
const leftArrow = document.querySelector('.fa-angle-left');
const videoPlayer = document.querySelector('.video-player');

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

      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');

      const user = await this.getUser(photographers, id);
      this.updateInfo(user);
      const imgPortofolio = await this.mediaFilter(media, user);
      this.sortPhotographers(imgPortofolio, user);
      this.updatePortofolio(imgPortofolio, user);
      this.counterLikes(imgPortofolio);
      this.updateLikes(imgPortofolio);
    } catch (err) {
      console.log(err.message);
    }
  }

  getUser(data, index) {
    const user = data.find((item) => {
      if (item.id == index) return item;
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
    this.contact(data);
  }

  mediaFilter(data, user) {
    const media = data.filter((element) => {
      if (element.photographerId == user.id) return element;
    });
    return media;
  }

  updatePortofolio(data, user) {
    const salary = document.querySelector('.price-counter');
    salary.textContent = `${user.price}€ / jour`;
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
    this.slider(data, user);
  }

  counterLikes(data) {
    // Possibilité d'incrémenter un like
    const section = document.querySelector('.photo');
    const likesBtn = section.querySelectorAll('.fa-heart');

    likesBtn.forEach((el) => {
      el.addEventListener('click', (e) => {
        const likeDom = e.target.parentElement.querySelector('p');
        const likeData = data.find((item) => {
          if (item.likes == likeDom.textContent) {
            return item;
          }
        });
        // eslint-disable-next-line no-plusplus
        likeDom.textContent = ++likeData.likes;
        this.updateLikes(data);
      });
    });
  }

  updateLikes(data) {
    const likeCounter = document.querySelector('.like-counter');

    const likesMap = data.map((item) => item.likes);

    const getTotal = (total, num) => total + num;

    const total = likesMap.reduce(getTotal, 0);

    likeCounter.innerHTML = `${total} <i class="fas fa-heart"></i>`;
  }

  contact(user) {
    contactBtn.addEventListener('click', () => {
      overlay.style.display = 'flex';
      if (overlay.style.display === 'flex') {
        prenom.focus();
        userContact.textContent = user.name;
        const emailIsValid = function (emailData) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData);
        };

        closeBtn.addEventListener('click', () => {
          overlay.style.display = 'none';
        });

        submitBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const setError = function (paramater1) {
            paramater1.classList.add('error');
          };

          const deleteError = function (paramater2) {
            return paramater2.classList.remove('error');
          };
          if (prenom.value === '') {
            setError(prenom);
          } else {
            deleteError(prenom);
          }

          if (nom.value === '') {
            setError(nom);
          } else {
            deleteError(nom);
          }

          if (email.value === '' || !emailIsValid(email.value)) {
            setError(email);
          } else {
            deleteError(email);
          }

          if (message.value === '') {
            setError(message);
          } else {
            deleteError(message);
          }

          let validation;
          allForm.forEach((item) => {
            if (item.classList.contains('error')) {
              validation = false;
            } else {
              validation = true;
            }
          });

          if (validation) {
            allForm.forEach((item) => console.log(item.value));
          }
        });
      }
    });
  }

  sortPhotographers(data, user) {
    // eslint-disable-next-line prefer-const
    let arr = [];
    allOption.forEach((item) => {
      arr.push(item.textContent);
    });

    allOption.forEach((item) => {
      // Event listener sur tous les filtres
      item.addEventListener('click', (e) => {
        console.log(e.target);
        e.preventDefault();
        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        // Récupération du textContent du filtre
        const target = capitalizeFirstLetter(e.target.textContent);

        allOption.forEach((element) => {
          if (target === element.textContent) {
            // eslint-disable-next-line no-param-reassign
            element.style.display = 'none';
            optionSelected.innerHTML = `${target} &nbsp;<i class="fas fa-angle-down">`;

            if (element.textContent === 'Popularité') {
              const popularity = function (a, b) {
                // eslint-disable-next-line radix
                return parseInt(b.likes) - parseInt(a.likes);
              };
              this.updatePortofolio(data.sort(popularity), user);
            }

            if (element.textContent === 'Date') {
              const date = function (a, b) {
                return new Date(b.date).valueOf() - new Date(a.date).valueOf();
              };
              // // Test de date
              // data.forEach((el) => {
              //   console.log(el.title, el.date);
              // });
              // console.log('--------------------------');
              // const coke = data.sort(date);
              // coke.forEach((ok) => {
              //   console.log(ok.title, ok.date);
              // });

              this.updatePortofolio(data.sort(date), user);
            }

            if (element.textContent === 'Titre') {
              const titre = function (a, b) {
                if (a.title > b.title) {
                  return 1;
                  // eslint-disable-next-line no-else-return
                } else if (b.title > a.title) {
                  return -1;
                } else {
                  return 0;
                }
              };
              this.updatePortofolio(data.sort(titre), user);
            }
          } else {
            // eslint-disable-next-line no-param-reassign
            element.style.display = 'block';
          }
        });
      });
    });
  }

  slider(data, user) {
    const allWork = document.querySelectorAll('.card');

    allWork.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        let name = user.name.split(' ')[0];
        if (name.includes('-')) {
          name = name.replace('-', ' ');
        }
        const [source] = e.target.src.split('/').slice(-1);

        data.find((obj) => {
          if (obj.image === source || obj.video === source) {
            // Check si vidéo ou image
            const checkVideo = function (dataObj, username) {
              // console.log(dataObj.image, dataObj.video);
              if (dataObj.video !== undefined) {
                videoPlayer.style.display = 'flex';
                videoPlayer.src = `../img/Sample Photos /${username}/${dataObj.video}`;
                sliderContainer.querySelector('p').textContent = dataObj.title;
              } else {
                videoPlayer.style.display = 'none';
              }

              if (dataObj.image !== undefined) {
                sliderContainer.querySelector('img').style.display = 'flex';
                sliderContainer.querySelector(
                  'img'
                ).src = `../img/Sample Photos /${username}/${dataObj.image}`;
                sliderContainer.querySelector('p').textContent = dataObj.title;
              } else {
                sliderContainer.querySelector('img').style.display = 'none';
              }
            };
            // Ouverture de la modal
            sliderContainer.style.display = 'flex';
            checkVideo(obj, name);

            document
              .querySelector('.fa-croix')
              .addEventListener('click', () => {
                sliderContainer.style.display = 'none';
              });

            let index = data.indexOf(obj);

            const rightClick = function () {
              // eslint-disable-next-line no-plusplus
              index++;
              if (index >= data.length) {
                index = 0;
              }
              checkVideo(data[index], name);
            };

            const leftClick = function () {
              if (index <= 0) {
                index = data.length;
              }
              // eslint-disable-next-line no-plusplus
              index--;
              checkVideo(data[index], name);
            };

            rightArrow.addEventListener('click', rightClick);
            leftArrow.addEventListener('click', leftClick);
          }
        });
      });
    });
  }
}

const user = new User();
