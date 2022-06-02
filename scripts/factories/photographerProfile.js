function photographerProfileFactory(data){
    const { name} = data;

    //creation des éléments - pour l'instant juste le name
    function getUserProfileCardDOM(){
        const article = document.createElement('article');
        const h1 = document.createElement('h1');
        h1.textContent = name;
        //creation
        article.appendChild(h1);

        return(article);
    }

    return {name, getUserProfileCardDOM}

}