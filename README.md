# 💰 Ahorro Progresivo con Fibonacci

**Desafío Web 2025 — Matemáticas que resuelven problemas**

## 📌 Descripción

Página web interactiva que aplica la **Serie de Fibonacci** para simular un plan de ahorro progresivo. El usuario ingresa la cantidad de meses y la página calcula cuánto ahorrará mes a mes siguiendo el patrón matemático de Fibonacci.

## 🌐 Enlaces

- 📁 **Repositorio:** [github.com/Ariel805/DesafioFibonacci](https://github.com/Ariel805/DesafioFibonacci)
- 🌍 **Página publicada:** [Ariel805.github.io/DesafioFibonacci](https://Ariel805.github.io/DesafioFibonacci)

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura de la página |
| CSS3 | Diseño visual y responsivo |
| JavaScript (puro) | Lógica de Fibonacci y manejo del formulario |
| Git / GitHub | Control de versiones |
| GitHub Pages | Publicación en la web |

## 📂 Estructura del proyecto

```
desafio-fibonacci/
│
├── index.html          ← Página principal
├── css/
│   └── estilos.css     ← Estilos y diseño responsivo
├── js/
│   └── script.js       ← Lógica de Fibonacci
└── README.md           ← Este archivo
```

## ▶️ Cómo usar

1. Abre la página en tu navegador.
2. Ingresa el número de meses en el formulario.
3. Haz clic en **"Calcular mi Ahorro"**.
4. Observa la tabla, el gráfico y el resumen generado.

## 🔢 Algoritmo de Fibonacci

```javascript
let a = 1;  // Mes 1
let b = 1;  // Mes 2
let c;      // Siguiente valor

for (let i = 3; i <= meses; i++) {
    c = a + b;   // Suma de los dos anteriores
    a = b;
    b = c;
}
```

## ✅ Criterios cumplidos

- [x] Contexto del problema real explicado
- [x] Algoritmo de Fibonacci implementado y explicado
- [x] Formulario de entrada con `getElementById`
- [x] Botón de ejecución
- [x] Resultados mostrados en pantalla (tabla + gráfico)
- [x] Diseño responsivo (móvil, tablet, escritorio)
- [x] Código organizado en HTML, CSS y JS separados
- [x] Repositorio Git entregado
- [x] Página publicada en la web
