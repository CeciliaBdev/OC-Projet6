function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price,id} = data;

    const picture = `assets/photographers/${portrait}`;

    //creation des éléments (image-ville-pays...)
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute('alt',name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute = ('aria-label', name);
        const h3 = document.createElement ('h3');
        h3.textContent = city +", "+country;
        const p = document.createElement('p');
        p.textContent = tagline;
        const price_element = document.createElement('span')
        price_element.textContent = price+"€/jour";
        

        //lien vers photgraphe.html
        article.addEventListener("click", () => {
            window.location.href = `photographer.html?id=${id}`;
        })


        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(price_element);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
