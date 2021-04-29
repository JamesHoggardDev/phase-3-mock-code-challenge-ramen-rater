renderRamenMenu()

const ramenMenu = document.querySelector("#ramen-menu")
const detailedRamenUpdateForm = document.querySelector("#ramen-rating")
const deleteBttn = document.querySelector("#ramen-rating > button")


fetch('http://localhost:3000/ramens/1')
    .then(res => res.json())
    .then(firstObj => {

        const detailImg = document.querySelector('img.detail-image')
        detailImg.src = firstObj.image
        detailImg.alt = firstObj.name

        const detailH2 = document.querySelector("#ramen-detail > h2")
        detailH2.textContent = firstObj.name

        const detailH3 = document.querySelector("#ramen-detail > h3")
        detailH3.textContent = firstObj.restaurant

        const ratingInput = document.querySelector("#rating")
        ratingInput.value = firstObj.rating

        const commentInput = document.querySelector("#comment")
        commentInput.value = firstObj.comment

        detailedRamenUpdateForm.dataset.id = firstObj.id
    })

    deleteBttn.addEventListener('click', evt => {
        // console.log(evt.target.dataset.id)
        const imgtoRemove = document.querySelector(`img[data-id="${evt.target.dataset.id}"]`)
        console.log(imgtoRemove)
        
        fetch(`http://localhost:3000/ramens/${evt.target.dataset.id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(emptyObj => {  
            imgtoRemove.remove();
        })
    });

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
                
                deleteBttn.dataset.id = ramenObj.id
                detailedRamenUpdateForm.append(deleteBttn)
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
    // .then(console.log)
})
