let discovermelho = document.querySelector(".discovermelho");
let discolaranja = document.querySelector(".discolaranja");
let discoamarelo = document.querySelector(".discoamarelo");
let discoverde = document.querySelector(".discoverde");
let discoazul = document.querySelector(".discoazul");

function tornarArrastavel(elemento) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;

  elemento.addEventListener("mousedown", function(e) {
    arrastando = true;
    offsetX = e.clientX - elemento.offsetLeft;
    offsetY = e.clientY - elemento.offsetTop;
    elemento.style.zIndex = 1000; 
    elemento.style.position = "absolute"; // importante para mover
  });

  document.addEventListener("mousemove", function(e) {
    if (arrastando) {
      elemento.style.left = (e.clientX - offsetX) + "px";
      elemento.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", function () {
    arrastando = false;
    elemento.style.zIndex = "";

    const posX = elemento.offsetLeft;
    const larguraJanela = window.innerWidth;
    const porcentagem = (posX / larguraJanela) * 100;

    if (porcentagem >= 10 && porcentagem <= 20) {
      elemento.classList.add("posição2");
      elemento.classList.remove("posição1");
    }
  });
}

tornarArrastavel(discovermelho);
tornarArrastavel(discolaranja);
tornarArrastavel(discoamarelo);
tornarArrastavel(discoverde);
tornarArrastavel(discoazul);
