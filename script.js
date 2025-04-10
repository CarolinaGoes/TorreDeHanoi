document.addEventListener("DOMContentLoaded", () => {
  const torreA = document.getElementById("torreA");
  const torres = document.querySelectorAll(".torre");
  const discos = document.querySelectorAll(".disco");

  // Posiciona os discos inicialmente
  const discosArray = Array.from(torreA.querySelectorAll(".disco"));
  discosArray.forEach((disco, index) => {
    const topo = torreA.offsetHeight - 20 - index * 22;
    disco.style.top = `${topo}px`;
  });

  let discoAtivo = null;
  let offsetX = 0;
  let offsetY = 0;
  let torreOrigem = null;

  discos.forEach(disco => {
    disco.addEventListener("mousedown", (e) => {
      const torre = disco.parentElement;
      const todosDiscos = Array.from(torre.querySelectorAll(".disco"));
      const topo = todosDiscos.reduce((menor, atual) => {
        return parseInt(atual.style.top || 0) > parseInt(menor.style.top || 0) ? atual : menor;
      }, todosDiscos[0]);

      if (topo !== disco) {
        alert("Só o disco do topo pode ser movido!");
        return;
      }

      discoAtivo = disco;
      torreOrigem = torre;
      offsetX = e.offsetX;
      offsetY = e.offsetY;

      disco.style.zIndex = 1000;

      document.addEventListener("mousemove", moverDisco);
      document.addEventListener("mouseup", soltarDisco);
    });
  });

  function moverDisco(e) {
    if (!discoAtivo) return;
    const containerRect = document.querySelector(".container").getBoundingClientRect();
    discoAtivo.style.left = `${e.clientX - containerRect.left - offsetX}px`;
    discoAtivo.style.top = `${e.clientY - containerRect.top - offsetY}px`;
  }

  function soltarDisco(e) {
    if (!discoAtivo) return;

    let colocado = false;

    torres.forEach(torre => {
      const rect = torre.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const discosNaTorre = torre.querySelectorAll(".disco");
        const topoDestino = [...discosNaTorre].sort((a, b) => parseInt(a.style.top) - parseInt(b.style.top)).at(-1);

        const tamanhoAtual = parseInt(discoAtivo.dataset.tamanho);
        const tamanhoTopo = topoDestino ? parseInt(topoDestino.dataset.tamanho) : Infinity;

        if (tamanhoAtual < tamanhoTopo) {
          torre.appendChild(discoAtivo);
          const novoTopo = torre.offsetHeight - 20 - discosNaTorre.length * 22;
          discoAtivo.style.top = `${novoTopo}px`;
          discoAtivo.style.left = "50%";
          discoAtivo.style.transform = "translateX(-50%)";
          colocado = true;
        } else {
          alert("Você não pode colocar um disco maior sobre um menor!");
        }
      }
    });

    if (!colocado) {
      torreOrigem.appendChild(discoAtivo);
      const discosOrigem = torreOrigem.querySelectorAll(".disco");
      const posicao = torreOrigem.offsetHeight - 20 - (discosOrigem.length - 1) * 22;
      discoAtivo.style.top = `${posicao}px`;
      discoAtivo.style.left = "50%";
      discoAtivo.style.transform = "translateX(-50%)";
    }

    discoAtivo.style.zIndex = "";
    discoAtivo = null;
    document.removeEventListener("mousemove", moverDisco);
    document.removeEventListener("mouseup", soltarDisco);
  }
});
