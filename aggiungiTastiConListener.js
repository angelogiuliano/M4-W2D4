// Aggiunta degli event listener per aggiungere/rimuovere gli elementi dal carrello (con aggiunta/rimozione alla lista del carrello e degli stili)
const cartButtons = document.getElementsByClassName("cart");
const notInterestedButtons = document.getElementsByClassName("not-interested");
const detailButtons = document.getElementsByClassName("details-btn");
const listaCarrelloHTML = document.getElementById("lista-carrello");
let listaCarrello = [];

export const aggiungiTastiConListener = function () {
  for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", function () {
      let nomeLibroConPrezzo =
        this.parentElement.parentElement.children[1].children[0].innerText +
        " " +
        this.parentElement.parentElement.children[1].children[2].innerText;
      if (!listaCarrello.includes(nomeLibroConPrezzo)) {
        listaCarrelloHTML.innerHTML = "";
        listaCarrello.push(nomeLibroConPrezzo);
        listaCarrello.map((nomeLibroConPrezzo) => {
          listaCarrelloHTML.innerHTML += `<li>
              <p>${nomeLibroConPrezzo}</p>
            </li>`;
        });
      } else {
        listaCarrelloHTML.innerHTML = "";
        const index = listaCarrello.indexOf(nomeLibroConPrezzo);
        if (index > -1) {
          listaCarrello.splice(index, 1);
        }
        listaCarrello.map((nomeLibroConPrezzo) => {
          listaCarrelloHTML.innerHTML += `<li>
            <p>${nomeLibroConPrezzo}</p>
          </li>`;
        });
      }
      if (
        this.parentElement.parentElement.classList.value.includes("bg-success")
      ) {
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
    detailButtons[i].addEventListener("click", function () {
      window.open(
        `./dettagli.html?id=${this.parentElement.parentElement.attributes.id.value}`
      );
    });
  }
};
