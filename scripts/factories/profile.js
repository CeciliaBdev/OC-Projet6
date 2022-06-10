import  {profileTemplate}  from "../templates/profile.js";

export function profileFactory(data) {
    

    //creation des éléments (image-ville-pays...)
    function getProfileDOM() {
        const article = document.createElement('article');

        article.innerHTML = profileTemplate(data);
        return article;
    }
   
    return  {data,getProfileDOM};
}

//appel du template via l'import l1




