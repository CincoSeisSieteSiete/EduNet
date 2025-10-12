document.addEventListener("DOMContentLoaded", () => {
        const regiones = document.querySelectorAll('.Imagen path');
        const colorBase = "#cccccc"; // color base del SVG
        const colorDestacado = "#ff0000"; // color que quieres que destaque
        const duracion = 1500; // duración en ms de cada cambio

        let index = 0;

        function animarRegion() {
            const region = regiones[index];

            // cambiar a color destacado
            region.style.fill = colorDestacado;

            setTimeout(() => {
                // volver al color base
                region.style.fill = colorBase;

                // pasar a la siguiente región
                index = (index + 1) % regiones.length;

                // repetir
                animarRegion();
            }, duracion);
        }

        // inicializamos todas las regiones con el color base
        regiones.forEach(region => region.style.fill = colorBase);

        animarRegion();
    });