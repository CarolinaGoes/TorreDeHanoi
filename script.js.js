let discos = document.querySelectorAll('.disco');

function tornarArrastavel(elemento) {
    let offsetX = 0;
    let offsetY = 0;
    let arrastando = false;

    function onMouseMove(e) {
        if (arrastando) {
            elemento.style.left = (e.clientX - offsetX) + "px";
            elemento.style.top = (e.clientY - offsetY) + "px";
        }
    }

    function onMouseUp() {
        arrastando = false;
        elemento.style.zIndex = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (elemento.offsetLeft >= 220 && elemento.offsetLeft <= 350 && elemento.offsetTop <= 560 && elemento.offsetTop >= 300) {
            elemento.style.left = "350px";
            elemento.style.top = "560px";
        }
    }

    elemento.addEventListener("mousedown", function (e) {
        arrastando = true;
        offsetX = e.clientX - elemento.offsetLeft;
        offsetY = e.clientY - elemento.offsetTop;
        elemento.style.zIndex = 2;
        elemento.style.position = "absolute";

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
}

discos.forEach(disco => tornarArrastavel(disco));
