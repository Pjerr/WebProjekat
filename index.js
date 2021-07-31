import { Grad } from "./grad.js";
import { Hrana } from "./hrana.js";
import { Hranilica } from "./hranilica.js";
import { Lokacija } from "./lokacija.js";

//HRANA I HRANILICE
const hrana1 = new Hrana("Meso");
const hranilica1 = new Hranilica(0, 1000);
hranilica1.DodajHranu(hrana1, 200);
const hrana2 = new Hrana("Granule");
const hranilica2 = new Hranilica(0, 500)
hranilica2.DodajHranu(hrana1, 300);
hranilica2.DodajHranu(hrana2, 150);

//LOKACIJE
const lokacija1 = new Lokacija(0, 5, "Palilula");
lokacija1.DodajHranilicu(hranilica1);
lokacija1.DodajHranilicu(hranilica2);

const lokacija2 = new Lokacija(0,2, "Lokacija 2");
lokacija2.DodajHranilicu(hranilica1);

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