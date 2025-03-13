const level = new URLSearchParams(window.location.search).get("level");
const contenedor = document.querySelector(".contenedor");
const contador = document.querySelector(".contador");
const faltantes = document.querySelector(".faltantes");
const puntaje = document.querySelector(".puntaje");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close");

let cuenta_regresiva = 4;
let con = 0;
let con_bocchis_total = 0;
let con_bocchis_actual = 0;

let intervalo;
let intervalo_limite;
let intervalo_diferencia;
let intervalo_cambio;
let limite_bocchis;

if(level == 1){
    intervalo = 1500;
    intervalo_limite = 750;
    intervalo_diferencia = 100;
    intervalo_cambio = 15;
    limite_bocchis = 15;
} else if(level == 2){
    intervalo = 1250;
    intervalo_limite = 600;
    intervalo_diferencia = 150;
    intervalo_cambio = 10;
    limite_bocchis = 10;
} else{
    intervalo = 1000;
    intervalo_limite = 450;
    intervalo_diferencia = 200;
    intervalo_cambio = 5;
    limite_bocchis = 5;
}

faltantes.textContent = '0 : ' + limite_bocchis;

document.addEventListener("click", function(e) {
    let circle = document.createElement("div");
    circle.classList.add("click-effect");

    circle.style.left = `${e.clientX - 10}px`;
    circle.style.top = `${e.clientY - 10}px`;

    document.body.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 500);
});

const interval = setInterval(() => {
    cuenta_regresiva--;
    contenedor.textContent = cuenta_regresiva;
    if (cuenta_regresiva === 0) {
        clearInterval(interval);
        contenedor.textContent = '';
        juego();
    }
}, 1000);

function juego(){
    con_bocchis_actual++;
    faltantes.textContent = con_bocchis_actual + ' : ' + limite_bocchis;
    contenedor.appendChild(generarBocchi());

    if (con_bocchis_total % intervalo_cambio === 0 && intervalo > intervalo_limite) 
        intervalo -= intervalo_diferencia;

    con_bocchis_total++;

    con_bocchis_actual <= limite_bocchis ?
        setTimeout(juego, intervalo) :
        terminarjuego();
}

function generarBocchi() {
    const maxX = contenedor.clientWidth - 100;
    const maxY = contenedor.clientHeight - 100;

    const bocchi = document.createElement("img");
    bocchi.src = "Img/bocchi-unscreen.gif";
    bocchi.classList.add("bocchi");
    bocchi.style.left = Math.random() * maxX + "px";
    bocchi.style.top = Math.random() * maxY + "px";
    bocchi.addEventListener('click', () =>{
        con++;
        con_bocchis_actual--;
        faltantes.textContent = con_bocchis_actual + ' : ' + limite_bocchis;
        
        contador.innerHTML = `Bocchis: ${con}`;
        bocchi.src = "Img/prueba.png";

        setTimeout(() => {
            bocchi.remove();
        }, 300);
    })

    return bocchi;
}

function terminarjuego(){
    puntaje.textContent = 'Bocchis aplastadas: ' + con;
    modal.style.display = "flex";

    closeModal.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}