export class Grad{
    constructor(naziv){
        this.lokacije = [];
        this.naziv = naziv;
        this.miniContainer = null;
    }

    DodajLokaciju(lokacija){
        this.lokacije.push(lokacija);
    }

    CrtajFormu(host){
        this.miniContainer = document.createElement("div");
        this.miniContainer.classList.add("forma");
        host.appendChild(this.miniContainer);
        // this.CrtajFrmGrad(this.miniContainer);
        this.CrtajFrmLokacija(this.miniContainer);
        this.CrtajFrmHranilica(this.miniContainer);
        this.CrtajFrmHrana(this.miniContainer);
    }

    CrtajFrmGrad(host){
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

    CrtajFrmLokacija(host){
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
        input.id="nazivLokacijaNova"
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
        dugme.onclick = (()=>{
            console.log("KLIK NA NOVU LOKACIJU");
            const naziv = div.querySelector("#nazivLokacijaNova").value;
            const kapacitet = div.querySelector("#kapLokacijaNova").value;
            console.log(`Naziv lokacije ${naziv}, Kapacitet lokacije ${kapacitet}`);
        })
        div.appendChild(dugme);
    }

    CrtajFrmHranilica(host){
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
        this.lokacije.forEach((lokacija, index)=>{
            option = document.createElement("option");
            option.text = lokacija.nazivLokacije;
            option.value = index;
            select.appendChild(option);
        })

        labela = document.createElement("label");
        labela.innerHTML = "Max kapacitet ";
        div.appendChild(labela);
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.id = "kapHranilicaNova";
        div.appendChild(input);
        let dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj novu hranilicu";
        dugme.classList.add("btnDodajHranilicu");
        dugme.onclick = (()=>{
            console.log("KLIK NA DODAJ HRANILICU");
            const kapacitet = div.querySelector("#kapHranilicaNova").value;
            const lokacija = select.value;
            console.log(`Kapacitet hranilice ${kapacitet}, selektovana lokacija ${lokacija}`);
        })
        div.appendChild(dugme);
    }

    CrtajFrmHrana(host){
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
        select.id="selectLokacija";
        div.appendChild(select);
        let option;
        option = document.createElement("option");
        option.text = "";
        option.value = -1;
        select.appendChild(option);
        this.lokacije.forEach((lokacija, index)=>{
            option = document.createElement("option");
            option.text = lokacija.nazivLokacije;
            option.value = index;
            select.appendChild(option);
        })
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
        option.value = 0;
        option.text = "Granule";
        select.appendChild(option);
        option = document.createElement("option");
        option.value = 1;
        option.text = "Meso";
        select.appendChild(option);
        labela = document.createElement("label");
        labela.innerHTML = "Kolicina ";
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
        input.id = "indexHranilice"
        div.appendChild(input);

        let dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj novu hranu";
        dugme.classList.add("btnDodajHranu");
        dugme.onclick=(()=>{
            console.log("KLIK NA DODAJ HRANU");
            const lokacija = div.querySelector("#selectLokacija").value;
            const tipHrane = div.querySelector("#selectTipHrane").value;
            const kolicina = div.querySelector("#kolicinaHrane").value;
            const indx = div.querySelector("#indexHranilice").value;
            console.log(`selektovana lokacija ${lokacija}, tip hrane ${tipHrane}, kolicina ${kolicina}, hranilica po redu: ${indx}`);
        })
        div.appendChild(dugme);
    }

    CrtajLokacije(host){
        this.miniContainer = document.createElement("div");
        this.miniContainer.classList.add("grad");
        host.appendChild(this.miniContainer);
        this.lokacije.forEach((lokacija)=>{
            lokacija.CrtajLokaciju(this.miniContainer);
        })
    }

    CrtajSve(host){
        let div = document.createElement("div");
        div.classList.add("container");
        host.appendChild(div);

        this.CrtajFormu(div);
        this.CrtajLokacije(div);
    }
}