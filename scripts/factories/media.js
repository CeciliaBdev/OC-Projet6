import { mediaTemplate} from "../templates/media.js";

export function mediaFactory(data){
    

    function getMediaCardDom(){
        const article = document.createElement("article");
        article.classList.add("photo");
        
        article.innerHTML = mediaTemplate(data);
        

        return article;
    }
   
    
     


    return {data, getMediaCardDom};

}


