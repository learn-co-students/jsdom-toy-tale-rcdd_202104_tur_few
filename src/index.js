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

// let toyCollection = document.getElementById("toy-collection");
// toyCollection.className = "container";

// let divRow = document.createElement("div");
// divRow.className = "row row-cols-2";

// toyCollection.appendChild(divRow);
// document.body.appendChild(toyCollection)

  let toyHeader = document.getElementById("toy-collection");
  let divCard = document.createElement("div");
  divCard.className = "col-3"
  divCard.classList.add("card");
  
//  toyHeader.appendChild(divCard);
let divContainer = document.createElement("div");
divContainer.className = "container"
let divRow = document.createElement("div");
divRow.className = "row"
document.body.appendChild(divCard);

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then((toys) => {  
  for(let i=0 ; i<toys.length ; i++){
    
    // let divCard = document.createElement("div");
    // divCard.className = "card col";


    // divRow.appendChild(divCard)

    let h = document.createElement("h2");
    h.innerHTML = toys[i].name;

    let img=document.createElement("img");
    img.src = toys[i].image;
    img.className = "toy-avatar";

    let p=document.createElement("p");
    p.innerHTML = `${toys[i].likes} like`;
    p.className = "like";

    let button = document.createElement("button")
    button.innerText  = "Like";
    button.className = "like-btn";
    button.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    })

    divCard.appendChild(h);
    divCard.appendChild(img);
    divCard.appendChild(p);
    divCard.appendChild(button);
  }   
});

  document.querySelector(".submit").addEventListener('click', (e) => {
    e.preventDefault();
    let formData = {
      "name": document.querySelectorAll('.input-text')[0].value,
      "image": document.querySelectorAll('.input-text')[1].value,
      "likes": "0"
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
  
    fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(json => console.log(json))
  });

    const toyForm = document.querySelector('.container')
   
      // hide & seek with the form
        function likes(e) {
          e.preventDefault()
          let more = parseInt(e.target.previousElementSibling.innerText) + 1
        
          fetch(`http://localhost:3000/toys/${e.target.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        
              },
              body: JSON.stringify({
                "likes": more
              })
            })
            .then(res => res.json())
            .then((like_obj => {
              e.target.previousElementSibling.innerText = `${more} likes`;

              
        
          }))
          
      }  

   