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

fetch(BASE_URL + "/toys") // get all the toys and display them in the DOM
.then((response) => response.json())
.then((json) => {
  let toyCollectionDiv = document.getElementById("toy-collection");
  let buttonIdCounter = 0;
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
    likeButton.id = ++buttonIdCounter; 
    likeButton.innerText = "Like!";
    likeButton.addEventListener("click", (e) => {
      e.preventDefault()
      fetch(`${BASE_URL}/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: togglerForTheLikeButton ? parseInt(likes.innerText) - 1 : parseInt(likes.innerText) + 1})
      })
      
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

let form = document.querySelector(".add-toy-form");
let nameInput = document.getElementById("name");
let imgURLInput = document.getElementById("imgURL");

form.addEventListener("submit", (e) => {
  e.preventDefault()
  fetch(BASE_URL + "/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ name: nameInput.nodeValue, image: imgURLInput, likes: 0})
  }).then(resp => resp.json()).then(json => console.log(json))
})
