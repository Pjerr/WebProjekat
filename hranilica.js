export class Hranilica {
  constructor(id ,trenutniKapacitet, maxKapacitet) {
    this.id = id;
    this.hrana = [];
    this.maxKapacitet = maxKapacitet;
    this.trenutniKapacitet = trenutniKapacitet;
    this.miniContainer = null;
    this.pomContainer = null;
  }

  CrtajHranilicu(host) {
    this.miniContainer = document.createElement("div");
    this.miniContainer.classList.add("hranilica");
    if(this.trenutniKapacitet == 0)
    {
      this.miniContainer.innerHTML = "Prazno " + this.maxKapacitet;
      host.appendChild(this.miniContainer);
    }
    else {
      this.CrtajHranu(this.miniContainer);
      host.appendChild(this.miniContainer);
    }
  }

  DodajHranu(hranaZaDodavanje){
    const hranaUNizu = this.hrana.find(
      (hrana) => hranaZaDodavanje.tip === hrana.tip
    );
    if (hranaUNizu) {
      if (
        this.trenutniKapacitet + hranaZaDodavanje.trenutnaKolicina <=
        this.maxKapacitet
      ) {
        hranaUNizu.trenutnaKolicina += hranaZaDodavanje.trenutnaKolicina;
        this.trenutniKapacitet += hranaZaDodavanje.trenutnaKolicina;
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
        return true;
      } else return false;
    }
  }

  DodajICrtajHranu(hranaZaDodavanje, host) {
    const hranaUNizu = this.hrana.find(
      (hrana) => hranaZaDodavanje.tip === hrana.tip
    );
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
    console.log(this.hrana);
    host.innerHTML = "";
    const h = this.maxKapacitet;
    let x = 0;
    let l;
    this.hrana.forEach((hrana) => {
      x = hrana.trenutnaKolicina;
      this.pomContainer = document.createElement("div");
      if (hrana.tip === "Granule") {
        this.pomContainer.classList.add("fillGranule");
        this.pomContainer.innerHTML = "Granule " + hrana.trenutnaKolicina;
      } else {
        this.pomContainer.classList.add("fillMeso");
        this.pomContainer.innerHTML = "Meso " + hrana.trenutnaKolicina;
      }
      l = (100 * x) / h;
      this.pomContainer.style.height = `${l}%`;
      host.appendChild(this.pomContainer);
    });
    if (this.maxKapacitet - this.trenutniKapacitet > 0) {
      this.pomContainer = document.createElement("div");
      this.pomContainer.innerHTML =
        "Prazno " + (this.maxKapacitet - this.trenutniKapacitet);
      l = (100 * (this.maxKapacitet - this.trenutniKapacitet)) / h;
      this.pomContainer.style.height = `${l}%`;
      host.appendChild(this.pomContainer);
    }
    this.pomContainer = null;
  }

  AzurirajHranu(host){
    this.hrana.forEach((hrana)=>{
      hrana.CrtajHranu(host);
    })
  }
}
