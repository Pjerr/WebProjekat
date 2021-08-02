//BONUS - probaj da imprelentiras da izbacujes odredjenu kolicinu neke hrane
export class Hranilica {
  constructor(trenutniKapacitet, maxKapacitet) {
    this.hrana = [];
    this.maxKapacitet = maxKapacitet;
    this.trenutniKapacitet = trenutniKapacitet;
    this.miniContainer = null;
  }

  //nekako setujemo height na nesto a posle u procentima od toga kaliramo punjenja
  CrtajHranilicu(host) {
    this.miniContainer = document.createElement("div");
    this.miniContainer.classList.add("hranilica");
    this.miniContainer.innerHTML = "Prazno " + this.maxKapacitet;
    host.appendChild(this.miniContainer);
  }

  DodajHranu(hranaZaDodavanje, host) {
    console.log(hranaZaDodavanje);
    const hranaUNizu = this.hrana.find(
      (hrana) => hranaZaDodavanje.tip === hrana.tip
    );
    console.log("HRANA " + hranaUNizu);
    //ako postoji vec ta hrana u hranilici samo dodamo jos kolicinu ako ima mesta
    if (hranaUNizu) {
      if (
        this.trenutniKapacitet + hranaZaDodavanje.trenutnaKolicina <=
        this.maxKapacitet
      ) {
        hranaUNizu.trenutnaKolicina += hranaZaDodavanje.trenutnaKolicina;
        this.trenutniKapacitet += hranaZaDodavanje.trenutnaKolicina;
        this.CrtajHranu(host);
        console.log(this.hrana);
        return true;
      } else return false;
    }
    //ne postoji hrana u nizu
    else {
      if (
        this.trenutniKapacitet + hranaZaDodavanje.trenutnaKolicina <=
        this.maxKapacitet
      ) {
        this.hrana.push(hranaZaDodavanje);
        this.trenutniKapacitet += hranaZaDodavanje.trenutnaKolicina;
        this.CrtajHranu(host);
        console.log(this.hrana);
        return true;
      } else return false;
    }
  }

  CrtajHranu(host) {
    host.innerHTML = "";
    const h = this.maxKapacitet;
    let x = 0;
    let l;
    this.hrana.forEach((hrana) => {
      x = hrana.trenutnaKolicina;
      this.miniContainer = document.createElement("div");
      if (hrana.tip === "Granule") {
        this.miniContainer.classList.add("fillGranule");
        this.miniContainer.innerHTML = "Granule " + hrana.trenutnaKolicina;
      } else {
        this.miniContainer.classList.add("fillMeso");
        this.miniContainer.innerHTML = "Meso " + hrana.trenutnaKolicina;
      }
      l = (100 * x) / h;
      console.log("fillWidth " + l);
      this.miniContainer.style.height = `${l}%`;

      host.appendChild(this.miniContainer);
    });
    if (this.maxKapacitet - this.trenutniKapacitet > 0) {
      this.miniContainer = document.createElement("div");
      this.miniContainer.innerHTML =
        "Prazno " + (this.maxKapacitet - this.trenutniKapacitet);
      l = (100 * (this.maxKapacitet - this.trenutniKapacitet)) / h;
      this.miniContainer.style.height = `${l}%`;
      host.appendChild(this.miniContainer);
    }
  }
}
