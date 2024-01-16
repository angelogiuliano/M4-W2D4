const params = new URLSearchParams(location.search);
const id = params.get("id");
const main = document.getElementById("dettagli-libro");

let generaDettagli = async function () {
  // Aggiungo gif di caricamento
  main.innerHTML += `
    <div class="border-cont">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
  await fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // Rimuovo la gif aggiunta in precedenza e renderizzo i dati fetchati
      main.innerHTML = "";
      main.innerHTML += `
        <div class="book-cont d-flex">
            <img src=${data.img}>
            <div class"book-data">
                <h2>${data.title}</h2>
                <h3><b>Category: </b>${data.category}</h3>
                <h3><b>Price:</b> ${data.price} $</h3>
            </div>
        </div>
        `;
    });
};

generaDettagli();
