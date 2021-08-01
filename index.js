import { Grad } from "./grad.js";
import { Hrana } from "./hrana.js";
import { Hranilica } from "./hranilica.js";
import { Lokacija } from "./lokacija.js";

//HRANA I HRANILICE
const hranilica1 = new Hranilica(0, 1000);
const hranilica2 = new Hranilica(0, 500)


//LOKACIJE
const lokacija1 = new Lokacija(0, 5, "Palilula");
lokacija1.DodajHranilicu(hranilica1);
lokacija1.DodajHranilicu(hranilica2);

const lokacija2 = new Lokacija(0,2, "Lokacija 2");
// lokacija2.DodajHranilicu(hranilica1);

const lokacija3 = new Lokacija(0,2, "Lokacija 3");
lokacija3.DodajHranilicu(hranilica1);
lokacija3.DodajHranilicu(hranilica1);
lokacija3.DodajHranilicu(hranilica1);
lokacija3.DodajHranilicu(hranilica1);
lokacija3.DodajHranilicu(hranilica1);

const lokacija4 = new Lokacija(0,2, "Lokacija 4");
lokacija4.DodajHranilicu(hranilica1);
lokacija4.DodajHranilicu(hranilica2);

//GRADOVI
const grad1 = new Grad();
grad1.DodajLokaciju(lokacija1);
grad1.DodajLokaciju(lokacija2);
grad1.DodajLokaciju(lokacija3);
grad1.DodajLokaciju(lokacija4);

grad1.CrtajSve(document.body);