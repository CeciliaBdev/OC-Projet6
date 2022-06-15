export function lightBoxTemplate(data){
    const { image, video} = data;

    if (data = image){
        return ` <div class="lightbox_container">
                 <img src="assets/images/${image}"> 
                </div>
                `;
    }
    if (data = video)
    {
        return  ` <div class="lightbox_container">
                  <video controls><source src="assets/images/${video}"></video>
                  </div>
                 `;
    }   
}