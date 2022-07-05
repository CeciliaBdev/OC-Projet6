export function mediaTemplate(data){
    const { image, title, likes, video} = data;

    if (data = image){
        return ` 
            
                <img src="assets/images/${image}"  alt="photographie ${title}"> 
            
            <div class="infos">
                <p>${title}</p>
                <p class="mediaLike">${likes}<i class="fas fa-heart"></i></p>
            </div>
            `;
    }
    if (data = video)
    {
        return ` <video controls><source src="assets/images/${video}"></video>
                <div class="infos">
                    <p>${title}</p>
                    <p class="mediaLike">${likes}<i class="fas fa-heart"></i></p>
                </div>
            `;
    }
    
}



