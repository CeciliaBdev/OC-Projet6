

const formData = document.querySelectorAll(".formData")

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.style.backgroundColor="rgba(255,255,255,0.7)";;
    //emplacement du nom du photographe
    const name = document.getElementById("name_photographe")
    //console.log(name.textContent)
    
}


 function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}



//modal

contact_modal.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //input formulaire

    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("textarea");
    let error = 0;

    //test validité
    if(!firstnameValidate(prenom)){
        error++
    }
    if(!lastnameValidate(nom)){
        error++
    }
    if(!emailValidate(nom)){
        error++
    }
    if(!messageValidate(nom)){
        error++
    }

    if(error!=0){
        console.log("erreur")
    }else{
        formData.forEach(function (userItem) {
            userItem.remove()
          });
          //affichage console
    console.log("Prenom: "+prenom.value)
    console.log("Nom: "+nom.value)
    console.log("Email: "+email.value)
    console.log("Message: "+message.value)

    //le formulaire se vide
    location.reload();
    closeModal();
    }
    


    
});

//check valeur prenom
function firstnameValidate(field){
    const regex=/^[A-zÀ-ú-]{2,}$/

    if(regex.test(field.value)===false){
        formData[0].setAttribute('data-error', 'Champ incorrect');
        formData[0].setAttribute('data-error-visible', 'true');
        return false
    }else{
        formData[0].removeAttribute('data-error');
        formData[0].removeAttribute('data-error-visible');
        return true
    }
}
//check valeur nom
function lastnameValidate(field){
    const regex=/^[A-zÀ-ú-]{2,}$/

    if(regex.test(field.value)===false){
        formData[1].setAttribute('data-error', 'Champ incorrect');
        formData[1].setAttribute('data-error-visible', 'true');
        return false
    }else{
        formData[1].removeAttribute('data-error');
        formData[1].removeAttribute('data-error-visible');
        return true
    }
}
//check email
function emailValidate (field){
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
    if (regex.test(field.value)===false){
      formData[2].setAttribute('data-error', 'Champ "Email" incorrect');
      formData[2].setAttribute('data-error-visible', 'true');
      return false
    }else{
      formData[2].removeAttribute('data-error');
      formData[2].removeAttribute('data-error-visible');
      return true;
    }
  }

  //check textarea 
  function messageValidate(field){
    const regex=/^[A-zÀ-ú-]{2,}$/

    if(regex.test(field.value)===false){
        formData[3].setAttribute('data-error', 'Message incorrect');
        formData[3].setAttribute('data-error-visible', 'true');
        return false
    }else{
        formData[3].removeAttribute('data-error');
        formData[3].removeAttribute('data-error-visible');
        return true
    }
  }