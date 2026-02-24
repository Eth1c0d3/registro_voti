/* ===========================
   REGISTRO VOTI – LOCALSTORAGE
=========================== */

// Recupera dati salvati
let voti = JSON.parse(localStorage.getItem("voti")) || [];
let assenze = JSON.parse(localStorage.getItem("assenze")) || [];

/* ===========================
   FUNZIONI VOTI
=========================== */

function aggiungiVoto() {
    const materia = document.getElementById("materia").value.trim();
    const voto = parseFloat(document.getElementById("voto").value);

    if (!materia || isNaN(voto)) {
        alert("Inserisci una materia e un voto valido");
        return;
    }

    voti.push({ materia, voto });
    salvaVoti();
    aggiornaTabellaVoti();
    aggiornaMedia();

    document.getElementById("materia").value = "";
    document.getElementById("voto").value = "";
}

function salvaVoti() {
    localStorage.setItem("voti", JSON.stringify(voti));
}

function aggiornaTabellaVoti() {
    const tbody = document.querySelector("#tabella-voti tbody");
    tbody.innerHTML = "";

    voti.forEach((item, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.materia}</td>
            <td>${item.voto}</td>
            <td>
                <button class="delete-btn" onclick="eliminaVoto(${index})">
                    <img src="assets/icons/trash.svg" class="icon">
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function eliminaVoto(index) {
    voti.splice(index, 1);
    salvaVoti();
    aggiornaTabellaVoti();
    aggiornaMedia();
}

function aggiornaMedia() {
    if (voti.length === 0) {
        document.getElementById("media").textContent = "0.00";
        return;
    }

    const somma = voti.reduce((acc, item) => acc + item.voto, 0);
    const media = somma / voti.length;

    document.getElementById("media").textContent = media.toFixed(2);
}

/* ===========================
   FUNZIONI ASSENZE
=========================== */

function aggiungiAssenza() {
    const giorno = document.getElementById("giorno").value;
    const ore = parseFloat(document.getElementById("ore").value);

    if (!giorno || isNaN(ore)) {
        alert("Inserisci una data e un numero di ore valido");
        return;
    }

    assenze.push({ giorno, ore });
    salvaAssenze();
    aggiornaTabellaAssenze();
    aggiornaTotaleAssenze();

    document.getElementById("giorno").value = "";
    document.getElementById("ore").value = "";
}

function salvaAssenze() {
    localStorage.setItem("assenze", JSON.stringify(assenze));
}

function aggiornaTabellaAssenze() {
    const tbody = document.querySelector("#tabella-assenze tbody");
    tbody.innerHTML = "";

    assenze.forEach((item, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.giorno}</td>
            <td>${item.ore}</td>
            <td>
                <button class="delete-btn" onclick="eliminaAssenza(${index})">
                    <img src="assets/icons/trash.svg" class="icon">
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function eliminaAssenza(index) {
    assenze.splice(index, 1);
    salvaAssenze();
    aggiornaTabellaAssenze();
    aggiornaTotaleAssenze();
}

function aggiornaTotaleAssenze() {
    const totale = assenze.reduce((acc, item) => acc + item.ore, 0);
    document.getElementById("totale-assenze").textContent = totale;
}

/* ===========================
   INIZIALIZZAZIONE
=========================== */

aggiornaTabellaVoti();
aggiornaMedia();
aggiornaTabellaAssenze();
aggiornaTotaleAssenze();
