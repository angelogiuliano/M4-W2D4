const main = document.getElementById("main");
const input = document.getElementById("input-search");

let books = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => res.json())
    .then((data) => {

      let listaCarrello = [];
      let aggiungiAlCarrello = function (elem) {
        if (!listaCarrello.includes(elem.parentElement.attributes.id.value)) {
          listaCarrello.push(elem.parentElement.attributes.id.value);
          console.log("aggiunto");
        } else {
          const index = listaCarrello.indexOf(elem.parentElement.attributes.id.value);
          if (index > -1) {
            listaCarrello.splice(index, 1);
          }
        }
        if (elem.parentElement.classList.value.includes("bg-success")) {
          elem.parentElement.classList.remove("bg-success");
        } else {
          elem.parentElement.classList.add("bg-success");
        }
        console.log(listaCarrello);
      };

      let filtraLibri = function (ricerca) {
        main.innerHTML = "";
        const result = data.filter((libro) =>
          libro.title.toLowerCase().includes(ricerca)
        );
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
          </div>
                `;
        });
      };

      data.map((book) => {
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
            </div>
        `;
      });

      input.addEventListener("change", () => {
        console.log(input.value);
        if (input.value.length > 3) {
          filtraLibri(input.value);
        }
        });

      let cartButtons = document.getElementsByClassName("cart");
      for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].addEventListener("click", function () {
          aggiungiAlCarrello(this);
        });
      }
    });
};

books();
