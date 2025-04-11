let discovermelho = document.querySelector(".discovermelho");
let discoverlaranja = document.querySelector(".discolaranja");
let discoveramarelo = document.querySelector(".discoamarelo");
let discoververde = document.querySelector(".discoverde");
let discoverazul = document.querySelector(".discoazul");
let arrastar = false;
let offsetX, offsetY;

function tornarArrastavel(elemento) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;

  elemento.addEventListener("mousedown", function(e) {
      arrastando = true;
      offsetX = e.clientX - elemento.offsetLeft;
      offsetY = e.clientY - elemento.offsetTop;
      elemento.style.zIndex = 1000; 
  });

  document.addEventListener("mousemove", function(e) {
      if (arrastando) {
          elemento.style.left = (e.clientX - offsetX) + "px";
          elemento.style.top = (e.clientY - offsetY) + "px";
      }
  });

  document.addEventListener("mouseup", function() {
      arrastando = false;
      elemento.style.zIndex = "";
  });
}
tornarArrastavel(discovermelho);
tornarArrastavel(discolaranja);
tornarArrastavel(discoamarelo);
tornarArrastavel(discoverde);
tornarArrastavel(discoazul);