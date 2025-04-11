let discovermelho = document.getElementById("discovermelho");
let discoverlaranja = document.getElementById("discoverlaranja");
let discoveramarelo = document.getElementById("discoveramarelo");
let discoververde = document.getElementById("discoververde");
let discoverazul = document.getElementById("discoverazul");
let arrastar = false;
let offsetX, offsetY;

addEventListener("mousedown", function (e) {
  let arrastar = true;
  offsetX = e.clientX - elemento.offsetLeft;
  offsetY = e.clientY - elemento.offsetTop;
  elemento.style.cursor = "grabbing";
});

document.addEventListener("mousemove", function (e) {

}

