let discovermelho = document.querySelector(".discovermelho");
let discolaranja = document.querySelector(".discolaranja");
let discoamarelo = document.querySelector(".discoamarelo");
let discoverde = document.querySelector(".discoverde");
let discoazul = document.querySelector(".discoazul");

let array1 = [discovermelho, discolaranja, discoamarelo, discoverde, discoazul]; 
let array2 = [];
let array3 = [];

function removerDeArrays(elemento) {
  [array1, array2, array3].forEach(arr => {
    const index = arr.indexOf(elemento);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  });
}

function atualizarClasse(elemento) {
  elemento.classList.remove("posição1", "posição2", "posição3", "posição4", "posição5");

  const index1 = array1.indexOf(elemento);
  if (index1 !== -1) {
    elemento.classList.add(`posição${index1 + 1}`);
    return;
  }

  if (array2.includes(elemento)) {
    elemento.classList.add("posição2");
  } else if (array3.includes(elemento)) {
    elemento.classList.add("posição3");
  }
}

function elementoEhTopo(elemento) {
  return (
    array1[0] === elemento ||
    array2[0] === elemento ||
    array3[0] === elemento
  );
}

function tornarArrastavel(elemento) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;

  elemento.addEventListener("mousedown", function(e) {
    if (!elementoEhTopo(elemento)) return;

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
    if (!arrastando) return;

    arrastando = false;
    elemento.style.zIndex = "";

    const posX = elemento.offsetLeft;
    const larguraJanela = window.innerWidth;
    const porcentagem = (posX / larguraJanela) * 100;

    removerDeArrays(elemento);

    if (porcentagem < 10) {
      array1.unshift(elemento);
      console.log("Movido para array1");
    } else if (porcentagem >= 10 && porcentagem <= 20) {
      array2.unshift(elemento);
      console.log("Movido para array2");
    } else {
      array3.unshift(elemento);
      console.log("Movido para array3");
    }

    atualizarClasse(elemento);
  });
}

tornarArrastavel(discovermelho);
tornarArrastavel(discolaranja);
tornarArrastavel(discoamarelo);
tornarArrastavel(discoverde);
tornarArrastavel(discoazul);
