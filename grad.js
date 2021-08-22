import { Hrana } from "./hrana.js";
import { Hranilica } from "./hranilica.js";
import { Lokacija } from "./lokacija.js";

export class Grad {
  constructor(id, naziv) {
    (this.id = id), (this.lokacije = []);
    this.naziv = naziv;
    this.miniContainer = null;
  }

  DodajLokaciju(lokacija) {
    this.lokacije.push(lokacija);
  }

  CrtajFormu(host) {
    this.miniContainer = document.createElement("div");
    this.miniContainer.classList.add("forma");
    this.miniContainer.classList.add(`frm${this.naziv.toLowerCase()}`);
    host.appendChild(this.miniContainer);
    this.CrtajFrmLokacija(this.miniContainer);
    this.CrtajFrmHranilica(this.miniContainer);
    this.CrtajFrmHrana(this.miniContainer);
    this.CrtajDugmeJedi(this.miniContainer);
    this.CrtajDugmeObrisi(this.miniContainer);
  }

  OsveziFormu(host) {
    this.CrtajFrmLokacija(host);
    this.CrtajFrmHranilica(host);
    this.CrtajFrmHrana(host);
    this.CrtajDugmeJedi(host);
    this.CrtajDugmeObrisi(host);
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
      fetch(`https://localhost:5001/Main/PsiJedu/${this.id}`, {
        method: "PUT",
      }).then((res) => {
        if (res.status == 200) {
            document.body.innerHTML = "";
            fetch(`https://localhost:5001/Main/GetAllGradovi`)
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
        }
      });
    };
    div.appendChild(dugme);
    host.appendChild(div);
  }

  CrtajDugmeObrisi(host) {
    const div = document.createElement("div");
    div.classList.add("dugmeObrisiGrad");
    const labela = document.createElement("lablel");
    labela.innerHTML = "Obrisi ovaj grad";
    div.appendChild(labela);
    const dugme = document.createElement("button");
    dugme.innerHTML = "Obrisi";
    dugme.onclick = () => {
      fetch(`https://localhost:5001/Main/IzbrisiGrad/${this.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          //pozivamo fetch za gradove
          document.body.innerHTML = "";
          fetch(`https://localhost:5001/Main/GetAllGradovi`)
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
        }
      });
    };
    div.appendChild(dugme);
    host.appendChild(div);
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
      console.log(kapacitet);
      console.log(`Naziv lokacije ${naziv}, Kapacitet lokacije ${kapacitet}`);
      if (naziv && kapacitet) {
        let data = {
          maxKapacitet: kapacitet,
          trenutniKapacitet: 0,
          nazivLokacije: naziv,
        };
        console.log(data);
        console.log(this.id, this.naziv);
        fetch(`https://localhost:5001/Lokacija/UpisiLokaciju/${this.id}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.status == 200) {
              console.log("Request complete! response:", res);
              res.json().then((data) => {
                console.log(data);
                const novaLokacija = new Lokacija(data.id, 0, kapacitet, naziv);
                console.log(novaLokacija);
                this.DodajLokaciju(novaLokacija);
                let div = document.createElement("div");
                div.classList.add("lokacija");
                div.classList.add(naziv);
                let divZaNaslov = document.createElement("div");
                let naslov = document.createElement("h3");
                naslov.classList.add("nazivLokacije");
                naslov.innerHTML = `${naziv} 0/${kapacitet}`;
                divZaNaslov.appendChild(naslov);
                div.appendChild(divZaNaslov);
                let divZaHranilice = document.createElement("div");
                divZaHranilice.classList.add("divZaHranilice");
                div.appendChild(divZaHranilice);
                console.log(this.naziv.toLowerCase());
                const divZaCrtanje = document.querySelector(
                  `.${this.naziv.toLowerCase()}`
                );
                divZaCrtanje.appendChild(div);

                const formaZaCrtanje = document.querySelector(
                  `.frm${this.naziv.toLowerCase()}`
                );
                formaZaCrtanje.innerHTML = "";
                this.OsveziFormu(formaZaCrtanje);
              });
            }
          })
          .catch((er) => console.log(er));
      }
    };
    console.log(this.lokacije);
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
      const kapacitet = parseInt(div.querySelector(".kapHranilicaNova").value);
      const lokacijaNaziv = select.value;
      console.log(this.lokacije);
      const objLokacija = this.lokacije.find(
        (lokacija) => lokacija.nazivLokacije === lokacijaNaziv
      );

      const divGrad = document.querySelector(`.${this.naziv.toLowerCase()}`);
      const lokacijaDiv = divGrad.querySelector(`.${lokacijaNaziv}`);
      const nazivLokacije = lokacijaDiv.querySelector(".nazivLokacije");
      if (objLokacija && kapacitet > 0) {
        let data = { maxKapacitet: kapacitet, trenutniKapacitet: 0 };

        fetch(
          `https://localhost:5001/Hranilica/UpisiHranilicu/${objLokacija.id}`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          console.log("Request complete! response:", res);
          if (res.status==200) {
            res.json().then((dataH) => {
              console.log("Uspesno!");
              const hranilica = new Hranilica(dataH.id, 0, kapacitet);
              console.log(hranilica);
                objLokacija.DodajHranilicu(hranilica)
                nazivLokacije.innerHTML = "";
                nazivLokacije.innerHTML = `${objLokacija.nazivLokacije} ${objLokacija.trenutniKapacitet}/${objLokacija.maxKapacitet}`;
                let div = document.createElement("div");
                div.classList.add("hranilica");
                div.innerHTML = "Prazno " + kapacitet;
                const divZaHranilice =
                  lokacijaDiv.querySelector(".divZaHranilice");
                divZaHranilice.appendChild(div);
            });
          }
          else if(res.status == 400){
            alert("Nema mesta u ovoj lokaciji");
          }
        });
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
      const novaHrana = new Hrana(0, tipHrane, kolicina);
      const objLokacija = this.lokacije.find(
        (lokacija) => lokacija.nazivLokacije === lokacijaNaziv
      );
      if (objLokacija.hranilice.length > indx) {
        const objHranilica = objLokacija.hranilice[indx];
        const divGrad = document.querySelector(`.${this.naziv.toLowerCase()}`);
        const fillParentDiv = divGrad.querySelector(`.${lokacijaNaziv}`);
        const fill = fillParentDiv.querySelectorAll(".hranilica");
        console.log(fill[indx], novaHrana);
        if (objHranilica.DodajICrtajHranu(novaHrana, fill[indx])) {
          let data = { tip: tipHrane, trenutnaKolicina: kolicina };
          console.log(data);
          console.log(objHranilica.id);
          fetch(`https://localhost:5001/Hrana/UpisiHranu/${objHranilica.id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              console.log("Request complete! response:", res);
            })
            .catch((er) => console.log(er));
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
    this.miniContainer.classList.add(this.naziv.toLowerCase());
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
