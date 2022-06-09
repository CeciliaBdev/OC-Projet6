function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price,id} = data;

    
    //creation des éléments (image-ville-pays...)
    function getUserCardDOM() {
        const article = document.createElement('article');

        article.innerHTML = `<a href="photographer.html?id=${id}">
        <img src="assets/photographers/${portrait}">
        <h2>${name}</h2>
        </a>
        <h3>${city}, ${country}</h3>
        <p>${tagline}</p>
        <p class="price">${price}€/jour</p>
        `;
        return article;
    }
   
    return {  name, portrait, city, country, tagline, price,id, getUserCardDOM}
}

function mediaFactory(data){
    const { id, photographerId, title, image, video, likes, date, price} = data;

    function getMediaCardDom(){
        const article = document.createElement("article");

        article.innerHTML = ` <img src="assets/images/${image}">
                            <div class="infos">
                            <p>${title}</p>
                            <p>${likes}  <i class="fas fa-heart"></i></p>
                            
                            </div>
                            
                            `;

        
        
        return article;
    }

    return {id, photographerId, title, image, video, likes, date, price, getMediaCardDom};

}







// //lien vers photgraphe.html
        // article.addEventListener("click", () => {
        //     window.location.href = `photographer.html?id=${id}`;
        // })

