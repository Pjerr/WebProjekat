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
    this.CrtajDugmeJedi(this.miniContainer);
  }

  OsveziFormu(host) {
    this.CrtajFrmLokacija(host);
    this.CrtajFrmHranilica(host);
    this.CrtajFrmHrana(host);
    this.CrtajDugmeJedi(host);
  }

  CrtajDugmeJedi(host) {
    const div = document.createElement("div");
    div.classList.add("dugmeJediDiv");
    const labela = document.createElement("lablel");
    labela.innerHTML = "Simulacija kada psi jedu hranu iz hranilica";
    div.appendChild(labela);
    const dugme = document.createElement("button");
    dugme.innerHTML = "Jedi";
    dugme.onclick = () => {
      this.lokacije.forEach((lokacija) => {
        if (lokacija.hranilice.length > 0) {
          let fillDiv = document.querySelector(`.${lokacija.nazivLokacije}`);
          lokacija.hranilice.forEach((hranilica, index) => {
            let fill = fillDiv.querySelectorAll(".hranilica");
            if (hranilica.trenutniKapacitet > 0) {
              hranilica.hrana.forEach((hrana, index) => {
                let hranaPojedena = Math.round(
                  Math.random() * hrana.trenutnaKolicina
                );
                hrana.trenutnaKolicina -= hranaPojedena;
                if (hrana.trenutnaKolicina == 0) {
                  hranilica.hrana.splice(index, 1);
                }
                hranilica.trenutniKapacitet -= hranaPojedena;
              });
            }
            console.log(fillDiv, fill, index);
            hranilica.CrtajHranu(fill[index]);
          });
        }
      });
      //treba da nacrta sve opet kako treba
    };
    div.appendChild(dugme);
    host.appendChild(div);
  }

  // CrtajFrmGrad(host) {
  //   let div = document.createElement("div");
  //   div.classList.add("frmGrad");
  //   host.appendChild(div);
  //   let naslov = document.createElement("h4");
  //   naslov.innerHTML = "Dodaj grad";
  //   div.appendChild(naslov);
  //   let labela = document.createElement("label");
  //   labela.innerHTML = "Naziv grada ";
  //   div.appendChild(labela);
  //   let input = document.createElement("input");
  //   div.appendChild(input);
  //   let dugme = document.createElement("button");
  //   dugme.innerHTML = "Dodaj novi grad";
  //   dugme.classList.add("btnDodajGrad");
  //   div.appendChild(dugme);
  // }

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
    input.classList.add("nazivLokacijaNova");
    div.appendChild(input);
    labela = document.createElement("label");
    labela.innerHTML = "Max hranilica ";
    div.appendChild(labela);
    input = document.createElement("input");
    input.classList.add("kapLokacijaNova");
    input.setAttribute("type", "number");
    div.appendChild(input);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj novu lokaciju";
    dugme.classList.add("btnDodajLokaciju");
    dugme.onclick = () => {
      console.log("KLIK NA NOVU LOKACIJU");
      let naziv = div.querySelector(".nazivLokacijaNova").value;
      naziv = naziv.replace(/\s+/g, "");
      const kapacitet = parseInt(div.querySelector(".kapLokacijaNova").value);
      console.log(`Naziv lokacije ${naziv}, Kapacitet lokacije ${kapacitet}`);
      if (naziv && kapacitet) {
        const novaLokacija = new Lokacija(0, kapacitet, naziv);
        this.DodajLokaciju(novaLokacija);
        let div = document.createElement("div");
        div.classList.add("lokacija");
        div.classList.add(naziv);
        let divZaNaslov = document.createElement("div");
        let naslov = document.createElement("h3");
        naslov.innerHTML = naziv;
        divZaNaslov.appendChild(naslov);
        div.appendChild(divZaNaslov);
        let divZaHranilice = document.createElement("div");
        divZaHranilice.classList.add("divZaHranilice");
        div.appendChild(divZaHranilice);
        const divZaCrtanje = document.querySelector(".grad");
        divZaCrtanje.appendChild(div);

        const formaZaCrtanje = document.querySelector(".forma");
        formaZaCrtanje.innerHTML = "";
        this.OsveziFormu(formaZaCrtanje);
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
    input.classList.add("kapHranilicaNova");
    div.appendChild(input);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj novu hranilicu";
    dugme.classList.add("btnDodajHranilicu");
    dugme.onclick = () => {
      console.log("KLIK NA DODAJ HRANILICU");
      const kapacitet = parseInt(div.querySelector(".kapHranilicaNova").value);
      const lokacijaNaziv = select.value;
      console.log(
        `Kapacitet hranilice ${kapacitet}, selektovana lokacija ${lokacijaNaziv}`
      );
      const objLokacija = this.lokacije.find(
        (lokacija) => lokacija.nazivLokacije === lokacijaNaziv
      );

      const lokacijaDiv = document.querySelector(`.${lokacijaNaziv}`);

      if (objLokacija && kapacitet > 0) {
        console.log("DODAJEM HRANILICU");
        const hranilica = new Hranilica(0, kapacitet);
        if (objLokacija.DodajHranilicu(hranilica)) {
          let div = document.createElement("div");
          div.classList.add("hranilica");
          div.innerHTML = "Prazno " + kapacitet;
          const divZaHranilice = lokacijaDiv.querySelector(".divZaHranilice");
          divZaHranilice.appendChild(div);
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
    select.classList.add("selectLokacija");
    div.appendChild(select);
    let option;
    option = document.createElement("option");
    option.text = "";
    option.value = -1;
    select.appendChild(option);
    this.lokacije.forEach((lokacija) => {
      option = document.createElement("option");
      option.text = lokacija.nazivLokacije;
      option.value = lokacija.nazivLokacije;
      select.appendChild(option);
    });
    labela = document.createElement("lablel");
    labela.innerHTML = "Tip hrane ";
    div.appendChild(labela);
    select = document.createElement("select");
    select.classList.add("selectTipHrane");
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
    input.classList.add("kolicinaHrane");
    div.appendChild(input);

    labela = document.createElement("label");
    labela.innerHTML = "Hranilica po redu ";
    div.appendChild(labela);
    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("indexHranilice");
    div.appendChild(input);

    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj novu hranu";
    dugme.classList.add("btnDodajHranu");
    dugme.onclick = () => {
      console.log("KLIK NA DODAJ HRANU");
      const lokacijaNaziv = div.querySelector(".selectLokacija").value;
      const tipHrane = div.querySelector(".selectTipHrane").value;
      const kolicina = parseInt(div.querySelector(".kolicinaHrane").value);
      const indx = div.querySelector(".indexHranilice").value;
      const novaHrana = new Hrana(tipHrane, kolicina);
      const objLokacija = this.lokacije.find(
        (lokacija) => lokacija.nazivLokacije === lokacijaNaziv
      );
      if (objLokacija.hranilice.length > indx) {
        const objHranilica = objLokacija.hranilice[indx];
        console.log(objHranilica);
        const fillParentDiv = document.querySelector(`.${lokacijaNaziv}`);
        const fill = fillParentDiv.querySelectorAll(".hranilica");
        if (objHranilica.DodajHranu(novaHrana, fill[indx])) {
        } else {
          alert("Nema dovoljno mesta u hranilici, izaberite drugu");
        }
      } else alert("Ne postoji hranilica sa ovim indexom");
    };
    div.appendChild(dugme);
  }

  CrtajLokacije(host) {
    this.miniContainer = document.createElement("div");
    this.miniContainer.classList.add("grad");
    host.appendChild(this.miniContainer);
    let nazivGrada = document.createElement("h2");
    nazivGrada.innerHTML = `Grad ${this.naziv}`;
    this.miniContainer.appendChild(nazivGrada);
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
