import { photographerTemplate } from '../templates/photographer.js'

export function photographerFactory(data) {
  // creation des éléments (image-ville-pays...)
  function getUserCardDOM() {
    const article = document.createElement('article')

    article.innerHTML = photographerTemplate(data)
    return article
  }

  return { data, getUserCardDOM }
}

// appel du template via l'import l1
