renderRamenMenu()

const ramenMenu = document.querySelector("#ramen-menu")
const detailedRamenUpdateForm = document.querySelector("#ramen-rating")

function renderRamenMenu(){
    fetch("http://localhost:3000/ramens")        
    .then(resp => resp.json())
    .then(ramenArr => {
          ramenArr.forEach(renderOneMenuImage)
    })      
}

function renderOneMenuImage(ramenObject){
    const img = document.createElement('img')
        img.src = ramenObject.image
        img.alt = ramenObject.name
        img.dataset.id = ramenObject.id
        ramenMenu.append(img)
}

ramenMenu.addEventListener('click', event =>{
    if(event.target.matches('img')){

        fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
            .then(resp => resp.json())
            .then(ramenObj =>{

                const detailImg = document.querySelector('img.detail-image')
                detailImg.src = ramenObj.image
                detailImg.alt = ramenObj.name

                const detailH2 = document.querySelector("#ramen-detail > h2")
                detailH2.textContent = ramenObj.name

                const detailH3 = document.querySelector("#ramen-detail > h3")
                detailH3.textContent = ramenObj.restaurant

                const ratingInput = document.querySelector("#rating")
                ratingInput.value = ramenObj.rating

                const commentInput = document.querySelector("#comment")
                commentInput.value = ramenObj.comment

                detailedRamenUpdateForm.dataset.id = ramenObj.id
                //has to click to update
                
            })
    }
})

detailedRamenUpdateForm.addEventListener("submit", event => {
    event.preventDefault()

    const rating = event.target.rating.value
    const comment = event.target.comment.value

    fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({rating, comment})
    })
    .then(console.log)

    // detailedRamenUpdateForm.reset()
})


const deleteBttn = document.createElement('button')
deleteBttn.classList.add("delete-button")
deleteBttn.dataset.id = 1
deleteBttn.textContent = "Delete"
detailedRamenUpdateForm.append(deleteBttn)

// deleteBttn.addEventListener('click', event => {
//     if(event.target.className === 'delete-button'){


//         detailImg.remove()
//     }
// } ) 





// function deleteRamen(){}