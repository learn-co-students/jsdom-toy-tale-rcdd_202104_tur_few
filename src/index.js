let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


let togglerForTheLikeButton = false;
let BASE_URL = "http://localhost:3000" // it has /toys in it 

fetch(BASE_URL + "/toys")
.then((response) => response.json())
.then((json) => {
  console.log(json)
  let toyCollectionDiv = document.getElementById("toy-collection");
  json.forEach((toyObj) => {
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "card");

    let name = document.createElement("h2");
    name.innerText = toyObj.name;

    let img = document.createElement("img");
    img.src = toyObj.image;
    img.setAttribute("class", "toy-avatar");
 
    let likes = document.createElement("p");
    likes.innerText = toyObj.likes;

    let likeButton = document.createElement("button");
    likeButton.innerText = "Like!";
    likeButton.addEventListener("click", () => {
      if(togglerForTheLikeButton === false) {
        likes.innerText = parseInt(likes.innerText) + 1;
      }
      else if (togglerForTheLikeButton === true) {
        likes.innerText = parseInt(likes.innerText) - 1;
      }
      togglerForTheLikeButton = !togglerForTheLikeButton 
    })

    divCard.appendChild(name);
    divCard.appendChild(img);
    divCard.appendChild(likes);
    divCard.appendChild(likeButton);

    toyCollectionDiv.appendChild(divCard);
  })


})