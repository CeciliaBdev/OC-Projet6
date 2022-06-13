import { mediaTemplate} from "../templates/media.js";

export function mediaFactory(data){
    

    function getMediaCardDom(){
        const article = document.createElement("article");
        
        article.innerHTML = mediaTemplate(data);
        

        return article;
    }
   
    
     


    return {data, getMediaCardDom};

}


