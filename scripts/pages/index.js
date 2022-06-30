import { photographerFactory } from "../factories/photographer.js";

    async function getPhotographers() {
        const response = await fetch("./data/photographers.json");
        const data = await response.json(); // extrait les données du json
        console.log(JSON.stringify(data)); //affichage console
        return {photographers: data.photographers};
    }


    async function displayData(photographers) {
        //selection de l'endroit où mettre les données
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            //appel de la factory
            const photographerModel = photographerFactory(photographer);
            //appel creation des elements à l'endroit choisi
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    