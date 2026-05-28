function verificarPin() {
  var campoPin = document.getElementById("pin");
  var pinTexto = campoPin.value.trim();
  var mensajeError = document.getElementById("mensajeErrorPrimo");

  mensajeError.classList.add("oculto");
  mensajeError.textContent = "";

  if (!/^\d{4,6}$/.test(pinTexto)) {
    mensajeError.textContent = "⚠️ Ingresa un PIN numérico de 4 a 6 dígitos.";
    mensajeError.classList.remove("oculto");
    return;
  }

  var numeroPin = parseInt(pinTexto, 10);
  var revisionPrimo = revisarPrimalidad(numeroPin);
  var evaluacion = evaluarSeguridadPin(pinTexto, revisionPrimo);

  document.getElementById("resultadoSeccionPrimo").classList.remove("oculto");
  mostrarResumenPin(pinTexto, revisionPrimo, evaluacion);
  dibujarMedidorSeguridad(evaluacion.puntaje, evaluacion.nivel);
  construirTablaPin(evaluacion.pruebas);
  mostrarDetallePrimo(numeroPin, revisionPrimo);
  document.getElementById("resultadoSeccionPrimo").scrollIntoView({ behavior: "smooth", block: "start" });
}

function revisarPrimalidad(numero) {
  if (numero < 2) {
    return { esPrimo: false, divisor: null };
  }

  if (numero === 2) {
    return { esPrimo: true, divisor: null };
  }

  if (numero % 2 === 0) {
    return { esPrimo: false, divisor: 2 };
  }

  for (var divisor = 3; divisor * divisor <= numero; divisor += 2) {
    if (numero % divisor === 0) {
      return { esPrimo: false, divisor: divisor };
    }
  }

  return { esPrimo: true, divisor: null };
}

function evaluarSeguridadPin(pinTexto, revisionPrimo) {
  var pruebas = [];
  var puntaje = 0;
  var comunes = ["0000", "1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "1234", "4321", "1212", "6969", "2580", "0852", "1122", "2000", "2020", "2024", "2025"];
  var digitosUnicos = contarDigitosUnicos(pinTexto);
  var repetidoFuerte = /(.)\1{2,}/.test(pinTexto) || /^(\d)\1+$/.test(pinTexto);
  var secuencia = esSecuenciaSimple(pinTexto);
  var esComun = comunes.indexOf(pinTexto) !== -1;

  puntaje += agregarPrueba(pruebas, "Longitud válida", true, 15, "Tiene entre 4 y 6 dígitos.");
  puntaje += agregarPrueba(pruebas, "Número primo", revisionPrimo.esPrimo, 30, revisionPrimo.esPrimo ? "No se encontraron divisores." : "Tiene divisores distintos de 1 y de sí mismo.");
  puntaje += agregarPrueba(pruebas, "Sin repetición fuerte", !repetidoFuerte, 15, repetidoFuerte ? "Repite el mismo dígito demasiadas veces." : "No repite un dígito tres veces seguidas.");
  puntaje += agregarPrueba(pruebas, "Sin secuencia obvia", !secuencia, 15, secuencia ? "Forma una secuencia ascendente o descendente." : "No es una secuencia simple.");
  puntaje += agregarPrueba(pruebas, "No está en lista común", !esComun, 15, esComun ? "Aparece entre PIN frecuentes o fáciles." : "No coincide con ejemplos comunes.");
  puntaje += agregarPrueba(pruebas, "Variedad de dígitos", digitosUnicos >= 3, 10, "Tiene " + digitosUnicos + " dígitos diferentes.");

  return {
    puntaje: puntaje,
    nivel: obtenerNivel(puntaje),
    pruebas: pruebas
  };
}

function agregarPrueba(pruebas, nombre, aprobado, puntos, explicacion) {
  pruebas.push({
    nombre: nombre,
    aprobado: aprobado,
    puntos: aprobado ? puntos : 0,
    posibles: puntos,
    explicacion: explicacion
  });

  return aprobado ? puntos : 0;
}

function contarDigitosUnicos(texto) {
  var vistos = {};
  var total = 0;

  for (var i = 0; i < texto.length; i++) {
    if (!vistos[texto[i]]) {
      vistos[texto[i]] = true;
      total++;
    }
  }

  return total;
}

function esSecuenciaSimple(texto) {
  if (texto.length < 3) {
    return false;
  }

  var ascendente = true;
  var descendente = true;

  for (var i = 1; i < texto.length; i++) {
    var anterior = parseInt(texto[i - 1], 10);
    var actual = parseInt(texto[i], 10);

    if (actual !== anterior + 1) {
      ascendente = false;
    }

    if (actual !== anterior - 1) {
      descendente = false;
    }
  }

  return ascendente || descendente;
}

function obtenerNivel(puntaje) {
  if (puntaje >= 80) {
    return "Alto";
  }

  if (puntaje >= 55) {
    return "Medio";
  }

  return "Bajo";
}

function mostrarResumenPin(pinTexto, revisionPrimo, evaluacion) {
  var enmascarado = "•".repeat(pinTexto.length);
  var divisor = revisionPrimo.esPrimo ? "Ninguno" : revisionPrimo.divisor;
  var htmlResumen = "";

  htmlResumen += crearCardResumenPin("🔢", enmascarado, "PIN evaluado");
  htmlResumen += crearCardResumenPin("🧮", revisionPrimo.esPrimo ? "Sí" : "No", "¿Es primo?");
  htmlResumen += crearCardResumenPin("📊", evaluacion.puntaje + "/100", "Puntaje");
  htmlResumen += crearCardResumenPin("🛡️", evaluacion.nivel, "Nivel de seguridad");
  htmlResumen += crearCardResumenPin("🔎", divisor, "Divisor encontrado");

  document.getElementById("resumenCardsPrimo").innerHTML = htmlResumen;
}

function crearCardResumenPin(icono, valor, etiqueta) {
  return '' +
    '<div class="resumen-card azul">' +
    '  <span class="card-icono">' + icono + '</span>' +
    '  <span class="card-valor">' + valor + '</span>' +
    '  <span class="card-etiqueta">' + etiqueta + '</span>' +
    '</div>';
}

function dibujarMedidorSeguridad(puntaje, nivel) {
  var html = "";
  html += '<div class="medidor-fondo">';
  html += '  <div class="medidor-fill" style="width: ' + puntaje + '%;"></div>';
  html += '</div>';
  html += '<div class="medidor-texto">';
  html += '  <span>' + puntaje + ' puntos</span>';
  html += '  <span>Nivel ' + nivel + '</span>';
  html += '</div>';

  document.getElementById("graficoSeguridad").innerHTML = html;
}

function construirTablaPin(pruebas) {
  var htmlFilas = "";

  for (var i = 0; i < pruebas.length; i++) {
    var prueba = pruebas[i];
    var claseEstado = prueba.aprobado ? "estado-ok" : "estado-alerta";
    var textoEstado = prueba.aprobado ? "Aprobado" : "Revisar";

    htmlFilas += '<tr>';
    htmlFilas += '  <td><strong>' + prueba.nombre + '</strong></td>';
    htmlFilas += '  <td class="' + claseEstado + '">' + textoEstado + '</td>';
    htmlFilas += '  <td>' + prueba.puntos + "/" + prueba.posibles + '</td>';
    htmlFilas += '  <td>' + prueba.explicacion + '</td>';
    htmlFilas += '</tr>';
  }

  document.getElementById("cuerpoTablaPin").innerHTML = htmlFilas;
}

function mostrarDetallePrimo(numeroPin, revisionPrimo) {
  var detalle = "";

  if (revisionPrimo.esPrimo) {
    detalle = numeroPin + " es primo: solo se divide exactamente entre 1 y " + numeroPin + ".";
  } else if (revisionPrimo.divisor) {
    detalle = numeroPin + " no es primo: se puede dividir entre " + revisionPrimo.divisor + ".";
  } else {
    detalle = numeroPin + " no es primo.";
  }

  detalle += " Este análisis es educativo y no debe usarse con un PIN bancario real.";
  document.getElementById("detallePrimo").textContent = detalle;
}

function limpiarPin() {
  document.getElementById("pin").value = "";
  document.getElementById("resultadoSeccionPrimo").classList.add("oculto");
  document.getElementById("mensajeErrorPrimo").classList.add("oculto");
  document.getElementById("mensajeErrorPrimo").textContent = "";
  document.getElementById("resumenCardsPrimo").innerHTML = "";
  document.getElementById("graficoSeguridad").innerHTML = "";
  document.getElementById("detallePrimo").textContent = "";
  document.getElementById("cuerpoTablaPin").innerHTML = "";
  document.getElementById("encabezado").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function() {
  var campoPin = document.getElementById("pin");

  if (campoPin) {
    campoPin.addEventListener("keydown", function(evento) {
      if (evento.key === "Enter") {
        verificarPin();
      }
    });
  }
});
