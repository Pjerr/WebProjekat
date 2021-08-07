export class Lokacija{
    constructor(id, trenutniKapacitet, maxKapacitet, nazivLokacije){
        this.id = id;
        this.trenutniKapacitet = trenutniKapacitet;
        this.maxKapacitet = maxKapacitet;
        this.nazivLokacije = nazivLokacije;
        this.hranilice = [];
        this.miniContainer = null;
    }

    CrtajLokaciju(host){  
        this.miniContainer = document.createElement("div");
        this.miniContainer.classList.add(this.nazivLokacije);
        this.miniContainer.classList.add("lokacija");
        host.appendChild(this.miniContainer);

        let div = document.createElement("div");
        const naslov = document.createElement("h3");
        naslov.classList.add("nazivLokacije");
        naslov.innerHTML = this.nazivLokacije;
        div.appendChild(naslov);
        this.miniContainer.appendChild(div);
        div = document.createElement("div");
        div.classList.add("divZaHranilice");
        this.miniContainer.appendChild(div);
        this.hranilice.forEach((hranilica)=>{
            hranilica.CrtajHranilicu(div);
        })
    }

    DodajHranilicu(hranilica){
        if(this.trenutniKapacitet + 1 <= this.maxKapacitet)
        {
            this.trenutniKapacitet++;
            this.hranilice.push(hranilica);
            return true;
        }
        else return false;
    }

    OsveziLokaciju(host){
        host.innerHTML = "";
        this.hranilice.forEach((hranilica)=>{
            hranilica.CrtajHranilicu(host);
        })
    }
}