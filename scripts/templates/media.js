export function mediaTemplate(data) {
  const { image, title, likes, video } = data

  if ((data = image)) {
    return ` 
            
                <img src="assets/images/${image}"  alt="photographie ${title}" tabindex="0"> 
            
            <div class="infos">
                <p aria-label="${title}">${title}</p>
                <p class="mediaLike" aria-label="${likes} coeur">${likes}<i class="fas fa-heart" tabindex="0" ></i></p>
            </div>
            `
  }
  if ((data = video)) {
    return ` <video controls tabindex="0"><source src="assets/images/${video}"></video>
                <div class="infos">
                    <p aria-label="${title}">${title}</p>
                    <p class="mediaLike" aria-label="${likes} coeur">${likes}<i class="fas fa-heart" tabindex="0" aria-label="coeur"></i></p>
                </div>
            `
  }
}
