function explorarFibonacciPrimos() {
  var campoTerminos = document.getElementById("terminosFib");
  var terminos = parseInt(campoTerminos.value, 10);
  var mensajeError = document.getElementById("mensajeErrorCombinado");

  mensajeError.classList.add("oculto");
  mensajeError.textContent = "";

  if (isNaN(terminos) || terminos < 3) {
    mensajeError.textContent = "⚠️ Ingresa al menos 3 términos para poder encontrar Fibonacci primos.";
    mensajeError.classList.remove("oculto");
    return;
  }

  if (terminos > 50) {
    mensajeError.textContent = "⚠️ El máximo permitido es 50 términos para mantener la visualización clara.";
    mensajeError.classList.remove("oculto");
    return;
  }

  var datos = generarDatosFibonacciPrimos(terminos);

  document.getElementById("resultadoSeccionCombinado").classList.remove("oculto");
  mostrarResumenCombinado(terminos, datos.encontrados, datos.mayorEncontrado);
  dibujarGraficoCombinado(datos.lista);
  mostrarChipsEncontrados(datos.encontrados);
  construirTablaCombinada(datos.lista);
  document.getElementById("resultadoSeccionCombinado").scrollIntoView({ behavior: "smooth", block: "start" });
}

function generarDatosFibonacciPrimos(terminos) {
  var anterior = 1;
  var actual = 1;
  var siguiente;
  var lista = [];
  var encontrados = [];
  var mayorEncontrado = null;

  for (var i = 1; i <= terminos; i++) {
    var valor;

    if (i === 1 || i === 2) {
      valor = 1;
    } else {
      siguiente = anterior + actual;
      anterior = actual;
      actual = siguiente;
      valor = siguiente;
    }

    var primo = esPrimo(valor);
    var dato = {
      indice: i,
      valor: valor,
      esPrimo: primo
    };

    lista.push(dato);

    if (primo) {
      encontrados.push(dato);
      mayorEncontrado = dato;
    }
  }

  return {
    lista: lista,
    encontrados: encontrados,
    mayorEncontrado: mayorEncontrado
  };
}

function esPrimo(numero) {
  if (numero < 2) {
    return false;
  }

  if (numero === 2) {
    return true;
  }

  if (numero % 2 === 0) {
    return false;
  }

  for (var divisor = 3; divisor * divisor <= numero; divisor += 2) {
    if (numero % divisor === 0) {
      return false;
    }
  }

  return true;
}

function mostrarResumenCombinado(terminos, encontrados, mayorEncontrado) {
  var rareza = Math.round((encontrados.length / terminos) * 100);
  var mayorTexto = mayorEncontrado ? mayorEncontrado.valor.toLocaleString() : "Ninguno";
  var htmlResumen = "";

  htmlResumen += crearCardResumenCombinado("🔢", terminos, "Términos analizados");
  htmlResumen += crearCardResumenCombinado("✨", encontrados.length, "Fibonacci primos");
  htmlResumen += crearCardResumenCombinado("📉", rareza + "%", "Frecuencia encontrada");
  htmlResumen += crearCardResumenCombinado("🏷️", mayorTexto, "Mayor candidato");

  document.getElementById("resumenCardsCombinado").innerHTML = htmlResumen;
}

function crearCardResumenCombinado(icono, valor, etiqueta) {
  return '' +
    '<div class="resumen-card ciruela">' +
    '  <span class="card-icono">' + icono + '</span>' +
    '  <span class="card-valor">' + valor + '</span>' +
    '  <span class="card-etiqueta">' + etiqueta + '</span>' +
    '</div>';
}

function dibujarGraficoCombinado(lista) {
  var htmlGrafico = "";
  var limiteBarras = lista.length <= 32 ? lista.length : 32;
  var maximo = lista[limiteBarras - 1].valor;
  var maximoLog = Math.log10(maximo + 1);

  for (var i = 0; i < limiteBarras; i++) {
    var dato = lista[i];
    var altura = Math.round((Math.log10(dato.valor + 1) / maximoLog) * 100);

    if (altura < 4) {
      altura = 4;
    }

    htmlGrafico += '<div class="barra-contenedor">';
    htmlGrafico += '  <div class="barra ' + (dato.esPrimo ? "es-primo" : "no-primo") + '" style="height: ' + altura + '%;" title="F' + dato.indice + ': ' + dato.valor + '"></div>';
    htmlGrafico += '  <span class="barra-etiqueta-mes">F' + dato.indice + '</span>';
    htmlGrafico += '</div>';
  }

  if (lista.length > limiteBarras) {
    htmlGrafico += '<div class="barra-contenedor" style="justify-content:center;color:#8a8a8f;font-size:12px;">...</div>';
  }

  document.getElementById("graficoCombinado").innerHTML = htmlGrafico;
}

function mostrarChipsEncontrados(encontrados) {
  var contenedor = document.getElementById("codigosEncontrados");
  var html = "";

  if (encontrados.length === 0) {
    contenedor.innerHTML = '<span class="chip">No se encontraron Fibonacci primos en este rango</span>';
    return;
  }

  for (var i = 0; i < encontrados.length; i++) {
    html += '<span class="chip">F' + encontrados[i].indice + ' = ' + encontrados[i].valor.toLocaleString() + '</span>';
  }

  contenedor.innerHTML = html;
}

function construirTablaCombinada(lista) {
  var htmlFilas = "";

  for (var i = 0; i < lista.length; i++) {
    var dato = lista[i];
    var claseEstado = dato.esPrimo ? "estado-ok" : "estado-alerta";
    var textoEstado = dato.esPrimo ? "Sí" : "No";
    var uso = dato.esPrimo
      ? "Candidato raro para identificador educativo"
      : "Descartado por no ser primo";

    htmlFilas += '<tr>';
    htmlFilas += '  <td><strong>F' + dato.indice + '</strong></td>';
    htmlFilas += '  <td>' + dato.valor.toLocaleString() + '</td>';
    htmlFilas += '  <td class="' + claseEstado + '">' + textoEstado + '</td>';
    htmlFilas += '  <td>' + uso + '</td>';
    htmlFilas += '</tr>';
  }

  document.getElementById("cuerpoTablaCombinado").innerHTML = htmlFilas;
}

function limpiarCombinado() {
  document.getElementById("terminosFib").value = "";
  document.getElementById("resultadoSeccionCombinado").classList.add("oculto");
  document.getElementById("mensajeErrorCombinado").classList.add("oculto");
  document.getElementById("mensajeErrorCombinado").textContent = "";
  document.getElementById("resumenCardsCombinado").innerHTML = "";
  document.getElementById("graficoCombinado").innerHTML = "";
  document.getElementById("codigosEncontrados").innerHTML = "";
  document.getElementById("cuerpoTablaCombinado").innerHTML = "";
  document.getElementById("encabezado").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function() {
  var campoTerminos = document.getElementById("terminosFib");

  if (campoTerminos) {
    campoTerminos.addEventListener("keydown", function(evento) {
      if (evento.key === "Enter") {
        explorarFibonacciPrimos();
      }
    });
  }
});
