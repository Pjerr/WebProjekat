//BONUS - probaj da imprelentiras da izbacujes odredjenu kolicinu neke hrane
export class Hranilica{
    constructor(trenutniKapacitet, maxKapacitet){
        this.hrana=[];
        this.maxKapacitet = maxKapacitet;
        this.trenutniKapacitet = trenutniKapacitet;
        this.miniContainer = null;
    }

    CrtajHranilicu(host){
        this.miniContainer = document.createElement("div");
        this.miniContainer.classList.add("hranilica");
        this.miniContainer.innerHTML = "Prazno " + this.maxKapacitet;
        host.appendChild(this.miniContainer);
    }

    //mora da se uzme neka random boja, da se oznaci deo koji je zauzela ova hrana
    DodajHranu(hrana, kolicina){
        console.log("USO SAM OVDE");
        if(this.trenutniKapacitet + kolicina <= this.maxKapacitet)
        {
            console.log("USO SAM U IF")
            this.hrana.push(hrana);
            console.log(this.hrana);
        }
        else new Exception("Nema mesta u hranilici");
    }

}