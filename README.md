# Tripleten web_project_around

## Descripción del Proyecto

Este proyecto es una implementación front-end de una página web interactiva tipo galería de imágenes. Permite a los usuarios ver una colección de tarjetas de imágenes, interactuar con ellas (dar "me gusta" y eliminar) y modificar cierta información en la página a través de ventanas emergentes (popups).

Las funcionalidades principales incluyen:

- Visualización de una galería de imágenes inicial.
- Opción de dar "Me gusta" a las tarjetas.
- Funcionalidad para eliminar tarjetas de la galería.
- Un popup para editar la información del perfil del usuario (nombre y "Acerca de mí").
- Un popup para añadir nuevas tarjetas de imágenes a la galería, incluyendo validación de los campos del formulario.
- Ventanas emergentes (popups) modales que se pueden cerrar haciendo clic fuera de ellas o presionando la tecla "Esc".

## Funcionalidad Implementada

El proyecto cumple con las siguientes funcionalidades:

- Carga inicial de 6 tarjetas de imágenes dinámicamente a través de JavaScript.
- Formularios de edición de perfil y adición de nuevas tarjetas completamente funcionales, incluyendo la apertura y cierre de sus respectivos popups.
- Validación de formularios en tiempo real utilizando JavaScript, con retroalimentación visual para el usuario.
- Estado del botón de envío ("Guardar") controlado por el estado de validación del formulario.
- Funcionalidad de "Me gusta" y eliminación de tarjetas interactiva.
- Visualización de imágenes en un popup al hacer clic en ellas, manteniendo la proporción de aspecto.

## Tecnologías y Técnicas Utilizadas

- **HTML5:** Estructura semántica de la página.
- **CSS3:** Estilizado y diseño responsivo de la interfaz.
  - Metodología **BEM (Block-Element-Modifier)** para la organización y nomenclatura de clases CSS.
  - Uso de **Flexbox** y **CSS Grid** para la maquetación.
  - Media Queries para el diseño responsivo.
- **JavaScript (ES6+):** Implementación de la interactividad y la lógica de la aplicación.
  - Programación Orientada a Objetos (POO) utilizando **Clases de ES6** (`Card`, `FormValidator`, `Popup`, `PopupWithForm`, `PopupWithImage`, `Section`, `UserInfo`).
  - Uso de **módulos JavaScript** para organizar el código en archivos separados e importarlos en `index.js`.
  - Manipulación del DOM para renderizar elementos y manejar eventos.
  - Validación de formularios utilizando las APIs de validación nativas de HTML5 y JavaScript (`ValidityState`).

## Despliegue

El proyecto está desplegado en GitHub Pages y puede ser accedido a través del siguiente enlace:
[https://pabloalvzpx.github.io/web_project_around/]

## Autor

Pablo Alvarez

---
