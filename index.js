import { aggiungiTastiConListener } from "./aggiungiTastiConListener.js";
import { filtraLibri } from "./filtraLibri.js";
import { mappaLibri } from "./mappaLibri.js";

// trovo gli elementi che mi serviranno e li porto dall'html in js
const main = document.getElementById("main");
const input = document.getElementById("input-search");

const books = async function () {
  // Inserisco gif di caricamento
  main.innerHTML += `
  <div class="border-cont">
      <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
  </div>
  `;
  await fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => res.json())
    .then((data) => {
      // Rimuovo la gif di caricamento
      main.innerHTML = "";

      // forEach utilizzato per mostrare i libri all'apertura iniziale della pagina
      mappaLibri(data);

      // EventListener dell'input search che chiama la funzione filtraLibri
      input.addEventListener("change", () => {
        filtraLibri(input.value, data);
      });

      aggiungiTastiConListener();
    });
};

books();
