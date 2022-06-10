export function profileTemplate(data){
    const { name, portrait} = data;
    
    return `<h1>${name}</h1>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src="assets/photographers/${portrait}">
            `;
}

//pour separer
//mm nom que la factory



