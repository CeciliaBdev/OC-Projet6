import  {contactTemplate}  from "../templates/contact.js";

export function contactFactory(data) {
    

    //creation des éléments (image-ville-pays...)
    function getContactDOM() {
        const p= document.createElement('p');

        p.innerHTML = contactTemplate(data);
        return p;
    }
   
    return  {data,getContactDOM};
}