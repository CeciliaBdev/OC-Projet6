import { mediaFactory } from "../factories/media.js";
import { profileFactory } from "../factories/profile.js";

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
    
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerModel = profileFactory(photographer);
        const ProfileDOM = photographerModel.getProfileDOM();
        photographerHeader.appendChild(ProfileDOM);
    
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
async function Init(){
    const params = new URL(document.location).searchParams;
    const photographerId = parseInt(params.get("id"));
    const {selectedPhotgrapher, photographerMedias} = await getSelectedPhotographer(photographerId);
    displayPhotographer(selectedPhotgrapher);
    displayMedia(photographerMedias)
}
Init();


// const tri = document.querySelector(".triSelect");
    //  tri.innerHTML = `<div class="tri">Trier par</div>
                        
    //                     <select>
    //                         <option value="0">Popularité</option>
    //                         <option value="1">Titre</option>
    //                         <option value="2">Date</option>
    //                     </select>
  
    //   