let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", function(e) {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});



// document.addEventListener("DOMContentLoaded", () => {
// function fetchAllToys() {
//   fetch("http://localhost:3000/toys")
//     .then(response => response.json())
//     .then((data)=> {
//       console.log(data);
//       for (const element of data) {
//         console.log(element);
//         const create = document.querySelector('#toy-collection'); 
//         let newDiv = document.createElement("div");
//         newDiv.className = "card";
//         // newDiv.innerHTML = toy.image;
//         newDiv.innerHTML = '<h2>' + toy.name + '</h2>' + '<img src="'+toy.image+'" class="toy-avatar" />' + '<p>' + toy.likes + " Likes" + '</p>' + '<button class="like-btn">Like ❤️</button>';
//         create.appendChild(newDiv);
//       }
//     })
//     }
//     fetchAllToys();
//   })

const addBtn = document.querySelector('#new-toy-btn')
 const toyForm = document.querySelector('.container')
 let divCollect = document.querySelector('#toy-collection')
 let btnLike = document.querySelector('.like-btn')


 function getToys() {
   return fetch('http://localhost:3000/toys')
     .then(res => res.json())
 }

 

 function postToy(toy_data) {
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
   }
   fetch('http://localhost:3000/toys', configObj)
     .then(res => res.json())
     .then((obj_toy) => {
       renderToys(obj_toy)
     })
 }

 function likes(e) {
   e.preventDefault()
   let newNumber = parseInt(e.target.previousElementSibling.innerText) + 1

   fetch(`http://localhost:3000/toys/${e.target.id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"

       },
       body: JSON.stringify({
         "likes": newNumber
       })
     })
     .then(res => res.json())
     .then((like_obj => {
       e.target.previousElementSibling.innerText = `${newNumber} likes`;
     }))
 }

 function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "Like ❤️"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}
   
   

 getToys().then(toys => {
   toys.forEach(toy => {
     renderToys(toy)
   })


 })

