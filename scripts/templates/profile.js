export function profileTemplate(data) {
  const { name, portrait, city, country, tagline } = data;

  return `  <div class="photographe">
            <div class="infos_profil" tabindex="0">
            <h1>${name}</h1>
            </div>
            <div class="infos_profil_details" tabindex="0">
            <h2>${city}, ${country}</h2>
            <p class="tagline">${tagline}</p>
            </div>
            </div>
        
            <button class="contact_button" onclick="displayModal()" tabindex="0"  aria-label="Formulaire de contact, Contactez moi">Contactez-moi</button>
            <img src="assets/photographers/${portrait}" alt="portrait du photographe ${name}" tabindex="0">
            `;
}

//pour separer
//mm nom que la factory
