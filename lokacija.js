export class Lokacija{
    constructor(trenutniKapacitet, maxKapacitet, nazivLokacije){
        this.trenutniKapacitet = trenutniKapacitet;
        this.maxKapacitet = maxKapacitet;
        this.nazivLokacije = nazivLokacije;
        this.hranilice = [];
        this.miniContainer = null;
    }

    CrtajLokaciju(host){    
        this.miniContainer = document.createElement("div");
        this.miniContainer.classList.add("lokacija");
        host.appendChild(this.miniContainer);

        const naslov = document.createElement("h3");
        naslov.classList.add("nazivLokacije");
        naslov.innerHTML = this.nazivLokacije;
        this.miniContainer.appendChild(naslov);
        this.hranilice.forEach((hranilica)=>{
            hranilica.CrtajHranilicu(this.miniContainer);
        })
    }

    DodajHranilicu(hranilica){
        if(this.trenutniKapacitet + 1 <= this.maxKapacitet)
        {
            this.hranilice.push(hranilica);
        }
    }

    //??
    AzurirajLokaciju(){
        
    }
}