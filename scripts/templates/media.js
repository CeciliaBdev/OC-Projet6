export function mediaTemplate(data){
    const { image, title, likes} = data;


    return ` <img src="assets/images/${image}"> 
            <div class="infos">
                <p>${title}</p>
                <p>${likes}  <i class="fas fa-heart"></i></p>
            </div>
            `;
}


