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


const URL = "db.json"

function fetchToys() {
  return fetch(URL)
  .then(response => response.json())
  .then(data => renderToys(data.toys));
  // .then(data => console.log(data));
}

fetchToys()

function renderToys(toys) {
  console.log(toys)
  // toys.forEach(toys => { console.log(toys.name)});
  toys.forEach(toys => { 
    const toysCollection = document.querySelector("#toy-collection")
    const cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card")
    toysCollection.append(cardDiv)
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    img.setAttribute("class", "image")
    img.style.width = "300px"
    img.style.height = "250px"
    const p = document.createElement("p")
    const button = document.createElement("button")
    button.setAttribute("class", "like-btn")
    button.setAttribute("type", "submit")
    cardDiv.append(h2)
    cardDiv.append(img)
    cardDiv.append(p)
    cardDiv.append(button)
    h2.innerText = toys.name
    img.src = toys.image
    p.innerText = parseInt(toys.likes)
    button.innerText = "LIKE"
    
    button.addEventListener("click", function(e){
      e.preventDefault()
      console.log("clicked")
      // console.log(parseInt(p.innerText ++))
      return parseInt(p.innerText ++)
    })
  });
}

