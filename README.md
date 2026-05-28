# Matemáticas Aplicadas a Problemas Reales

**Desafío Web 2025 - Fibonacci, números primos y Fibonacci primos**

## Descripción

Proyecto web interactivo con tres páginas educativas. Cada una resuelve un problema de la vida real usando una idea matemática: la Serie de Fibonacci, los números primos y la combinación de ambos.

## Páginas incluidas

| Archivo | Tema | Problema que resuelve |
|---|---|---|
| `index.html` | Menú principal | Interfaz con 3 botones para entrar a cada resolución |
| `fibonacci.html` | Serie de Fibonacci | Plan de ahorro progresivo mes a mes |
| `primos.html` | Números primos | Verificador educativo de seguridad de PIN |
| `combinado.html` | Fibonacci + primos | Explorador de números Fibonacci primos |

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 | Diseño moderno, responsivo y coherente entre páginas |
| JavaScript puro | Cálculos, validaciones, tablas y gráficos |
| Google Fonts | Tipografías Merriweather y Nunito |

## Estructura del proyecto

```text
DesafioFibonacci/
├── index.html
├── fibonacci.html
├── primos.html
├── combinado.html
├── styles/
│   └── estilos.css
├── JS/
│   ├── fibonacci.js
│   ├── primos.js
│   └── combinado.js
└── README.md
```

## Cómo usar

1. Abre `index.html` en el navegador.
2. Elige una de las tres opciones.
3. Ingresa los datos solicitados en la calculadora.
4. Revisa el resumen, el gráfico y la tabla generada.

## Ejemplos de prueba

| Página | Entrada sugerida | Resultado esperado |
|---|---:|---|
| Fibonacci | `6` meses | Total acumulado: `Bs. 20` |
| Primos | `7919` | Es primo y obtiene nivel alto si no presenta patrones comunes |
| Combinado | `23` términos | Encuentra Fibonacci primos como `2`, `3`, `5`, `13`, `89`, `233`, `1597` y `28657` |

## Criterios cumplidos

- [x] Problemas de la vida real explicados.
- [x] Algoritmos descritos paso a paso.
- [x] Formularios con entradas del usuario.
- [x] Uso de `getElementById` en JavaScript.
- [x] Botones de ejecución y limpieza.
- [x] Resultados mostrados en tarjetas, gráficos y tablas.
- [x] Diseño responsivo para móvil, tablet y escritorio.
- [x] Archivos HTML, CSS y JS separados.

## Nota de seguridad

La página de PIN es educativa. No se debe ingresar un PIN bancario real. La seguridad real de tarjetas, pagos digitales y sistemas bancarios depende de protocolos completos, no solo de que un número sea primo.
