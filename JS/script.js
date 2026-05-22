// ================================================
// DESAFÍO WEB 2025 — Ahorro Progresivo con Fibonacci
// Archivo: js/script.js
// Descripción: Lógica de la serie de Fibonacci aplicada
//              al cálculo de un plan de ahorro progresivo.
// ================================================

// ------------------------------------------------
// FUNCIÓN PRINCIPAL: calcularAhorro()
// Se ejecuta al hacer clic en "Calcular mi Ahorro"
// ------------------------------------------------
function calcularAhorro() {

  // ---- 1. OBTENER DATOS DEL FORMULARIO ----
  // Usamos document.getElementById() para leer el valor ingresado
  var campomeses = document.getElementById("meses");
  var meses = parseInt(campomeses.value);

  // ---- 2. VALIDAR LA ENTRADA ----
  var mensajeError = document.getElementById("mensajeError");

  // Limpiar error anterior
  mensajeError.classList.add("oculto");
  mensajeError.textContent = "";

  // Verificar que el número sea válido
  if (isNaN(meses) || meses < 1) {
    mensajeError.textContent = "⚠️ Por favor ingresa un número de meses válido (mínimo 1).";
    mensajeError.classList.remove("oculto");
    return; // Detener la función si hay error
  }

  if (meses > 50) {
    mensajeError.textContent = "⚠️ El máximo permitido es 50 meses para una mejor visualización.";
    mensajeError.classList.remove("oculto");
    return;
  }

  // ---- 3. CALCULAR LA SERIE FIBONACCI ----
  // Se usan variables simples: a (mes anterior), b (mes actual), c (siguiente)
  // NO se usan arreglos/arrays — solo variables y un ciclo

  var a = 1;       // Valor de Fibonacci en el mes 1
  var b = 1;       // Valor de Fibonacci en el mes 2
  var c;           // Variable auxiliar para el siguiente valor

  var totalAcumulado = 0;   // Suma de todos los ahorros
  var ultimoAhorro  = 0;    // Ahorro del último mes
  var maximoMensual = 0;    // Valor más alto para escalar el gráfico

  // Guardar los resultados en variables separadas para la tabla y el gráfico
  var listaMeses      = [];
  var listaAhorros    = [];
  var listaTotales    = [];

  // Recorrer cada mes y calcular el ahorro correspondiente
  for (var i = 1; i <= meses; i++) {

    var ahorroDeMes; // Ahorro de este mes específico

    if (i === 1) {
      ahorroDeMes = a;  // Mes 1: Bs. 1
    } else if (i === 2) {
      ahorroDeMes = b;  // Mes 2: Bs. 1
    } else {
      // Mes 3 en adelante: c = a + b (Fibonacci)
      c = a + b;
      a = b;            // Avanzar: el anterior pasa a ser el nuevo "a"
      b = c;            // Avanzar: el nuevo valor pasa a ser "b"
      ahorroDeMes = c;
    }

    // Acumular el total
    totalAcumulado = totalAcumulado + ahorroDeMes;

    // Guardar en las listas
    listaMeses.push(i);
    listaAhorros.push(ahorroDeMes);
    listaTotales.push(totalAcumulado);

    // Rastrear el máximo para escalar el gráfico
    if (ahorroDeMes > maximoMensual) {
      maximoMensual = ahorroDeMes;
    }

    // El último ahorro es el del mes final
    ultimoAhorro = ahorroDeMes;
  }

  // ---- 4. MOSTRAR RESULTADOS EN LA PÁGINA ----
  // Todo se muestra usando document.getElementById() — NO se usa console.log

  // 4a. Hacer visible la sección de resultados
  var seccionResultados = document.getElementById("resultadoSeccion");
  seccionResultados.classList.remove("oculto");

  // 4b. Mostrar las tarjetas de resumen
  mostrarResumen(meses, totalAcumulado, ultimoAhorro, listaMeses, listaAhorros);

  // 4c. Dibujar el gráfico de barras
  dibujarGrafico(listaMeses, listaAhorros, maximoMensual);

  // 4d. Construir la tabla de resultados detallada
  construirTabla(listaMeses, listaAhorros, listaTotales, totalAcumulado);

  // 4e. Desplazar la página suavemente hasta los resultados
  seccionResultados.scrollIntoView({ behavior: "smooth", block: "start" });
}


// ------------------------------------------------
// FUNCIÓN: mostrarResumen()
// Muestra las tarjetas de resumen arriba de la tabla
// ------------------------------------------------
function mostrarResumen(meses, total, ultimoAhorro, listaMeses, listaAhorros) {

  // Calcular el promedio mensual
  var promedio = Math.round(total / meses);

  // Construir el HTML de las tarjetas
  var htmlResumen = "";

  htmlResumen += '<div class="resumen-card">';
  htmlResumen += '  <span class="card-icono">📅</span>';
  htmlResumen += '  <span class="card-valor">' + meses + '</span>';
  htmlResumen += '  <span class="card-etiqueta">Meses de ahorro</span>';
  htmlResumen += '</div>';

  htmlResumen += '<div class="resumen-card">';
  htmlResumen += '  <span class="card-icono">💰</span>';
  htmlResumen += '  <span class="card-valor">Bs. ' + total.toLocaleString() + '</span>';
  htmlResumen += '  <span class="card-etiqueta">Total acumulado</span>';
  htmlResumen += '</div>';

  htmlResumen += '<div class="resumen-card">';
  htmlResumen += '  <span class="card-icono">📈</span>';
  htmlResumen += '  <span class="card-valor">Bs. ' + ultimoAhorro.toLocaleString() + '</span>';
  htmlResumen += '  <span class="card-etiqueta">Ahorro del último mes</span>';
  htmlResumen += '</div>';

  htmlResumen += '<div class="resumen-card">';
  htmlResumen += '  <span class="card-icono">📊</span>';
  htmlResumen += '  <span class="card-valor">Bs. ' + promedio.toLocaleString() + '</span>';
  htmlResumen += '  <span class="card-etiqueta">Promedio mensual</span>';
  htmlResumen += '</div>';

  // Inyectar en el DOM usando getElementById
  document.getElementById("resumenCards").innerHTML = htmlResumen;
}


// ------------------------------------------------
// FUNCIÓN: dibujarGrafico()
// Genera un gráfico de barras con CSS puro
// ------------------------------------------------
function dibujarGrafico(listaMeses, listaAhorros, maximo) {

  var htmlGrafico = "";
  var totalBarra  = listaMeses.length;

  // Limitar la cantidad de barras visibles para no saturar el gráfico
  var limiteBarras = totalBarra <= 24 ? totalBarra : 24;

  for (var i = 0; i < limiteBarras; i++) {

    // Calcular el porcentaje de altura respecto al valor máximo
    var porcentaje = maximo > 0 ? Math.round((listaAhorros[i] / maximo) * 100) : 0;

    // Altura mínima de 4px para que siempre sea visible
    if (porcentaje < 3) porcentaje = 3;

    htmlGrafico += '<div class="barra-contenedor">';
    htmlGrafico += '  <div class="barra" style="height: ' + porcentaje + '%;" title="Mes ' + listaMeses[i] + ': Bs. ' + listaAhorros[i] + '"></div>';
    htmlGrafico += '  <span class="barra-etiqueta-mes">M' + listaMeses[i] + '</span>';
    htmlGrafico += '</div>';
  }

  // Si hay más meses que barras mostradas, agregar nota
  if (totalBarra > limiteBarras) {
    htmlGrafico += '<div class="barra-contenedor" style="justify-content:center;color:#8a8a8f;font-size:12px;">...</div>';
  }

  // Mostrar el gráfico usando getElementById
  document.getElementById("grafico").innerHTML = htmlGrafico;
}


// ------------------------------------------------
// FUNCIÓN: construirTabla()
// Rellena la tabla con el detalle mes a mes
// ------------------------------------------------
function construirTabla(listaMeses, listaAhorros, listaTotales, totalFinal) {

  var htmlFilas = "";

  for (var i = 0; i < listaMeses.length; i++) {

    // Calcular el porcentaje acumulado para la barra de progreso
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

  // Fila de total al final de la tabla
  htmlFilas += '<tr style="background: #e8f5ec;">';
  htmlFilas += '  <td colspan="2"><strong>💰 TOTAL AHORRADO</strong></td>';
  htmlFilas += '  <td><strong>Bs. ' + totalFinal.toLocaleString() + '</strong></td>';
  htmlFilas += '  <td></td>';
  htmlFilas += '</tr>';

  // Usar getElementById para mostrar las filas en el cuerpo de la tabla
  document.getElementById("cuerpoTabla").innerHTML = htmlFilas;
}


// ------------------------------------------------
// FUNCIÓN: limpiarResultados()
// Oculta la sección de resultados y limpia el formulario
// ------------------------------------------------
function limpiarResultados() {

  // Limpiar el campo de entrada usando getElementById
  document.getElementById("meses").value = "";

  // Ocultar la sección de resultados
  document.getElementById("resultadoSeccion").classList.add("oculto");

  // Ocultar cualquier mensaje de error
  document.getElementById("mensajeError").classList.add("oculto");
  document.getElementById("mensajeError").textContent = "";

  // Limpiar el contenido generado para evitar datos antiguos
  document.getElementById("resumenCards").innerHTML  = "";
  document.getElementById("grafico").innerHTML       = "";
  document.getElementById("cuerpoTabla").innerHTML   = "";

  // Volver al inicio suavemente
  document.getElementById("encabezado").scrollIntoView({ behavior: "smooth" });
}


// ------------------------------------------------
// EVENTO: permitir calcular con la tecla Enter
// ------------------------------------------------
document.getElementById("meses").addEventListener("keydown", function(evento) {
  if (evento.key === "Enter") {
    calcularAhorro();
  }
});
