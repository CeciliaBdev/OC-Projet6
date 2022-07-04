export function photographerTemplate(data){
    const { name, portrait, city, country, tagline, price,id} = data;
    return `<a href="photographer.html?id=${id}" aria-label="Galerie du photographe">
        <img src="assets/photographers/${portrait}" alt="portrait du photographe ${name}">
        <h2>${name}</h2>
        </a>
        <h3>${city}, ${country}</h3>
        <p>${tagline}</p>
        <p class="price">${price}€/jour</p>
        `;     
}

//pour separer
//mm nom que la factory



