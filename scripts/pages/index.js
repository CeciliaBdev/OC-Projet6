    async function getPhotographers() {
        const response = await fetch("../data/photographers.json");
        const photographers = await response.json(); // extrait les données du json
        console.log(JSON.stringify(photographers)); //affichage console
        return photographers;
    }


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            //appel de la factory
            const photographerModel = photographerFactory(photographer);
            //appel creation des elements
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
    