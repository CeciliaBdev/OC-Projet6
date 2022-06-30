import { mediaFactory } from "../factories/media.js";

import { profileFactory } from "../factories/profile.js";

import { priceFactory } from "../factories/price.js";
import { lightBoxFactory } from "../factories/lightbox.js";




//fct recupère les données du json
async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
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

//function tri des medias
//par nb de likes - popularité
function sortPopular(medias) {
    medias.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    });
  }

  //par date ( date la plus récente)
  function sortDate(medias) {
    medias.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
  }

  //par ordre alphabétique par titre
  function sortTitle(medias) {
    medias.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });
  }
  

  //tri selon le choix du select
  function sortMedia(medias){
      const selection = document.getElementById("select")
      selection.addEventListener('click', (e) => {
          if (e.target.value === "popularité"){
              //console.log("tri par popularité")
              //console.log(medias)
              sortPopular(medias)
          }
          if (e.target.value === "date"){
            //console.log("tri par date")
            //console.log(medias)
            sortDate(medias)
            }
            if (e.target.value === "titre"){
                //console.log("tri par titre")
                //console.log(medias)
                sortTitle(medias)
                }
        const gallery = document.querySelector(".gallerie");
        gallery.innerHTML = "";
        displayMedia(medias); //j'affiche ma nouvelle gallerie triée
        lightBox(medias); //lightbox avec le nouvel ordre de gallerie
        //***** Erreur: function likes ne fonctionne pas sur la nouvelle gallerie triée ***//

        likes(data);
      })
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
        
       //cibler le media img/video dans le links
        coeurs.forEach((element) => { //pour chaque coeur
            element.addEventListener('click', () => {
              
              //si contient la class liked - j'enlève -1coeur
              if (element.classList.contains("liked")){
                allLikes--;
                likes.innerHTML=`<div class="details">
                                <p>${allLikes}  <i class="fas fa-heart"></i></p>
                                </div>`;
                //console.log(element.previousSibling);
                //texte element précedent s'incrémete
                element.previousSibling.textContent--;
                //j'enlève la classe coeur
                element.classList.remove("liked");
              }
              //si pas de classe liked (1er click) j'ajoute la classe et j'incrémente 1coeur
              else{
                element.classList.add("liked");
                allLikes++;
                likes.innerHTML=`<div class="details">
                                <p>${allLikes}  <i class="fas fa-heart"></i></p>
                                </div>`;
                //console.log(element.previousSibling);
                //texte element précedent s'incrémete
                element.previousSibling.textContent++;
              }
              

             

            });
        });
       
        //renvoi le profil photograph (de la factory)
        //faire une nouvelle factory avec juste le price
        const photographerModel = priceFactory(photographer); //creation de la const qui met en place la f. de create pour un photographe
        const userCardDOM = photographerModel.getUserPriceDOM(); //creation de la const qui regroupe la 1ère et la 2ème fonction de create pour un photographe
        price.appendChild(userCardDOM);
    }   


    //fonctionne ouverture lightbox
// //lightbox
function lightBox(data){
    const divLightBox = document.querySelector(".gallerie");
    const lightbox = document.querySelector(".lightbox");
    const lightboxContain = document.querySelector(".lightbox_container");
    
    //tableau de ma gallerie (toutes les videos et images)
    const links = Array.from(divLightBox.querySelectorAll(("article img, article video")))
    
    console.log(links)
   //cibler le media img/video dans le links


   //console.log(data)

//    for (let dataset in data){
//     const alldataset = data[dataset] //tous les datatset
//     console.log(alldataset)   //tous mes id    
//    }
//    console.log("1er Id:  "+data[0].id) //1er Id

    
     
    links.forEach(link => {
        link.addEventListener('click', () => {
            // console.log(link.childNodes[1])
            console.log(link)
            //ouverture lightbox
            lightbox.style.display = "block";
            const lightboxModel = lightBoxFactory(data,link.parentElement); //factory
            const getLightBoxDom = lightboxModel.getLightBox();//template
        
            //j'ajoute mon image dans la lightbox
            lightboxContain.innerHTML="";
            lightboxContain.appendChild(getLightBoxDom)
        


            const currentMedia = link.dataset.id
            
            //index de l'image en cours
            let index = 0;
            index = data.findIndex((element) => element.id == currentMedia)
            console.log("index", index) //index =0 pour image en cours
            console.log("media en cours", currentMedia) //mon element clické
            
            

            //image precedente
            const prev = document.querySelector(".lightbox_prev")
            prev.addEventListener('click', () => {
                console.log(data[index- 1])
                const lightboxModel = lightBoxFactory(data[index-1],link); //factory
            const getLightBoxDom = lightboxModel.getLightBox();//template
        
            //j'ajoute mon image dans la lightbox
            lightboxContain.innerHTML="";
            lightboxContain.appendChild(getLightBoxDom)
        

                });

            //suivante
            const next = document.querySelector(".lightbox_next")
            next.addEventListener('click', () => {
            
                console.log(data[index+ 1])
            });
        }) 
          
    })

    
    
        
      

   
}
//------------------------//
      
    
    


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
    sortMedia(photographerMedias)
    
}
Init();

//index=links.length //taille de ma liste ( en boucle, dernier element)  
// console.log("precedent")
// console.log("index precedent",index)  

// console.log("suivant")
// index = index + 1;  //le suivant
// console.log("index suivant",index)  