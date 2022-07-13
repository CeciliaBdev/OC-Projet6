/* eslint-disable no-unused-vars */
import { mediaFactory } from '../factories/media.js'

import { profileFactory } from '../factories/profile.js'

import { priceFactory } from '../factories/price.js'

import { lightBoxFactory } from '../factories/lightbox.js'

// fonction qui recupère les données du json
async function getPhotographers() {
  const response = await fetch('./data/photographers.json')
  const data = await response.json() // extrait les données du json

  // console.log(JSON.stringify(data)); //affichage console
  // console.log(data.photographers)
  // données photographers et médias
  return { photographers: data.photographers, medias: data.media }
}

// fonction qui selectionne le photographe
async function getSelectedPhotographer(id) {
  // données du json de la fct au dessus
  const { photographers, medias } = await getPhotographers()
  // selectionne le bon photographe avec l'id
  const selectedPhotgrapher = photographers.find(
    (photographer) => photographer.id === id
  )
  // selectionne les medias du photographe suivant le bon id
  const photographerMedias = medias.filter(
    (media) => media.photographerId === id
  )

  return { selectedPhotgrapher, photographerMedias }
}

// fonction affichage dans le header - profil du photographe
function displayPhotographer(photographer) {
  const photographerHeader = document.querySelector('.photograph-header')
  const photographerModel = profileFactory(photographer)
  const ProfileDOM = photographerModel.getProfileDOM()
  photographerHeader.appendChild(ProfileDOM)
  const buttonOpenForm = document.getElementById('openForm')
  buttonOpenForm.addEventListener('click', () => {
    displayModal()
  })

  function displayModal() {
    const modal = document.getElementById('contact_modal')
    modal.style.display = 'block'
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', true)
    modal.style.backgroundColor = 'rgba(255,255,255,0.7)'
    // emplacement du nom du photographe
    const name = document.getElementById('name_photographe')
    name.textContent = document.querySelector('h1').textContent

    // focus
    // tous les elements focusables
    const focusableEls = modal.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]),img:not([disabled])'
    )
    const firstFocusableEl = focusableEls[0] // 1er element focus la croix
    firstFocusableEl.focus()
  }
  // onclick="displayModal()"
}

// fonction affichage des medias dans la gallerie
function displayMedia(medias) {
  const gallerie = document.querySelector('.gallerie')
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media)
    const mediaCardDom = mediaModel.getMediaCardDom()
    gallerie.appendChild(mediaCardDom)
  })
  // mon tableau d'objet
  // console.log(medias)
}

// function tri des medias

// menu deroulant de la liste
const repere = document.querySelector('.repere')
const chevron = document.querySelector('.repere i')
const liDate = document.querySelector('.dropdown1')
const liTitre = document.querySelector('.dropdown2')

function activeClass() {
  repere.classList.toggle('active') // rotation du chevron avec ajout active (css)
  liDate.classList.toggle('active')
  liTitre.classList.toggle('active')
}

// par nb de likes - popularité
function sortPopular(medias) {
  medias.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  })
}

// par date ( date la plus récente)
function sortDate(medias) {
  medias.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }
    if (a.date > b.date) {
      return -1
    }
    return 0
  })
}
// par ordre alphabétique par titre
function sortTitle(medias) {
  medias.sort((a, b) => {
    if (a.title > b.title) {
      return 1
    }
    if (a.title < b.title) {
      return -1
    }
    return 0
  })
}

// tri selon le choix du select
function sortMedia(medias) {
  const valuePopularite = document.querySelector('.repere')
  const valueDate = document.getElementById('date')
  const valueTitre = document.getElementById('titre')

  valuePopularite.addEventListener('click', () => valuePopselect())
  function valuePopselect() {
    activeClass()
    sortPopular(medias)
    valuePopularite.textContent = 'Popularité'
    valueDate.textContent = 'Date'
    valueTitre.textContent = 'Titre'
    valuePopularite.appendChild(chevron)
    const gallery = document.querySelector('.gallerie')
    gallery.innerHTML = ''
    displayMedia(medias) // j'affiche ma nouvelle gallerie triée
    lightBox(medias) // lightbox avec le nouvel ordre de gallerie
    likes(medias) // je peux liker dans la nouvelle galerie triée
  }
  valuePopularite.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      // console.log("select par touche Entrée");
      valuePopselect()
    }
  })

  valueDate.addEventListener('click', () => valueDateSelect())
  function valueDateSelect() {
    // console.log(valueDate.textContent);
    valuePopularite.textContent = 'Date'
    valueDate.textContent = 'Popularité'
    activeClass()
    sortDate(medias)
    const gallery = document.querySelector('.gallerie')
    gallery.innerHTML = ''
    displayMedia(medias) // j'affiche ma nouvelle gallerie triée
    lightBox(medias) // lightbox avec le nouvel ordre de gallerie
    likes(medias)
  }
  valueDate.addEventListener('keyup', (event) => {
    // console.log(event)
    // si appuie sur escape
    if (event.key === 'Enter') {
      valueDateSelect()
    }
  })

  valueTitre.addEventListener('click', () => valueTitreSelect())
  function valueTitreSelect() {
    valuePopularite.textContent = 'Titre'
    valueTitre.textContent = 'Popularité'
    // console.log(valueTitre.textContent || valueTitre.innerText);
    activeClass()
    sortTitle(medias)
    const gallery = document.querySelector('.gallerie')
    gallery.innerHTML = ''
    displayMedia(medias) // j'affiche ma nouvelle gallerie triée
    lightBox(medias) // lightbox avec le nouvel ordre de gallerie
    likes(medias)
  }
  valueTitre.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      valueTitreSelect()
    }
  })
}

// func likes
function likes(data) {
  // init somme
  let allLikes = 0

  data.map((data) => {
    allLikes += data.likes
    return allLikes
  })
  // console.log(allLikes);
  const likes = document.querySelector('.likes')

  likes.innerHTML = `<div class="details">
                            <p>${allLikes}  <i class="fas fa-heart"></i></p>
                         </div>`

  // Incrémentation total likes
  const coeurs = document.querySelectorAll('.infos i') // ensemble des coeurs (icones)

  // cibler le media img/video dans le links
  coeurs.forEach((element) => {
    // pour chaque coeur au click ou sur "Enter" au clavier
    element.addEventListener('click', addLikes)
    element.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        addLikes()
      }
    })

    function addLikes() {
      // si contient la class liked - j'enlève -1coeur
      if (element.classList.contains('liked')) {
        allLikes--
        likes.innerHTML = `<div class="details"tabindex="0">
                                <p aria-label="${allLikes} coeur" >${allLikes}  <i class="fas fa-heart"></i></p>
                                </div>`
        // console.log(element.previousSibling);
        // texte element précedent diminue
        element.previousSibling.textContent--
        // j'enlève la classe coeur
        element.classList.remove('liked')
      } else {
        // si pas de classe liked (1er click) j'ajoute la classe et j'incrémente 1coeur
        element.classList.add('liked')
        allLikes++
        likes.innerHTML = `<div class="details" tabindex="0">
                                <p aria-label="${allLikes} coeur" tabindex="0" >${allLikes}  <i class="fas fa-heart"></i></p>
                                </div>`
        // console.log(element.previousSibling);
        // texte element précedent s'incrémete
        element.previousSibling.textContent++
      }
    }
  })
}

// prix du photographe - banniere infos en bas
function price(photographer) {
  const price = document.querySelector('.price')
  // renvoi le profil photograph (de la factory)
  // faire une nouvelle factory avec juste le price
  const photographerModel = priceFactory(photographer) // creation de la const qui met en place la f. de create pour un photographe
  const userCardDOM = photographerModel.getUserPriceDOM() // creation de la const qui regroupe la 1ère et la 2ème fonction de create pour un photographe
  price.appendChild(userCardDOM)
}

/// La lightbox
function lightBox(data) {
  const divLightBox = document.querySelector('.gallerie')
  const lightbox = document.querySelector('.lightbox')
  const lightboxContain = document.querySelector('.lightbox_container')

  // tableau de ma gallerie (toutes les videos et images)
  const links = Array.from(
    divLightBox.querySelectorAll('article img, article video')
  )
  // console.log(links);
  // cibler le media img/video dans le links
  // console.log(data)

  // au click d'une image ou video
  links.forEach((link) => {
    const openMedia = () => {
      // console.log(link.childNodes[1])
      // console.log(link);
      // ouverture lightbox
      lightbox.style.display = 'block'
      const lightboxModel = lightBoxFactory(data, link.parentElement) // factory
      const getLightBoxDom = lightboxModel.getLightBox() // template

      // j'ajoute mon image dans la lightbox
      lightboxContain.innerHTML = ''
      lightboxContain.appendChild(getLightBoxDom)

      const currentMedia = parseInt(link.parentElement.dataset.id)

      // index de l'image en cours
      let index = 0
      index = data.findIndex((element) => element.id === currentMedia)
      console.log(typeof currentMedia)
      console.log('index', index) // index =0 pour image en cours
      console.log('media en cours', currentMedia) // mon element clické

      // mes boutons precédent et suivant
      const prev = lightbox.querySelector('.lightbox_prev')
      const next = lightbox.querySelector('.lightbox_next')

      // pour avoir l'image precedente
      const prevMedia = () => {
        if (index === 0) {
          // revient au dernier element du tableau
          index = data.length - 1
        } else {
          index = index - 1
        }
        prev.dataset.id = data[index].id

        const lightboxModel = lightBoxFactory(data, prev) // factory gallerie / element clické
        const getLightBoxDom = lightboxModel.getLightBox() // template
        // j'ajoute mon image dans la lightbox
        lightboxContain.innerHTML = ''
        lightboxContain.appendChild(getLightBoxDom)
        // console.log("index", index);
      }

      // pour avoir l'image suivante
      const nextMedia = () => {
        if (index === data.length - 1) {
          index = 0
        } else {
          index = index + 1
        }
        next.dataset.id = data[index].id

        // console.log("id suivante", next);
        // console.log(data[index + 1]);
        const lightboxModel = lightBoxFactory(data, next) // factory galerie / image suivante
        const getLightBoxDom = lightboxModel.getLightBox() // template
        // j'ajoute mon image dans la lightbox
        lightboxContain.innerHTML = ''
        lightboxContain.appendChild(getLightBoxDom)

        // console.log("index : ", index);
      }

      prev.addEventListener('click', prevMedia)
      next.addEventListener('click', nextMedia)

      document.addEventListener('keyup', (event) => {
        // console.log(event.key);
        if (event.key === 'ArrowLeft') {
          prevMedia()
        }
        if (event.key === 'ArrowRight') {
          nextMedia()
        }
      })
    }

    link.addEventListener('click', openMedia)
    link.addEventListener('keyup', (event) => {
      // console.log(event.key)
      if (event.key === 'Enter') {
        openMedia()
      }
    })

    // End foreach
  })

  // focus
  const focusableEls = lightbox.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]),img:not([disabled])'
  )
  // console.log(focusableEls);
  const firstFocusableEl = focusableEls[0] // 1er element focus la croix
  firstFocusableEl.focus()
}

// ---- Fermeture Lightbox
// fonction
function closeBox() {
  const lightbox = document.querySelector('.lightbox')
  lightbox.style.display = 'none'
}
// fermeture au click souris
const closeLightbox = document.querySelector('.lightbox_close')
closeLightbox.addEventListener('click', () => {
  closeBox()
})
// evenements clavier
document.addEventListener('keyup', (event) => {
  // console.log(event)
  // si appuie sur escape
  if (event.key === 'Escape') {
    closeBox()
  }
})

// fct initialisation
async function Init() {
  const params = new URL(document.location).searchParams
  const photographerId = parseInt(params.get('id'))
  const { selectedPhotgrapher, photographerMedias } =
    await getSelectedPhotographer(photographerId)
  displayPhotographer(selectedPhotgrapher)
  displayMedia(photographerMedias)
  likes(photographerMedias)
  price(selectedPhotgrapher)
  lightBox(photographerMedias)
  sortMedia(photographerMedias)
}
Init()
