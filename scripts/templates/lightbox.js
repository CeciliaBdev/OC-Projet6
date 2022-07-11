export function lightBoxTemplate(data, elementClicked) {
  //console.log(elementClicked)

  const idClicked = elementClicked.dataset.id;

  console.log("idClicked", idClicked);
  //console.log("data",data)

  // const { image,video,title } = data.find((item) => item.id == idClicked )
  const { image, video, title } = data.find(
    (elementTab) => elementTab.id == idClicked
  );
  //lorsque l'image correspond au bon id

  if (image) {
    return `<img src="assets/images/${image}" width="400" alt="Photographie">
                        <p>${title}</p>`;
  } else if (video) {
    return `<video controls width="400"><source src="assets/images/${video}"></video>
                <p>${title}</p>`;
  }
}
