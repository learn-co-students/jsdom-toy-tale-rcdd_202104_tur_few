let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitBtn = document.querySelector(".submit");

  fetchAllToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  submitBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    addNewToy();
  });
});
function fetchAllToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        putToCollection(element);
      });
    });
}
function addNewToy() {
  const name = document.getElementsByName("name")[0];
  const image = document.getElementsByName("image")[0];

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name: name.value, image: image.value, likes: 0 }),
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(element => {
      putToCollection(element);
      name.value = "";
      image.value = "";
    });
}

function addNewLike(id, btn) {
  btn.disabled = true;
  const p = document.querySelector(`#L${id}`);
  const likes = parseInt(p.innerText) + 1;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes }),
  };
  fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(response => response.json())
    .then(json => {
      p.innerText = likes + " Likes";
      btn.disabled = false;
    });
}
function putToCollection(element) {
  const collection = document.querySelector("#toy-collection");
  collection.innerHTML += `<div class="card">
        <h2>${element.name}</h2>
        <img src="${element.image}" class="toy-avatar" />
        <p id="L${element.id}">${element.likes} Likes </p>
        <button class="like-btn"  id="B${element.id}">Like <3</button>
      </div>`;
  const button = document.querySelector(`#B${element.id}`);
  button.addEventListener("click", function (event) {
    console.log("dsf");
    addNewLike(element.id, event.target);
  });
}
