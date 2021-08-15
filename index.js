import { Grad } from "./grad.js";
import { Hrana } from "./hrana.js";
import { Hranilica } from "./hranilica.js";
import { Lokacija } from "./lokacija.js";
const apiURL = `https://localhost:5001/Main/GetAllGradovi`;

fetch(`${apiURL}`)
  .then((result) => {
    result.json().then((data) => {
      console.log(data);
      data.forEach((grad) => {
        const noviGrad = new Grad(grad.id, grad.naziv);
        grad.lokacije.forEach((lokacija) => {
          const novaLokacija = new Lokacija(
            lokacija.id,
            0,
            lokacija.maxKapacitet,
            lokacija.nazivLokacije
          );
          lokacija.hranilice.forEach((hranilica) => {
            const novaHranilica = new Hranilica(
              hranilica.id,
              0,
              hranilica.maxKapacitet
            );
            hranilica.hrana.forEach((hrana) => {
              const novaHrana = new Hrana(
                hrana.id,
                hrana.tip,
                hrana.trenutnaKolicina
              );
              novaHranilica.DodajHranu(novaHrana);
            });
            novaLokacija.DodajHranilicu(novaHranilica);
          });
          noviGrad.DodajLokaciju(novaLokacija);
        });
        noviGrad.CrtajSve(document.body);
      });
    });
  })
  .catch((err) => {
    console.log(console.log(err));
  });