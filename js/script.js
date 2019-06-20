(function() {
  'use strict';

  let data = {};

  const imgDiv = document.getElementById('img-div');
  const sections = document.getElementsByClassName('section');
  const tributeIntro = document.getElementById('tribute-intro');
  const ulResources = document.getElementById('ul-resources');
  const ulAccolades = document.getElementById('ul-accolades');
  const youtubeEmbedDiv = document.getElementById('youtube-clip-div');

  const section = {
    populate: {
      photograph() {
        imgDiv.innerHTML += `
          <img alt="Photograph of Carl Sagan smiling in front of a classroom of kids" 
           id="image" 
           src="${data.figure.image.src}"/>`;
      },

      caption() {
        imgDiv.innerHTML += `
          <figcaption id="img-caption">
            Source: 
            <a href="${data.figure.image.caption.src}" 
               id="tribute-link"
               target="_blank">
              ${data.figure.image.caption.text}
            </a>
          </figcaption>`;
      },

      intro() {
        for (let i = 0; i < data.tributeIntro.length; i++) {
          tributeIntro.innerHTML += `<p>${data.tributeIntro[i]}</p>`;
        }
      },

      accolades() {
        for (let i = 0; i < data.accolades.length; i++) {
          ulAccolades.innerHTML += `
            <li>
              <time datetime="${data.accolades[i].period.substr(0, 4)}">
                <strong>${data.accolades[i].period}</strong> - 
                ${data.accolades[i].accolade}
              </time>
            </li>
          `;
        }
      },

      youtubeClip() {
        youtubeEmbedDiv.innerHTML += `
          <iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  frameborder="0" 
                  height="315"
                  id="${data.youtubeClip.id}" 
                  src="${data.youtubeClip.src}" 
                  width="100%">
          </iframe>`;
      },

      resources() {
        for (let i = 0; i < data.resources.length; i++) {
          ulResources.innerHTML += `
            <li>
              <a href="${data.resources[i].href}" target="_blank">
                ${data.resources[i].linkText}
              </a> 
              - ${data.resources[i].linkDescription}
            </li>`;
        }
      }
    }
  };

  const init = uri => {
    axios
      .get(uri)
      .then(function(response) {
        data = response.data;
        section.populate.photograph();
        section.populate.caption();
        section.populate.intro();
        section.populate.accolades();
        section.populate.youtubeClip();
        section.populate.resources();
        for (let i = 0; i < sections.length; i++) {
          sections[i].style.display = 'block';
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  (function hideOnScroll(arr) {
    window.addEventListener('scroll', determineHide);
    function determineHide() {
      for (let i = 0; i < arr.length; i++) {
        document.getElementById(arr[i][0]).style.opacity =
          window.scrollY >= arr[i][1] ? 0 : 1;
      }
    }
  })([['img-caption', 200]]);

  init('https://api.myjson.com/bins/nxn62');
})();
