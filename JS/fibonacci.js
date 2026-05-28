function calcularAhorro() {
  var campoMeses = document.getElementById("meses");
  var meses = parseInt(campoMeses.value, 10);
  var mensajeError = document.getElementById("mensajeError");

  mensajeError.classList.add("oculto");
  mensajeError.textContent = "";

  if (isNaN(meses) || meses < 1) {
    mensajeError.textContent = "⚠️ Por favor ingresa un número de meses válido (mínimo 1).";
    mensajeError.classList.remove("oculto");
    return;
  }

  if (meses > 50) {
    mensajeError.textContent = "⚠️ El máximo permitido es 50 meses para una mejor visualización.";
    mensajeError.classList.remove("oculto");
    return;
  }

  var a = 1;
  var b = 1;
  var c;

  var totalAcumulado = 0;
  var ultimoAhorro = 0;
  var maximoMensual = 0;

  var listaMeses = [];
  var listaAhorros = [];
  var listaTotales = [];

  for (var i = 1; i <= meses; i++) {
    var ahorroDeMes;

    if (i === 1) {
      ahorroDeMes = a;
    } else if (i === 2) {
      ahorroDeMes = b;
    } else {
      c = a + b;
      a = b;
      b = c;
      ahorroDeMes = c;
    }

    totalAcumulado += ahorroDeMes;
    listaMeses.push(i);
    listaAhorros.push(ahorroDeMes);
    listaTotales.push(totalAcumulado);

    if (ahorroDeMes > maximoMensual) {
      maximoMensual = ahorroDeMes;
    }

    ultimoAhorro = ahorroDeMes;
  }

  document.getElementById("resultadoSeccion").classList.remove("oculto");
  mostrarResumen(meses, totalAcumulado, ultimoAhorro);
  dibujarGrafico(listaMeses, listaAhorros, maximoMensual);
  construirTabla(listaMeses, listaAhorros, listaTotales, totalAcumulado);
  document.getElementById("resultadoSeccion").scrollIntoView({ behavior: "smooth", block: "start" });
}

function mostrarResumen(meses, total, ultimoAhorro) {
  var promedio = Math.round(total / meses);
  var htmlResumen = "";

  htmlResumen += crearCardResumen("📅", meses, "Meses de ahorro", "");
  htmlResumen += crearCardResumen("💰", "Bs. " + total.toLocaleString(), "Total acumulado", "");
  htmlResumen += crearCardResumen("📈", "Bs. " + ultimoAhorro.toLocaleString(), "Ahorro del último mes", "");
  htmlResumen += crearCardResumen("📊", "Bs. " + promedio.toLocaleString(), "Promedio mensual", "");

  document.getElementById("resumenCards").innerHTML = htmlResumen;
}

function crearCardResumen(icono, valor, etiqueta, claseExtra) {
  return '' +
    '<div class="resumen-card ' + claseExtra + '">' +
    '  <span class="card-icono">' + icono + '</span>' +
    '  <span class="card-valor">' + valor + '</span>' +
    '  <span class="card-etiqueta">' + etiqueta + '</span>' +
    '</div>';
}

function dibujarGrafico(listaMeses, listaAhorros, maximo) {
  var htmlGrafico = "";
  var totalBarra = listaMeses.length;
  var limiteBarras = totalBarra <= 24 ? totalBarra : 24;

  for (var i = 0; i < limiteBarras; i++) {
    var porcentaje = maximo > 0 ? Math.round((listaAhorros[i] / maximo) * 100) : 0;

    if (porcentaje < 3) {
      porcentaje = 3;
    }

    htmlGrafico += '<div class="barra-contenedor">';
    htmlGrafico += '  <div class="barra" style="height: ' + porcentaje + '%;" title="Mes ' + listaMeses[i] + ': Bs. ' + listaAhorros[i] + '"></div>';
    htmlGrafico += '  <span class="barra-etiqueta-mes">M' + listaMeses[i] + '</span>';
    htmlGrafico += '</div>';
  }

  if (totalBarra > limiteBarras) {
    htmlGrafico += '<div class="barra-contenedor" style="justify-content:center;color:#8a8a8f;font-size:12px;">...</div>';
  }

  document.getElementById("grafico").innerHTML = htmlGrafico;
}

function construirTabla(listaMeses, listaAhorros, listaTotales, totalFinal) {
  var htmlFilas = "";

  for (var i = 0; i < listaMeses.length; i++) {
    var porcentajeProgreso = totalFinal > 0
      ? Math.round((listaTotales[i] / totalFinal) * 100)
      : 0;

    htmlFilas += '<tr>';
    htmlFilas += '  <td><strong>Mes ' + listaMeses[i] + '</strong></td>';
    htmlFilas += '  <td>Bs. ' + listaAhorros[i].toLocaleString() + '</td>';
    htmlFilas += '  <td>Bs. ' + listaTotales[i].toLocaleString() + '</td>';
    htmlFilas += '  <td class="progreso-celda">';
    htmlFilas += '    <div class="barra-progreso">';
    htmlFilas += '      <div class="barra-progreso-fill" style="width: ' + porcentajeProgreso + '%;"></div>';
    htmlFilas += '    </div>';
    htmlFilas += '  </td>';
    htmlFilas += '</tr>';
  }

  htmlFilas += '<tr>';
  htmlFilas += '  <td colspan="2"><strong>💰 TOTAL AHORRADO</strong></td>';
  htmlFilas += '  <td><strong>Bs. ' + totalFinal.toLocaleString() + '</strong></td>';
  htmlFilas += '  <td></td>';
  htmlFilas += '</tr>';

  document.getElementById("cuerpoTabla").innerHTML = htmlFilas;
}

function limpiarResultados() {
  document.getElementById("meses").value = "";
  document.getElementById("resultadoSeccion").classList.add("oculto");
  document.getElementById("mensajeError").classList.add("oculto");
  document.getElementById("mensajeError").textContent = "";
  document.getElementById("resumenCards").innerHTML = "";
  document.getElementById("grafico").innerHTML = "";
  document.getElementById("cuerpoTabla").innerHTML = "";
  document.getElementById("encabezado").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function() {
  var campoMeses = document.getElementById("meses");

  if (campoMeses) {
    campoMeses.addEventListener("keydown", function(evento) {
      if (evento.key === "Enter") {
        calcularAhorro();
      }
    });
  }
});
