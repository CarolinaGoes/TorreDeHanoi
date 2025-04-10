document.addEventListener("DOMContentLoaded", () => {
  const torreA = document.getElementById("torreA");
  const torres = document.querySelectorAll(".torre");
  const discos = document.querySelectorAll(".disco");

  const discosArray = Array.from(torreA.querySelectorAll(".disco"));
  discosArray.reverse().forEach((disco, index) => {
    const topo = torreA.offsetHeight - 42 - index * 22;
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

      const discoTopo = todosDiscos.reduce((maisAlto, atual) => {
        return parseInt(atual.style.top || 0) < parseInt(maisAlto.style.top || 0) ? atual : maisAlto;
      }, todosDiscos[0]);

      if (disco !== discoTopo) {
        alert("Só o disco do topo pode ser movido!");
        return;
      }

      discoAtivo = disco;
      torreOrigem = torre;
      offsetX = e.offsetX;
      offsetY = e.offsetY;

      disco.style.zIndex = 3;

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
        const discosNaTorre = Array.from(torre.querySelectorAll(".disco"));
        const discoTopoDestino = discosNaTorre.reduce((maisAlto, atual) => {
          return parseInt(atual.style.top || 0) < parseInt(maisAlto.style.top || 0) ? atual : maisAlto;
        }, discosNaTorre[0] || { dataset: { tamanho: "999" } });

        const tamanhoAtual = parseInt(discoAtivo.dataset.tamanho);
        const tamanhoTopo = parseInt(discoTopoDestino.dataset.tamanho) || Infinity;

        if (tamanhoAtual < tamanhoTopo || discosNaTorre.length === 0) {
          torre.appendChild(discoAtivo);
          const novoTopo = torre.offsetHeight - 42 - discosNaTorre.length * 22;
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
      const discosOrigem = Array.from(torreOrigem.querySelectorAll(".disco"));
      const novoTopo = torreOrigem.offsetHeight - 42 - (discosOrigem.length - 1) * 22;
      discoAtivo.style.top = `${novoTopo}px`;
      discoAtivo.style.left = "50%";
      discoAtivo.style.transform = "translateX(-50%)";
    }

    discoAtivo.style.zIndex = "";
    discoAtivo = null;
    document.removeEventListener("mousemove", moverDisco);
    document.removeEventListener("mouseup", soltarDisco);
  }
});
