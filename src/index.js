const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toyData) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyData.name.value,
        "image": toyData.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      renderToys(obj_toy)
    })
}

function likes(e) {
  e.preventDefault()
  let moreLikes = parseInt(e.target.previousElementSibling.innerText) + 1

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
    .then((likeoObj => {
      e.target.previousElementSibling.innerText = `${moreLikes} likes`;
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

  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', toy.id)
  button.innerText = "like"
  button.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divOfCard = document.createElement('div')
  divOfCard.setAttribute('class', 'card')
  divOfCard.append(h2, img, p, btn)
  divCollect.append(divOfCard)
}

addBtn.addEventListener('click', () => {
  
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys().then(toys => {
  toys.forEach(toy => {
    
    renderToys(toy)
  })
})
