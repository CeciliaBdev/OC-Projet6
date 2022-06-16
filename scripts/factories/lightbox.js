import { lightBoxTemplate} from "../templates/lightbox.js";

export function lightBoxFactory(data){

    function getLightBox(){
        const div = document.createElement("div");
        div.classList.add("lightbox_container");
        div.innerHTML = lightBoxTemplate(data);
        
        return div;
    }

    return {data,getLightBox};

}