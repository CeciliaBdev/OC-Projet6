export function mediaTemplate(data){
    const { image, title, likes, video,id} = data;

    if (data = image){
        return ` <img src="assets/images/${image}" data-id="${id}> 
            <div class="infos">
                <p>${title}</p>
                <p>${likes}  <i class="fas fa-heart"></i></p>
            </div>
            `;
    }
    if (data = video)
    {
        return ` <video controls  ><source src="assets/images/${video}"></video>
            <div class="infos">
                <p>${title}</p>
                <p>${likes}  <i class="fas fa-heart"></i></p>
            </div>
            `;
    }
    
}



