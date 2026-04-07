document.addEventListener("DOMContentLoaded", () => {

const items = [
    { name: "Botella plástica", recyclable: true, info: "El plástico PET es reciclable", img: "img/botella.png" },
    { name: "Vidrio", recyclable: true, info: "El vidrio es 100% reciclable", img: "img/vidrio.png" },
    { name: "Lata de aluminio", recyclable: true, info: "El aluminio se recicla infinitamente", img: "img/lata.png" },
    { name: "Papel limpio", recyclable: true, info: "El papel limpio se recicla", img: "img/papel.png" },
    { name: "Cartón", recyclable: true, info: "El cartón seco se recicla", img: "img/carton.png" },
    { name: "Tetra Pak", recyclable: true, info: "Requiere tratamiento especial", img: "img/tetrapak.png" },

    { name: "Servilleta usada", recyclable: false, info: "El papel sucio no se recicla", img: "img/servilleta.png" },
    { name: "Caja de pizza sucia", recyclable: false, info: "La grasa contamina", img: "img/pizza.png" },
    { name: "Cáscara de banana", recyclable: false, info: "Va a compost", img: "img/banana.png" },
    { name: "Telgopor sucio", recyclable: false, info: "No reciclable", img: "img/telgopor.png" },

    { name: "Caja de pizza limpia", recyclable: true, info: "Si está limpia se recicla", img: "img/pizza.png" },
    { name: "Botella con líquido", recyclable: false, info: "Debe vaciarse", img: "img/botella.png" },
    { name: "Cartón mojado", recyclable: false, info: "Pierde calidad", img: "img/carton.png" },
    { name: "Lata aplastada", recyclable: true, info: "Sigue siendo reciclable", img: "img/lata.png" }
];

let score = 0;
let best = localStorage.getItem("bestScore") || 0;
let current;
let history = [];

document.getElementById("best").textContent = best;

window.startGame = function() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    newItem();
};

window.answer = function(choice) {
    if (choice === current.recyclable) {
        score++;
        document.getElementById("score").textContent = score;

        document.getElementById("info").textContent = "✅ " + current.info;

        correctSound.currentTime = 0;
        correctSound.play();
        particles();

        setTimeout(newItem, 700);

    } else {
        wrongSound.currentTime = 0;
        wrongSound.play();

        if (navigator.vibrate) navigator.vibrate([200,100,200]);

        document.getElementById("info").textContent = "❌ " + current.info;

        setTimeout(() => {
            if (score > best) {
                localStorage.setItem("bestScore", score);
            }
            alert("Game Over 💀 Puntaje: " + score);
            location.reload();
        }, 1000);
    }
};

function newItem() {
    let available = items.filter(i => !history.includes(i));

    if (available.length === 0) {
        history = [];
        available = items;
    }

    current = available[Math.floor(Math.random() * available.length)];

    history.push(current);
    if (history.length > 3) history.shift();

    document.getElementById("item").textContent = current.name;
    document.getElementById("image").src = current.img;
    document.getElementById("info").textContent = "";
}

function particles() {
    for (let i = 0; i < 15; i++) {
        let p = document.createElement("div");
        p.className = "particle";

        p.style.left = "50%";
        p.style.top = "50%";

        p.style.setProperty("--x", (Math.random()*200-100)+"px");
        p.style.setProperty("--y", (Math.random()*200-100)+"px");

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

});
