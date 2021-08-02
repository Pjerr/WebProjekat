import { Hrana } from "./hrana.js";
import { Hranilica } from "./hranilica.js";
import { Lokacija } from "./lokacija.js";

export class Grad {
  constructor(naziv) {
    this.lokacije = [];
    this.naziv = naziv;
    this.miniContainer = null;
  }

  DodajLokaciju(lokacija) {
    this.lokacije.push(lokacija);
  }

  CrtajFormu(host) {
    this.miniContainer = document.createElement("div");
    this.miniContainer.classList.add("forma");
    host.appendChild(this.miniContainer);
    // this.CrtajFrmGrad(this.miniContainer);
    this.CrtajFrmLokacija(this.miniContainer);
    this.CrtajFrmHranilica(this.miniContainer);
    this.CrtajFrmHrana(this.miniContainer);
  }

  CrtajFrmGrad(host) {
    let div = document.createElement("div");
    div.classList.add("frmGrad");
    host.appendChild(div);
    let naslov = document.createElement("h4");
    naslov.innerHTML = "Dodaj grad";
    div.appendChild(naslov);
    let labela = document.createElement("label");
    labela.innerHTML = "Naziv grada ";
    div.appendChild(labela);
    let input = document.createElement("input");
    div.appendChild(input);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj novi grad";
    dugme.classList.add("btnDodajGrad");
    div.appendChild(dugme);
  }

  CrtajFrmLokacija(host) {
    let div = document.createElement("div");
    div.classList.add("frmLokacija");
    host.appendChild(div);
    let naslov = document.createElement("h4");
    naslov.innerHTML = "Dodaj lokaciju";
    div.appendChild(naslov);
    let labela = document.createElement("label");
    labela.innerHTML = "Naziv lokacije ";
    div.appendChild(labela);
    let input = document.createElement("input");
    input.id = "nazivLokacijaNova";
    div.appendChild(input);
    labela = document.createElement("label");
    labela.innerHTML = "Max hranilica ";
    div.appendChild(labela);
    input = document.createElement("input");
    input.id = "kapLokacijaNova";
    input.setAttribute("type", "number");
    div.appendChild(input);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj novu lokaciju";
    dugme.classList.add("btnDodajLokaciju");
    dugme.onclick = () => {
      console.log("KLIK NA NOVU LOKACIJU");
      let naziv = div.querySelector("#nazivLokacijaNova").value;
      naziv = naziv.replace(/\s+/g, '');
      const kapacitet = parseInt(div.querySelector("#kapLokacijaNova").value);
      console.log(`Naziv lokacije ${naziv}, Kapacitet lokacije ${kapacitet}`);
      if (naziv && kapacitet) {
        const novaLokacija = new Lokacija(0, kapacitet, naziv);
        this.DodajLokaciju(novaLokacija);
        document.body.innerHTML = "";
        this.CrtajSve(document.body);
      }
    };
    div.appendChild(dugme);
  }

  CrtajFrmHranilica(host) {
    let div = document.createElement("div");
    div.classList.add("frmHranilica");
    host.appendChild(div);
    let naslov = document.createElement("h4");
    naslov.innerHTML = "Dodaj hranilicu";
    div.appendChild(naslov);

    let labela = document.createElement("label");
    labela.innerHTML = "Lokacija ";
    div.appendChild(labela);
    let select = document.createElement("select");
    select.classList.add("selectLokacija");
    div.appendChild(select);
    let option;
    option = document.createElement("option");
    option.text = "";
    option.value = -1;
    select.appendChild(option);
    this.lokacije.forEach((lokacija, index) => {
      option = document.createElement("option");
      option.text = lokacija.nazivLokacije;
      option.value = lokacija.nazivLokacije;
      select.appendChild(option);
    });

    labela = document.createElement("label");
    labela.innerHTML = "Max kapacitet(gr) ";
    div.appendChild(labela);
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.id = "kapHranilicaNova";
    div.appendChild(input);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj novu hranilicu";
    dugme.classList.add("btnDodajHranilicu");
    dugme.onclick = () => {
      console.log("KLIK NA DODAJ HRANILICU");
      const kapacitet = parseInt(div.querySelector("#kapHranilicaNova").value);
      const lokacijaNaziv = select.value;
      console.log(
        `Kapacitet hranilice ${kapacitet}, selektovana lokacija ${lokacijaNaziv}`
      );
      const objLokacija = this.lokacije.find(
        (lokacija) => lokacija.nazivLokacije === lokacijaNaziv
      );
      if (objLokacija && kapacitet > 0) {
        console.log("DODAJEM HRANILICU");
        const hranilica = new Hranilica(0, kapacitet);
        if (objLokacija.DodajHranilicu(hranilica)) {
          // DORADITI PRIKAZ
          //mozda postoji bolje resenje?
          document.body.innerHTML = "";
          this.CrtajSve(document.body);
          console.log(objLokacija.hranilice);
        } else alert("Nema mesta za vise hranilica");
      } else {
        alert("Molimo Vas da izaberete odgovarajuce podatke");
      }
    };
    div.appendChild(dugme);
  }

  CrtajFrmHrana(host) {
    let div = document.createElement("div");
    div.classList.add("frmHrana");
    host.appendChild(div);
    let naslov = document.createElement("h4");
    naslov.innerHTML = "Dodaj hranu";
    div.appendChild(naslov);

    let labela = document.createElement("label");
    labela.innerHTML = "Lokacija ";
    div.appendChild(labela);
    let select = document.createElement("select");
    select.id = "selectLokacija";
    div.appendChild(select);
    let option;
    option = document.createElement("option");
    option.text = "";
    option.value = -1;
    select.appendChild(option);
    this.lokacije.forEach((lokacija, index) => {
      option = document.createElement("option");
      option.text = lokacija.nazivLokacije;
      option.value = lokacija.nazivLokacije;
      select.appendChild(option);
    });
    labela = document.createElement("lablel");
    labela.innerHTML = "Tip hrane ";
    div.appendChild(labela);
    select = document.createElement("select");
    select.id = "selectTipHrane";
    div.appendChild(select);
    option = document.createElement("option");
    option.value = -1;
    option.text = "";
    select.appendChild(option);
    option = document.createElement("option");
    option.value = "Granule";
    option.text = "Granule";
    select.appendChild(option);
    option = document.createElement("option");
    option.value = "Meso";
    option.text = "Meso";
    select.appendChild(option);
    labela = document.createElement("label");
    labela.innerHTML = "Kolicina(gr) ";
    div.appendChild(labela);
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.id = "kolicinaHrane";
    div.appendChild(input);

    labela = document.createElement("label");
    labela.innerHTML = "Hranilica po redu ";
    div.appendChild(labela);
    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.id = "indexHranilice";
    div.appendChild(input);

    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj novu hranu";
    dugme.classList.add("btnDodajHranu");
    dugme.onclick = () => {
      console.log("KLIK NA DODAJ HRANU");
      const lokacijaNaziv = div.querySelector("#selectLokacija").value;
      const tipHrane = div.querySelector("#selectTipHrane").value;
      const kolicina = parseInt(div.querySelector("#kolicinaHrane").value);
      const indx = div.querySelector("#indexHranilice").value;
      console.log(
        `selektovana lokacija ${lokacijaNaziv}, tip hrane ${tipHrane}, kolicina ${kolicina}, hranilica po redu: ${indx}`
      );
      const novaHrana = new Hrana(tipHrane, kolicina);
      if (this.lokacije.length - 1 > indx) {
        const objLokacija = this.lokacije.find(
          (lokacija) => lokacija.nazivLokacije === lokacijaNaziv
        );
        const objHranilica = objLokacija.hranilice[indx];
        console.log(objHranilica);
        const fillParentDiv = document.querySelector(`#${lokacijaNaziv}`);
        const fill = fillParentDiv.querySelectorAll(".hranilica");
        console.log(fillParentDiv ,fill[indx] + "FILL");
        if (objHranilica.DodajHranu(novaHrana, fill[indx])) {
          //DORADITI
        } else {
          alert("Nema dovoljno mesta u hranilici, izaberite drugu");
        }
      } else {
        console.log(this.lokacije.length, indx, "NE MOZE");
        alert("Molimo Vas izaberite odgovarajuce podatke");
      }
    };
    div.appendChild(dugme);
  }

  CrtajLokacije(host) {
    this.miniContainer = document.createElement("div");
    this.miniContainer.classList.add("grad");
    host.appendChild(this.miniContainer);
    this.lokacije.forEach((lokacija) => {
      lokacija.CrtajLokaciju(this.miniContainer);
    });
  }

  CrtajSve(host) {
    let div = document.createElement("div");
    div.classList.add("container");
    host.appendChild(div);

    this.CrtajFormu(div);
    this.CrtajLokacije(div);
  }
}
