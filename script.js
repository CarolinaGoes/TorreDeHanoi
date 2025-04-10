document.addEventListener("DOMContentLoaded", () => {
  const discos = document.querySelectorAll(".disco");
  const torres = document.querySelectorAll(".torre");
  const container = document.querySelector(".container");

  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;
  let posicaoInicial = { left: 0, top: 0 };
  let discoAtivo = null;
  let torreOrigem = null;

  // Função para mover o disco para a torre de destino
  function moverDisco(disco, torreDestino, novoTop, centroTorre) {
    torreDestino.appendChild(disco);
    disco.style.left = `${centroTorre - disco.offsetWidth / 2}px`;
    disco.style.top = `${novoTop}px`;
  }

  discos.forEach(disco => {
    disco.addEventListener("mousedown", (e) => {
      e.preventDefault();
      
      // Identifica a torre de origem verificando o pai do disco
      torreOrigem = disco.parentElement;
      
      // Verifica se o disco clicado é o do topo na torre de origem
      const discosNaTorre = torreOrigem.querySelectorAll(".disco");
      const discoNoTopo = discosNaTorre[discosNaTorre.length - 1];
      
      if (disco !== discoNoTopo) {
        alert("Você só pode mover o disco que está no topo!");
        return;
      }

      discoAtivo = disco;

      const discoRect = disco.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      offsetX = e.clientX - discoRect.left;
      offsetY = e.clientY - discoRect.top;

      posicaoInicial = {
        left: disco.offsetLeft,
        top: disco.offsetTop
      };

      arrastando = true;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });

  function onMouseMove(e) {
    if (!arrastando || !discoAtivo) return;
    
    const containerRect = container.getBoundingClientRect();
    const left = e.clientX - containerRect.left - offsetX;
    const top = e.clientY - containerRect.top - offsetY;

    discoAtivo.style.position = "absolute";
    discoAtivo.style.left = `${left}px`;
    discoAtivo.style.top = `${top}px`;
    discoAtivo.style.zIndex = 1000;
  }

  function onMouseUp(e) {
    if (!arrastando || !discoAtivo) return;

    arrastando = false;
    discoAtivo.style.zIndex = "";

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

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
        // Se a torre destino for diferente da torre de origem, vamos tentar mover
        const discosNaTorre = torre.querySelectorAll(".disco");
        
        // Se a torre estiver vazia, ou se o disco ativo for menor que o disco no topo da torre destino, a jogada é válida
        let podeMover = false;
        if (discosNaTorre.length === 0) {
          podeMover = true;
        } else {
          const discoNoTopo = discosNaTorre[discosNaTorre.length - 1];
          const tamanhoAtivo = parseInt(discoAtivo.dataset.tamanho);
          const tamanhoTopo = parseInt(discoNoTopo.dataset.tamanho);

          podeMover = tamanhoAtivo < tamanhoTopo;
        }

        if (podeMover) {
          const centroTorre = torre.offsetLeft + torre.offsetWidth / 2;
          const novoTop = 2850 - (discosNaTorre.length + 1) * 22;
          moverDisco(discoAtivo, torre, novoTop, centroTorre);
          colocadoNaTorre = true;
        } else {
          alert("Só é permitido colocar um disco menor sobre um disco maior!");
        }
      }
    });

    // Se não foi colocado em nenhuma torre válida, retorna à posição inicial
    if (!colocadoNaTorre) {
      discoAtivo.style.left = `${posicaoInicial.left}px`;
      discoAtivo.style.top = `${posicaoInicial.top}px`;
    }

    discoAtivo = null;
    torreOrigem = null;
  }
});
