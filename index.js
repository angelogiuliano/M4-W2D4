// trovo gli elementi che mi serviranno e li porto dall'html in js
const main = document.getElementById("main");
const input = document.getElementById("input-search");
let listaCarrelloHTML = document.getElementById("lista-carrello");

let books = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => res.json())
    .then((data) => {
      let listaCarrello = [];
      let libri = data;

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
            </div>
              <button class="cart ms-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
              </button>
              <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
              </button>
            </div>
              `;
            })
          } else {
            main.innerHTML = ""
            main.innerHTML += `<h5>Nessun risultato</h5>`
          }
        } 
        // se la ricerca dovesse essere cancellata e/o non dovesse più contenere 3+ caratteri, mostra di nuovo tutti i libri fetchati
        else {
          main.innerHTML = ""
          libri.map((book) => {
            main.innerHTML += `
                <div id=${book.asin} class="card d-block d-lg-2 d-md-3 d-sm-4" style="width: 18rem;">
                <img src=${book.img} class="card-img-top w-100 book-img">
                <div class="card-body">
                    <h5 class="text-wrap card-title">${book.title}</h5>
                    <p class="card-text"><b>Category:</b> ${book.category}</p>
                </div>
                    <button class="cart ms-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" class="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </button>
                    <button class="not-interested ms-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                      </svg>
                  </button>
                </div>
            `;
          });
        }
      };

      // map utilizzato per mostrare i libri all'apertura iniziale della pagina 
      libri.map((book) => {
        main.innerHTML += `
            <div id=${book.asin} class="card d-block d-lg-2 d-md-3 d-sm-4" style="width: 18rem;">
            <img src=${book.img} class="card-img-top w-100 book-img">
            <div class="card-body">
                <h5 class="text-wrap card-title">${book.title}</h5>
                <p class="card-text"><b>Category:</b> ${book.category}</p>
            </div>
                <button class="cart ms-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="gray" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </button>
                <button class="not-interested ms-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
              </button>
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

      for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].addEventListener("click", function () {
          if (
            !listaCarrello.includes(
              this.parentElement.children[1].children[0].innerText
            )
          ) {
            listaCarrelloHTML.innerHTML = ""
            listaCarrello.push(
              this.parentElement.children[1].children[0].innerText
            );
              listaCarrello.map((libroInLista) => {

                listaCarrelloHTML.innerHTML +=
              `<li>
                <p>${libroInLista}</p>
              </li>`
            })
          } else {
            listaCarrelloHTML.innerHTML = ""
            const index = listaCarrello.indexOf(
              this.parentElement.children[1].children[0].innerText
            );
            if (index > -1) {
              listaCarrello.splice(index, 1);
            }
            listaCarrello.map((libroInLista) => {
              
              listaCarrelloHTML.innerHTML +=
            `<li>
              <p>${libroInLista}</p>
            </li>`
          })
          }
          if (this.parentElement.classList.value.includes("bg-success")) {
            this.parentElement.classList.remove("bg-success");
          } else {
            this.parentElement.classList.add("bg-success");
          }

        });
      }

      // Tasto "non mi interessa"
      for (let i = 0; i < notInterestedButtons.length; i++) {
        notInterestedButtons[i].addEventListener("click", function () {
          this.parentElement.classList.add("d-none");
        });
      }
    });
};

books();
