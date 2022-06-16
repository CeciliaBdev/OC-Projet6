export function lightBoxTemplate(data){
    
    
    // if (data = image){
        //test avec une image du dossier
        //fonctionne
        // `<img src="assets/images/Travel_Tower.jpg" width="300"> `;

        //avec les images du photographes
        let i;
        let image;
        let id;
        let video;
        //console.log(data)

        for (i = 0; i < (data.length) ; i ++) {
            // if(data[i].video){
            //     console.log(data[i].video)
            //    return  video = data[i].video
            
             if(data[i].image){ //si image existe
                
                image=data[i].image;
                id =data[i].id;
                
                console.log(i,id, image);
                
            }
            if(data[i].video){ //si video existe
                
                video=data[i].video;
                id =data[i].id;
                
                console.log(i,id, video);
                
            }
        
        }
        
         return `<div data-id=${id}><img src="assets/images/${image}" width="500"></div>`;
        // })
        
    }
    
        
                
        //retourne le dernier id et image

        //au click sur la photo = a approfondir dans ls js + un console log au click
       
        
                 
            
          





        // return  `<img src="assets/images/${image}>  
        //          `;
    
    // if (data = video)
    // {
    //     return  ` 
    //               <video controls><source src="assets/images/${video}"></video>
                  
    //              `;
    // }   
