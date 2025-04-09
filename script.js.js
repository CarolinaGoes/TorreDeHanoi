document.addEventListener("DOMContentLoaded", () => {
    const discos = document.querySelectorAll(".disco");
    const torres = document.querySelectorAll(".torre");
    const container = document.querySelector(".container");
  
    discos.forEach(disco => tornarArrastavel(disco));
  
    function tornarArrastavel(disco) {
      let offsetX = 0;
      let offsetY = 0;
      let arrastando = false;
      let posicaoInicial = { left: 0, top: 0 };
  
      disco.addEventListener("mousedown", (e) => {
        e.preventDefault();
  
       
        disco.style.zIndex = 1000;
        disco.style.position = "absolute";
  
        
        posicaoInicial = {
          left: disco.offsetLeft,
          top: disco.offsetTop
        };
  
        // Calcula o deslocamento do clique
        const discoRect = disco.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
  
        offsetX = e.clientX - discoRect.left;
        offsetY = e.clientY - discoRect.top;
  
        arrastando = true;
  
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
  
      function onMouseMove(e) {
        if (!arrastando) return;
  
        // Posiciona o disco baseado no mouse dentro do container
        const containerRect = container.getBoundingClientRect();
        const left = e.clientX - containerRect.left - offsetX;
        const top = e.clientY - containerRect.top - offsetY;
  
        disco.style.left = `${left}px`;
        disco.style.top = `${top}px`;
      }
  
      function onMouseUp(e) {
        if (!arrastando) return;
  
        arrastando = false;
        disco.style.zIndex = "";
  
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
  
        // Verifica se o disco foi solto sobre uma torre
        let colocadoNaTorre = false;
  
        torres.forEach(torre => {
          const torreRect = torre.getBoundingClientRect();
          const mouseX = e.clientX;
          const mouseY = e.clientY;
  
          if (
            mouseX >= torreRect.left &&
            mouseX <= torreRect.right &&
            mouseY >= torreRect.top &&
            mouseY <= torreRect.bottom
          ) {
            const torreRectInContainer = torre.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
  
            const centroTorre = torre.offsetLeft + torre.offsetWidth / 2;
            const discosNaTorre = torre.querySelectorAll(".disco").length;
            const novoTop = 580 - (discosNaTorre + 1) * 22;
  
            disco.style.left = `${centroTorre - disco.offsetWidth / 2}px`;
            disco.style.top = `${novoTop}px`;
            colocadoNaTorre = true;
          }
        });
  
        // Se não foi solto sobre torre, volta à posição original
        if (!colocadoNaTorre) {
          disco.style.left = `${posicaoInicial.left}px`;
          disco.style.top = `${posicaoInicial.top}px`;
        }
      }
    }
  });
  