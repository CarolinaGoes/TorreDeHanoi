const disco = document.querySelector("#vermelho");


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

    if(const torre = document.getElementById("torreA");
    const rect = torre.getBoundingClientRect();){
      
    }

    disco.style.left = rect.left + "-10px";
    disco.style.top = rect.top + "px";

  });
}
tornarArrastavel(disco);
