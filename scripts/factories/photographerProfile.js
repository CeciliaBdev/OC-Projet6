function photographerProfileFactory(data){
    const { name, portrait,city,country,tagline} = data;

    const picture = `assets/photographers/${portrait}`;

    //creation des éléments - pour l'instant juste le name
    function getUserProfileCardDOM(){
        //2e essai avec les templates litteraux
        const node = document.querySelector(".photograph-header");
        const div = `
                    <article>
                        <h1>
                            ${name}
                        </h1>
                        <h2>
                            ${city},${country}
                        </h2>
                        <span>
                            ${tagline}
                        </span>
                    </article>
                    `;

        //photo profil
        const img = document.createElement( 'img' );
         img.setAttribute("src", picture);

        //ajout sur la page 
        node.insertAdjacentHTML("afterbegin", div); // 1er enfant (avant le boutton)
        node.insertAdjacentElement("beforeend", img); //dernier enfant (après le bouton)

        return node;


    }

    return {name, getUserProfileCardDOM}

}

        //1er essai import des données
        // const article = document.createElement('article');       
        
        // const h2 = document.createElement('h2');
        // h2.textContent = name;
        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture);
        // img.setAttribute('alt',name);
        // const h3 = document.createElement ('h3');
        // h3.textContent = city +", "+country;
        // const p = document.createElement('p');
        // p.textContent = tagline;
        // const button = document.querySelector("button");
        // //creation
        
        // article.appendChild(h2);
        // article.appendChild(h3);
        // article.appendChild(p);
        // article.appendChild(button);
        // article.appendChild(img);
        
        // return(article);