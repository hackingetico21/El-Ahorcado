var iniciarJuego = false;
var errores = 0;
var palabra, letrasPalabra, letrasIngresadas, letrasCorrectas, letrasIncorrectas, tecla, lineas;
var botonIniciarJuego = document.querySelector("#boton-iniciar-juego");
var inputInvisible = document.querySelector("#input-teclado");
var subcontenedor = document.querySelector("#subcontenedor");

botonIniciarJuego.addEventListener("click", function (event) {
    event.preventDefault();
    inputInvisible.blur();

    apagar(); 

    inputInvisible.focus();
    iniciarJuego = true;
    errores = 0;
    palabra = palabraAleatoria();
    iniciarDibujo(palabra);
    letrasPalabra = letrasSinRepetir(palabra);
    letrasIngresadas = [];
    letrasCorrectas = [];
    letrasIncorrectas = [];
    lineas = calcularLineas();
    escribirLetrasCorrectas(lineas);
});

subcontenedor.addEventListener("click", function (event) {
    if (iniciarJuego) {
        event.preventDefault();
        inputInvisible.focus();
    }
});

inputInvisible.addEventListener("input", function () {
    tecla = inputInvisible.value.toUpperCase(); 
    inputInvisible.value = "";
    if (iniciarJuego) { 
        if (teclaValida(tecla)) { 
            if (!contiene(tecla, letrasIngresadas)) { 
                letrasIngresadas.push(tecla);
                letrasIngresadas.sort();
                if (contiene(tecla, letrasPalabra)) { 
                    letrasCorrectas.push(tecla);
                    letrasCorrectas.sort();
                    lineas = transcribirLetra(lineas, tecla);
                    limpiarPantalla(0, alto * 0.75, ancho, alto);
                    escribirLetrasCorrectas(lineas);
                } else {
                    errores++;
                    dibujarErrores(errores);
                    letrasIncorrectas.push(tecla);
                    limpiarPantalla(0, alto * 0.62, ancho, alto * 0.1);
                    escribirLetraIncorrectas(letrasIncorrectas); 
                }
                if (ganar()) {
                    iniciarJuego = false;
                    inputInvisible.blur();

                    escribir("¡EXCELENTE!");
                    on = true;
                    hombrecitoSalvado();
                }
                if (perder()) { 
                    iniciarJuego = false;
                    inputInvisible.blur();

                    escribir("LO SIENTO");
                    dibujarCarita(0.6015, 0.236, false);
                    palabraCorrecta();
                }
            }
        }
    }
});

function palabraAleatoria() {
    var i = Math.round(Math.random() * (listaDepalabras.length - 1));
    return listaDepalabras[i];
}

function letrasSinRepetir(string) {
    var letras = [];
    var array = string.split('');
    for (var i = 0; i < array.length; i++) {
        if (!contiene(array[i], letras)) {
            letras.push(array[i]);
        }
    }
    return letras.sort();
}

function teclaValida(tecla) {
    return ((tecla.charCodeAt() >= 65 && tecla.charCodeAt() <= 90) || tecla.charCodeAt() == 209);
}

function contiene(elemento, lista) {
    return lista.includes(elemento);
}

function ganar() {
    return (letrasCorrectas.length == letrasPalabra.length);
}

function perder() {
    return (errores == 9);
}


