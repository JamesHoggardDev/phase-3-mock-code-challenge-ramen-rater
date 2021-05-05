const menuDiv = document.querySelector("#ramen-menu")
const centImg = document.querySelector("#ramen-detail > img")
const centH2 = document.querySelector("#ramen-detail > h2")
const centH3 = document.querySelector("#ramen-detail > h3")
const ratiForm = document.querySelector("#ramen-rating")
const deleteBttn = document.querySelector("#ramen-rating > button")
const newRamenForm = document.querySelector("#new-ramen")

function dispAllRamens(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramenArr => {
        runFirstRamen(ramenArr[0]);
        ramenArr.forEach(ramenObj => dispOneRamen(ramenObj))
    })
}

function runFirstRamen(ramenObj){
    makeCentDiv(ramenObj);
}

function dispOneRamen(ramenObj){
    const detImg = document.createElement('img')
        detImg.dataset.id = ramenObj.id
        detImg.classList.add('menu-image')
        detImg.src = ramenObj.image
        detImg.alt = ramenObj.name
        detImg.addEventListener('click', evt => {
            makeCentDiv(ramenObj)
        })
    menuDiv.append(detImg)
}

function makeCentDiv(ramenObj) {
    centImg.src = ramenObj.image

    centH2.textContent = ramenObj.name
    centH3.textContent = ramenObj.restaurant
    ratiForm.rating.value = ramenObj.rating
    ratiForm.comment.value = ramenObj.comment
    ratiForm.dataset.id = ramenObj.id
    deleteBttn.dataset.id = ramenObj.id
}

ratiForm.addEventListener('submit', evt => {
    evt.preventDefault()

    const rating = ratiForm.rating.value
    const comment = ratiForm.comment.value

    fetch(`http://localhost:3000/ramens/${evt.target.dataset.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": 'application/json'
        },
        body: JSON.stringify({rating, comment})
    })
    .then(res => res.json())
    .then(ramenObj => {
        let detImg = document.querySelector(`img[data-id="${ramenObj.id}"]`)
            detImg.innerHTML = "";
            detImg.src = ramenObj.image
            detImg.alt = ramenObj.name
            detImg.addEventListener('click', evt => {
            makeCentDiv(ramenObj)
        })
    })
})
dispAllRamens();

deleteBttn.addEventListener('click', evt => {
    let detImgToRemove = document.querySelector(`img.menu-image[data-id="${evt.target.dataset.id}"]`)
    centImg.src = '';
    centH2.textContent = '';
    centH3.textContent = '';
    detImgToRemove.remove();
    
    fetch(`http://localhost:3000/ramens/${evt.target.dataset.id}`,{
        method: "DELETE"
    })
    .then(res => res.json())
    .then(console.log);
})

newRamenForm.addEventListener('submit', evt => {
    evt.preventDefault();

    let newRamen = {
        name: newRamenForm.name.value,
        restaurant: newRamenForm.restaurant.value,
        image: newRamenForm.image.value,
        rating: newRamenForm.rating.value,
        comment: newRamenForm['new-comment'].value
    }
   
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
    .then(res => res.json());
})