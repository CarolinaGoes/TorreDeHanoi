const disco = document.querySelector(".discovermelho");


function trocarPosicaoDiscoVermelho() {
  


  if (disco.classList.contains("posição6")) {
    disco.classList.remove("posição6");
    disco.classList.add("posição1");
  } else {
    disco.classList.remove("posição1");
    disco.classList.add("posição6");
  }
}

trocarPosicaoDiscoVermelho();
