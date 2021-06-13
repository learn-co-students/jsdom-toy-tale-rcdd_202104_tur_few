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

fetch ("http://localhost:3000/toys")
.then(response => response.json())
.then(json => addToys(json));
console.log(json)
const collection = document.getElementById('toy-collection');
function addToys(data) {
  data.forEach(element => {
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const img = document.createElement('img')
    const likes = document.createElement('p')
    const button = document.createElement('button')

    card.setAttribute('class', 'card')
    name.innerText = element.name;
    img.setAttribute('src', element.image)
    img.setAttribute('class', 'toy-avatar')
    likes.innerText = element.likes + 'likes'
    button.setAttribute('class', 'like-btn')

    card.append(name)
    card.append(img)
    card.append(likes)
    card.append(button)

    collection.append(card)


  });
}

//ill finish this later