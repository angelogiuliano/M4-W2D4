// trovo gli elementi che mi serviranno e li porto dall'html in js
const main = document.getElementById("main");
const input = document.getElementById("input-search");
let listaCarrelloHTML = document.getElementById("lista-carrello");

let books = async function () {
  
  // Inserisco gif di caricamento
  main.innerHTML += `
  <div class="border-cont">
      <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
  </div>
  `
  await fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => res.json())
    .then((data) => {

      // Rimuovo la gif di caricamento
      main.innerHTML = "";

      let listaCarrello = [];
      let libri = data;

      // Funzione per passare l'id alla pagina dettagli
      let apriDettagli = function (asin) {
        window.open(("dettagli.html?indice=" + asin))
      }

      // Funzione che filtra i libri ottenuti tramite la fetch se la ricerca ha +3 caratteri
      let filtraLibri = function (ricerca) {
        if (ricerca.length > 3) {
          const result = libri.filter((libro) =>
            libro.title.toLowerCase().includes(ricerca)
          );
          if (result.length > 0) {
            main.innerHTML = "";
            result.map((foundBook) => {
              main.innerHTML += `
            <div id=${foundBook.asin} class="card d-block d-lg-2 d-md-3 d-sm-4" style="width: 18rem;">
              <img src=${foundBook.img} class="card-img-top w-100 book-img">
              <div class="card-body">
                  <h5 class="text-wrap card-title">${foundBook.title}</h5>
                  <p class="card-text"><b>Category:</b> ${foundBook.category}</p>
                  <p class="card-text"><b>Price:</b> ${foundBook.price} $</p>
              </div>
              <div class="button-container d-flex">
                <button class="cart m-3 d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </button>
                <button class="not-interested m-3 d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
               </button>
               <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
                 </svg>
              </button>
              </div>
            </div>
              `;
            })
          } else {
            main.innerHTML = ""
            main.innerHTML += `<h5>Nessun risultato</h5>`
          }
        } 
        // Se la ricerca dovesse essere cancellata e/o non dovesse più contenere 3+ caratteri, mostra di nuovo tutti i libri fetchati
        else {
          main.innerHTML = ""
          libri.map((book) => {
            main.innerHTML += `
                <div id=${book.asin} class="card d-block d-lg-2 d-md-3 d-sm-4" style="width: 18rem;">
                <img src=${book.img} class="card-img-top w-100 book-img">
                <div class="card-body">
                    <h5 class="text-wrap card-title">${book.title}</h5>
                    <p class="card-text"><b>Category:</b> ${book.category}</p>
                    <p class="card-text"><b>Price:</b> ${book.price} $</p>
                </div>
                <div class="button-container d-flex">
                  <button class="cart m-3 d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                  </button>
                  <button class="not-interested m-3 d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
                    </svg>
                  </button>
                </div>
              </div>
            `;
          });
        }
      };

      // Map utilizzato per mostrare i libri all'apertura iniziale della pagina 
      libri.map((book) => {
        main.innerHTML += `
            <div id=${book.asin} class="card d-flex d-lg-2 d-md-3 d-sm-4" style="width: 18rem;">
            <img src=${book.img} class="card-img-top book-img">
            <div class="card-body">
                <h5 class="text-wrap card-title">${book.title}</h5>
                <p class="card-text"><b>Category:</b> ${book.category}</p>
                <p class="card-text"><b>Price:</b> ${book.price} $</p>
            </div>
            <div class="button-container d-flex justify-content-center">
                <button class="cart m-3 d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </button>
                <button class="not-interested m-3 d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
              </button>
              <button class="details-btn m-3 d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
                </svg>
              </button>
              </div>
            </div>
        `;
      });

      // EventListener dell'input search che chiama la funzione filtraLibri
      input.addEventListener("change", () => {
        filtraLibri(input.value);
      });

      // Aggiunta degli event listener per aggiungere/rimuovere gli elementi dal carrello (con aggiunta/rimozione alla lista del carrello e degli stili)
      let cartButtons = document.getElementsByClassName("cart");
      let notInterestedButtons = document.getElementsByClassName("not-interested");
      let detailButtons = document.getElementsByClassName("details-btn");

      for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].addEventListener("click", function () {
          let nomeLibroConPrezzo = this.parentElement.parentElement.children[1].children[0].innerText + " " + this.parentElement.parentElement.children[1].children[2].innerText
          if (
            !listaCarrello.includes(
              nomeLibroConPrezzo
            )
          ) {
            listaCarrelloHTML.innerHTML = ""
            listaCarrello.push(
              nomeLibroConPrezzo
            );
              listaCarrello.map((nomeLibroConPrezzo) => {
                listaCarrelloHTML.innerHTML +=
              `<li>
                <p>${nomeLibroConPrezzo}</p>
              </li>`
            })
          } else {
            listaCarrelloHTML.innerHTML = ""
            const index = listaCarrello.indexOf(
              nomeLibroConPrezzo
            );
            if (index > -1) {
              listaCarrello.splice(index, 1);
            }
            listaCarrello.map((nomeLibroConPrezzo) => {
              listaCarrelloHTML.innerHTML +=
            `<li>
              <p>${nomeLibroConPrezzo}</p>
            </li>`
          })
          }
          if (this.parentElement.parentElement.classList.value.includes("bg-success")) {
            this.parentElement.parentElement.classList.remove("bg-success");
          } else {
            this.parentElement.parentElement.classList.add("bg-success");
          }

        });
      }

      // Tasto non mi interessa
      for (let i = 0; i < notInterestedButtons.length; i++) {
        notInterestedButtons[i].addEventListener("click", function () {
          this.parentElement.parentElement.classList.add("d-none");
        });
      }

      // Tasto dettagli
      for (let i = 0; i < detailButtons.length; i++) {
        detailButtons[i].addEventListener('click', function() {
          window.open(`./dettagli.html?id=${this.parentElement.parentElement.attributes.id.value}`)
        })
      }

    });
};

books();
