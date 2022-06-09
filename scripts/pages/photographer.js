//fct recupère les données du json
async function getPhotographers() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json(); // extrait les données du json
    console.log(JSON.stringify(data)); //affichage console
    //données photographers et médias
    return {photographers: data.photographers,
            medias: data.media};
}


//fct selectionne le photographe
async function getSelectedPhotographer(id){
    //données du json de la fct au dessus
    const { photographers, medias} = await getPhotographers();
    //selectionne le bon photographe avec l'id
    const selectedPhotgrapher = photographers.find((photographer) => photographer.id === id);
    //selectionne les medias du photographe suivant le bon id
    const photographerMedias = medias.filter(media => media.photographerId === id);

    return {selectedPhotgrapher, photographerMedias};

}

//fct affichage dans le header - profil du photographe
function displayPhotographer(photographer){
    const photographerModel = photographerFactory(photographer);
    //selection des elements html
    const photographerHeader = document.querySelector(".photograph-header");
    const article = document.createElement("article");
    const contactButton = document.querySelector(".contact_button");
    const portrait = document.createElement("img");

    //creation des elements
    article.innerHTML=`<h1>${photographerModel.name}</h1>`;
    photographerHeader.appendChild(article);
    //insertion avant le bouton contact
    photographerHeader.insertBefore(article,contactButton);
    //insertion  image profil
    portrait.setAttribute("src", `assets/photographers/${photographerModel.portrait}`);
    photographerHeader.appendChild(portrait);

}

//fct affichage des medias dans la gallerie
function displayMedia(medias){
    const gallerie = document.querySelector(".gallerie");
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDom = mediaModel.getMediaCardDom();
        gallerie.appendChild(mediaCardDom);
    });
}

//fct initialisation
async function selectedInit(){
    const params = new URL(document.location).searchParams;
    const photographerId = parseInt(params.get("id"));
    const {selectedPhotgrapher, photographerMedias} = await getSelectedPhotographer(photographerId);
    displayPhotographer(selectedPhotgrapher);
    displayMedia(photographerMedias)
}
selectedInit();