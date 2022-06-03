//1- données json
async function getPhotographers() {
    const response = await fetch("../data/photographers.json");
    const photographers = await response.json(); // extrait les données du json
    console.log(JSON.stringify(photographers)); //affichage console
    return photographers;
}

//2- appel factory pour le profilphotograph

async function displayDataProfile(photographers){
    const photographersHeader = document.querySelector(".photograph-header");

    
    //Paramètres url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idUrl = urlParams.get("id");
    //on a récupéré l'id (avec l'url concerné)
    //find= renvoie le premier element trouvé
    //http://127.0.0.1:5500/photographer.html?id=243
    const profile = photographers.find((element) => element.id == idUrl);

    //appel factory sur l'adresse/id concerné
    const photographerProfileModel = photographerProfileFactory(profile);
        
    //appel creation element
    const userProfileCardDOM = photographerProfileModel.getUserProfileCardDOM();
    photographersHeader.appendChild(userProfileCardDOM);
}



//fct init

async function init(){
    //données photographes
    const { photographers } = await getPhotographers();
    displayDataProfile(photographers);
}
init();
