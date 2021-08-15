import { Grad } from "./grad.js";
import { Hrana } from "./hrana.js";
import { Hranilica } from "./hranilica.js";
import { Lokacija } from "./lokacija.js";
const apiURL = `https://localhost:5001/Main/GetAllGradovi`;
//HRANA I HRANILICE
// const hranilica1 = new Hranilica(0, 1000);
// const hranilica2 = new Hranilica(0, 500);
// const hranilica3 = new Hranilica(0, 500);
// const hranilica4 = new Hranilica(0, 1000);
// const hranilica5 = new Hranilica(0, 500);
// const hranilica6 = new Hranilica(0, 500);
// const hranilica7 = new Hranilica(0, 1000);
// const hranilica8 = new Hranilica(0, 500);
// const hranilica9 = new Hranilica(0, 500);

//LOKACIJE
// const lokacija1 = new Lokacija(0, 5, "Palilula");
// lokacija1.DodajHranilicu(hranilica1);
// lokacija1.DodajHranilicu(hranilica2);

// const lokacija2 = new Lokacija(0,2, "Lokacija2");

// const lokacija3 = new Lokacija(0,10, "Lokacija3");
// lokacija3.DodajHranilicu(hranilica3);
// lokacija3.DodajHranilicu(hranilica4);
// lokacija3.DodajHranilicu(hranilica5);
// lokacija3.DodajHranilicu(hranilica6);
// lokacija3.DodajHranilicu(hranilica7);

// const lokacija4 = new Lokacija(0,4, "Lokacija4");
// lokacija4.DodajHranilicu(hranilica8);
// lokacija4.DodajHranilicu(hranilica9);

//GRADOVI
// const grad1 = new Grad("Nis");
// grad1.DodajLokaciju(lokacija1);
// grad1.DodajLokaciju(lokacija2);

// const grad2 = new Grad("Beograd");
// grad2.DodajLokaciju(lokacija3);
// grad2.DodajLokaciju(lokacija4);

// grad1.CrtajSve(document.body);
// grad2.CrtajSve(document.body);

fetch(`${apiURL}`)
  .then((result) => {
    result.json().then((data) => {
        console.log(data);
      data.forEach((grad) => {
        const noviGrad = new Grad(grad.id, grad.naziv);
        grad.lokacije.forEach((lokacija) => {
          const novaLokacija = new Lokacija(lokacija.id , 0, lokacija.maxKapacitet, lokacija.nazivLokacije);
          lokacija.hranilice.forEach((hranilica) => {     
            const novaHranilica = new Hranilica(hranilica.id,0, hranilica.maxKapacitet);
            hranilica.hrana.forEach((hrana) => {
              const novaHrana = new Hrana(hrana.id,hrana.tip, hrana.trenutnaKolicina);
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
