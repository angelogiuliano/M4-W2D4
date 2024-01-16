const params = new URLSearchParams(location.search)
const id = params.get("id")
const main = document.getElementById('dettagli-libro')
console.log(id);

let generaDettagli = async function () {
    main.innerHTML += `
    <div class="border-cont">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
    await fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
    .then(res => res.json())
    .then((data) => {
        main.innerHTML = ""
        main.innerHTML += `
        <div class="book-cont d-flex">
            <img src=${data.img}>
            <div class"book-data">
                <h2>${data.title}</h2>
                <h3><b>Category: </b>${data.category}</h3>
                <h3><b>Price:</b> ${data.price} $</h3>
            </div>
        </div>

        `

    })
}

generaDettagli()