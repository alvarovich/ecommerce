# PIXELRIFT — Ecommerce de Juegos Indie

Ecommerce de juegos independientes desarrollado con HTML, CSS y JavaScript como actividad de la asignatura **Lenguajes de Marcas y Sistemas de Gestión de Información**.

## Funcionalidades JS implementadas

- **Gestión del carrito** — `addToCart(id)` guarda productos en un array y gestiona cantidades
- **Cálculo del total** — `calculateSubtotal()` y `calculateShipping()` suman precios e incluyen lógica de envío gratuito a partir de 25 €
- **Filtrado por categoría** — filtra el catálogo por género (Acción, Aventura, Roguelike, Puzzle, RPG)
- **Ordenación por precio** — `sortProducts()` usa `Array.sort()` para ordenar de menor a mayor
- **Simulación de sesión** — `login()` / `logout()` con credenciales demo (`indie` / `1234`)

## Técnicas CSS

- Variables CSS (`:root`)
- Layout con **CSS Grid** y **Flexbox**
- **Media Queries** (1024px, 768px, 480px)
- Animaciones con `@keyframes`

## Estructura

```
ecommerce/
├── index.html
├── styles.css
└── app.js
```
