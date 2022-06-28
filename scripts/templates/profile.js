export function profileTemplate(data){
    const { name, portrait,city,country,tagline} = data;
    
    return `<div class="infos_profil">
            <h1>${name}</h1>
            <h2>${city}, ${country}</h2>
            <p class="tagline">${tagline}</p>
            </div>
        
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src="assets/photographers/${portrait}">
            `;
}

//pour separer
//mm nom que la factory



