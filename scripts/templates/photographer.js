export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  return `<a href="photographer.html?id=${id}" aria-label="Galerie du photographe ${name}">
        <img src="assets/photographers/${portrait}" alt="portrait du photographe ${name}">
        <h2>${name}</h2>
        </a>
        <div class="infos_photographer" aria-label="infos du photographe ${name}" tabindex="0">
        <h3>${city}, ${country}</h3>
        <p>${tagline}</p>
        <p class="price">${price}€/jour</p>
        </div>
        `;
}

//pour separer
//mm nom que la factory
