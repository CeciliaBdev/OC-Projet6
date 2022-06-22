export function lightBoxTemplate(data, elementClicked){
    
        //console.log(data)
        console.log(elementClicked)
        const idClicked = elementClicked.dataset.id;
        const { image,video,title } = data.find((item) => item.id == idClicked ) 
            //lorsque l'image correspond au bon id
        
            if (image ){
                return `<img src="assets/images/${image}" width="400">
                        <p>${title}</p>`;
            }
             
            else if (video){
                return  `<video controls width="400"><source src="assets/images/${video}"></video>
                <p>${title}</p>`;
            }
    
       
        
    }
    
