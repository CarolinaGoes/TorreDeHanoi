let discovermelho = document.querySelector(".discovermelho");
let discolaranja = document.querySelector(".discolaranja");
let discoamarelo = document.querySelector(".discoamarelo");
let discoverde = document.querySelector(".discoverde");
let discoazul = document.querySelector(".discoazul");
let array1 = [discovermelho, discolaranja, discoamarelo, discoverde, discoazul]; 
let array2 = [];
let array3 = [];

function tornarArrastavel(elemento) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;

  elemento.addEventListener("mousedown", function(e) {
    arrastando = true;
    offsetX = e.clientX - elemento.offsetLeft;
    offsetY = e.clientY - elemento.offsetTop;
    elemento.style.zIndex = 1000; 
    elemento.style.position = "absolute"; 
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
      const index = array1.indexOf(elemento);
      if (index !== -1) {
        array1.splice(index, 1);
        array2.push(elemento);
        console.log("Elemento movido de array1 para array2");
      }
    }
  });

tornarArrastavel(discovermelho);
tornarArrastavel(discolaranja);
tornarArrastavel(discoamarelo);
tornarArrastavel(discoverde);
tornarArrastavel(discoazul);
