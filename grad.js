export class Grad{
    constructor(naziv){
        this.lokacije = [];
        this.naziv = naziv
    }

    DodajLokaciju(lokacija){
        this.lokacije.push(lokacija);
    }

    CrtajFormu(host){

    }

    CrtajLokacije(host){
        this.lokacije.forEach((lokacija)=>{
            lokacija.CrtajLokaciju(host);
        })
    }

    CrtajSve(host){
        // this.CrtajFormu(host);
        this.CrtajLokacije(host);
    }
}