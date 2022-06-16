import { mediaFactory } from "../factories/media.js";

import { profileFactory } from "../factories/profile.js";

import { priceFactory } from "../factories/price.js";
import { lightBoxFactory } from "../factories/lightbox.js";

//fct recupère les données du json
async function getPhotographers() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json(); // extrait les données du json
    
    //console.log(JSON.stringify(data)); //affichage console
    //console.log(data.photographers)
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

//func likes
function likes(data, photographer){

        //init somme
        let allLikes = 0;

        

        data.map((data) => {
            allLikes += data.likes;
        });
        //console.log(allLikes);
        const likes = document.querySelector(".likes");
        const price = document.querySelector(".price")
        likes.innerHTML =`<div class="details">
                            <p>${allLikes}  <i class="fas fa-heart"></i></p>
                    
                            </div>`;
        
        //Incrémentation total likes
        let coeurs = document.querySelectorAll("i"); //ensemble des coeurs (icones)
        coeurs.forEach((element) => { //pour chaque coeur
            element.addEventListener('click', () => {
                console.log("test")
                allLikes++;
                likes.textContent=allLikes;
            });
        
         
        });

        //renvoi le profil photograph (de la factory)
        //faire une nouvelle factory avec juste le price
        const photographerModel = priceFactory(photographer); //creation de la const qui met en place la f. de create pour un photographe
        const userCardDOM = photographerModel.getUserPriceDOM(); //creation de la const qui regroupe la 1ère et la 2ème fonction de create pour un photographe
        price.appendChild(userCardDOM);
      
        
    }   
    


    //select
    function update(){
        let select= document.getElementById('triSelect');
        let option = select.options[select.selectedIndex];

        select.value=option.text; //prend la valeur du text
        select.value = option.value; //prend la valeur selectionné ( à l'origine)
    }   
    update();     

//lightbox
function lightBox(data){
    const divLightBox = document.querySelector(".gallerie");
    const  lightbox = document.querySelector(".lightbox");
    const closeLightbox = document.querySelector(".lightbox_close");
    //tableau de mes images (tous mes articles)
    const links = Array.from(divLightBox.querySelectorAll("article img"))
    //console.log(links)

    const lightboxModel = lightBoxFactory(data); //factory
    const getLightBoxDom = lightboxModel.getLightBox();//template
   
   
                 //id = e.currentTarget.dataset.id
                 
           

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            //ouverture lightbox
            lightbox.style.display = "block";
            
            
            
            //j'ajoute mon image dans la lightbox
            //fonctionne avec la derniere image mais pas celle selectionnée
            
        
            lightbox.appendChild(getLightBoxDom)
            //(e.currentTarget.dataset.id);
        })   
    })

    //fermeture lightbox
    closeLightbox.addEventListener('click', () => {
            lightbox.style.display="none";
    })

    //evenements clavier
    //ne fonctionne pas car derriere lightbox accessible
    document.addEventListener('keydown', (KeyBoardEvent) => {
        //si appuie sur escape
        if(KeyBoardEvent.key === "27"){
            lightbox.style.display="none";
        }
    })

    
}
    




//fct initialisation
async function Init(){
    const params = new URL(document.location).searchParams;
    const photographerId = parseInt(params.get("id"));
    const {selectedPhotgrapher, photographerMedias} = await getSelectedPhotographer(photographerId);
    displayPhotographer(selectedPhotgrapher);
    displayMedia(photographerMedias);
    likes(photographerMedias,selectedPhotgrapher);
    lightBox(photographerMedias);
   
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




