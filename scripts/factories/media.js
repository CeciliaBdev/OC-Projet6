import { mediaTemplate} from "../templates/media.js";

export function mediaFactory(data){
    

    function getMediaCardDom(){
        const article = document.createElement("article");
        
        
        // <video src="assets/images/${video}" width=300 height=200></video>
        article.innerHTML = mediaTemplate(data);
        

        return article;
    }


    return {data, getMediaCardDom};

}