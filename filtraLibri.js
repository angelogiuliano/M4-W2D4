import { mappaLibri } from "./mappaLibri.js";

export const filtraLibri = function (ricerca, libri) {
  if (ricerca.length > 3) {
    const result = libri.filter((libro) =>
      libro.title.toLowerCase().includes(ricerca)
    );
    if (result.length > 0) {
      main.innerHTML = "";
      mappaLibri(result);
    } else {
      main.innerHTML = "";
      main.innerHTML += `<h5>Nessun risultato</h5>`;
    }
  }
  // Se la ricerca dovesse essere cancellata e/o non dovesse più contenere 3+ caratteri, mostra di nuovo tutti i libri fetchati
  else {
    main.innerHTML = "";
    mappaLibri(libri);
  }
};
