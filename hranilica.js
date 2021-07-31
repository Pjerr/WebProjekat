//BONUS - probaj da imprelentiras da izbacujes odredjenu kolicinu neke hrane
export class Hranilica{
    constructor(trenutniKapacitet, maxKapacitet){
        this.hrana=[];
        this.maxKapacitet = maxKapacitet;
        this.trenutniKapacitet = trenutniKapacitet;
        this.miniContainer = null;
        this.boje = ["#c2746e", "#70b7c2"]; //0->meso, 1->granule
    }

    CrtajHranilicu(host){
        this.miniContainer = document.createElement("div");
        this.miniContainer.classList.add("hranilica");
        this.miniContainer.innerHTML = "Prazno " + this.maxKapacitet;
        host.appendChild(this.miniContainer);
    }

    //mora da se uzme neka random boja, da se oznaci deo koji je zauzela ova hrana
    DodajHranu(hrana, kolicina){
        console.log(hrana, kolicina);
        if(this.trenutniKapacitet + kolicina <= this.maxKapacitet)
        {
            if(hrana.tip=="Meso"){
                console.log("dodajem meso");
            }
            else{
                console.log("dodajem granule");
            }
            this.trenutniKapacitet += kolicina;
            this.hrana.push(hrana);
        }
        else {
            console.log("NEMA MESTA");
            throw new Exception("Nema mesta u hranilici");
        }
        console.log(this.hrana);
    }

}