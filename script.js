document.addEventListener("DOMContentLoaded", () => {
  const discos = document.querySelectorAll(".disco");
  const torres = document.querySelectorAll(".torre");
  const container = document.querySelector(".container");

  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;
  let posicaoInicial = { left: 0, top: 0 };
  let discoAtivo = null;

  discos.forEach(disco => {
    disco.addEventListener("mousedown", (e) => {
      e.preventDefault();

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
        const centroTorre = torre.offsetLeft + torre.offsetWidth / 2;
        const discosNaTorre = torre.querySelectorAll(".disco").length;
        const novoTop = 580 - (discosNaTorre + 1) * 22;

        discoAtivo.style.left = `${centroTorre - discoAtivo.offsetWidth / 2}px`;
        discoAtivo.style.top = `${novoTop}px`;
        colocadoNaTorre = true;
      }
    });

    if (!colocadoNaTorre) {
      discoAtivo.style.left = `${posicaoInicial.left}px`;
      discoAtivo.style.top = `${posicaoInicial.top}px`;
    }

    discoAtivo = null;
  }
});
