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
    //mon tableau d'objet
    //console.log(medias)
    
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
        let coeurs = document.querySelectorAll(".infos i"); //ensemble des coeurs (icones)
        coeurs.forEach((element) => { //pour chaque coeur
            element.addEventListener('click', () => {
                console.log("test")
                allLikes++;
                likes.innerHTML=`<div class="details">
                <p>${allLikes}  <i class="fas fa-heart"></i></p>
             </div>`;
             
            });
        });
        

        //renvoi le profil photograph (de la factory)
        //faire une nouvelle factory avec juste le price
        const photographerModel = priceFactory(photographer); //creation de la const qui met en place la f. de create pour un photographe
        const userCardDOM = photographerModel.getUserPriceDOM(); //creation de la const qui regroupe la 1ère et la 2ème fonction de create pour un photographe
        price.appendChild(userCardDOM);
      
        
    }   



    //lightbox
    //fonctionne ouverture lightbox
// //lightbox
function lightBox(data){
    const divLightBox = document.querySelector(".gallerie");
    const lightbox = document.querySelector(".lightbox");
    const lightboxContain = document.querySelector(".lightbox_container");
    
    //tableau de mes images (tous mes articles)
    const links = Array.from(divLightBox.querySelectorAll(("article")))
    //console.log(links)


   //console.log(data)

//    for (let dataset in data){
//     const alldataset = data[dataset] //tous les datatset
//     console.log(alldataset)   //tous mes id    
//    }
//    console.log("1er Id:  "+data[0].id) //1er Id

    
     
    links.forEach(link => {
        link.addEventListener('click', () => {
            //ouverture lightbox
            lightbox.style.display = "block";
            const lightboxModel = lightBoxFactory(data,link); //factory
            const getLightBoxDom = lightboxModel.getLightBox();//template
        
            //j'ajoute mon image dans la lightbox

            lightboxContain.innerHTML="";
            lightboxContain.appendChild(getLightBoxDom)

            console.log(link) //mon element clické
            
        
        })   
    })

   
}
//------------------------//


    //image precedente
    const prev = document.querySelector(".lightbox_prev")
    prev.addEventListener('click', () => {
        
        });
    
        //suivante
    const next = document.querySelector(".lightbox_next")
    next.addEventListener('click', () => {
        
        });

        
    //fermeture lightbox
    function closeBox(){
        const lightbox = document.querySelector(".lightbox");
        lightbox.style.display="none";
        
    }
    //fermeture au click souris
    const closeLightbox = document.querySelector(".lightbox_close");
    closeLightbox.addEventListener('click', () => {
            closeBox();
            
    })
    //evenements clavier

    document.addEventListener('keyup', (event) => {
        //console.log(event)
        //si appuie sur escape
        if(event.key == 'Escape'){
            closeBox();
        }
        //appui fleche droite
        if(event.key == 'ArrowRight'){
            console.log("fleche droite")
        }
        //appui fleche gauche
        if(event.key == 'ArrowLeft'){
            console.log("fleche gauche")
        }
    })





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


    //tri par nb de likes
            // if(menuSelect.value === "popularité"){
            //     console.log("Popularité")
            // }
                //un element                
                // for (let like in medias ){
                //     console.log( medias[like].likes)
                //     resultat.push(medias[like].likes)
                    
                // }
                // console.log(resultat)


                // for ( let element in medias){
                //     //console.log(medias[element])
                //     medias.sort(function compare(a, b) {
                //             if (a.likes < b.likes)
                //                return -1;
                //             if (a.likes > b.likes )
                //                return 1;
                //             return 0;
                //           });
                    
                // }



