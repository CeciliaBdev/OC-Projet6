import { lightBoxTemplate} from "../templates/lightbox.js";

export function lightBoxFactory(data,elementClicked){

    function getLightBox(){
        const div = document.createElement("div");
        div.classList.add("lightbox_container");
        div.innerHTML = lightBoxTemplate(data, elementClicked);
        
        return div;
    }

    return {data,getLightBox};

}