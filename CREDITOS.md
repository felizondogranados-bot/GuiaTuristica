# Créditos y Atribuciones del Proyecto

Este proyecto ha sido desarrollado como parte del curso **IF7102 – Multimedios** de la carrera de Informática Empresarial de la **Universidad de Costa Rica**, en la Sede Regional de Guanacaste (Recinto de Liberia). La plataforma representa el esfuerzo por integrar tecnologías nativas del desarrollo web para construir soluciones interactivas, accesibles y robustas adaptadas al sector turístico de Costa Rica.

---

## 👥 Integrantes y Responsabilidades

La siguiente tabla resume los datos de los estudiantes responsables del análisis, diseño, arquitectura e implementación de la plataforma:

| Integrante | Rol Principal | Contribución en el Proyecto |
| :--- | :--- | :--- |
| **Francela Elizondo Granados** | Diseñadora UI/UX & Desarrolladora Frontend | <ul><li>Análisis de requerimientos funcionales y diseño de la estructura del JSON de destinos.</li><li>Maquetación HTML semántica y definición de estilos CSS base responsivos ("Pura Vida").</li><li>Implementación y desarrollo del componente de navegación `<app-header>`.</li><li>Pruebas de adaptabilidad en dispositivos móviles y modos de visualización.</li></ul> |
| **Steven Rodríguez Chacón** | Arquitecto de Componentes & Desarrollador Frontend | <ul><li>Arquitectura técnica y diseño lógico de comunicación mediante Custom Events.</li><li>Desarrollo de los Custom Elements `<mapa-costa-rica>`, `<destino-card>`, `<destino-detalle>` y `<galeria-imagenes>`.</li><li>Implementación de la reproducción de audio y síntesis de voz en `<audio-guia>`.</li><li>Integración general de la aplicación, optimización gráfica y Shadow DOM.</li></ul> |

---

## 🛠️ Tecnologías y Estándares Utilizados

La solución tecnológica se fundamenta en el uso exclusivo de estándares y APIs nativas del navegador, garantizando un alto rendimiento y compatibilidad sin requerir librerías o frameworks de terceros:

* **HTML5**: Estructuración de marcado semántico y definición de plantillas para componentes.
* **CSS3 (Custom Properties)**: Estilos responsivos basados en Flexbox/Grid, animaciones de paralaje, temas regionales y modo oscuro tropical nocturno (`data-theme="dark"`).
* **JavaScript ES6+**: Programación orientada a objetos (clases) para Custom Elements y modularización mediante ES Modules (`import`/`export`).
* **Web Components API**: Registro de elementos personalizados a través de `customElements.define` y la gestión del ciclo de vida del DOM.
* **Shadow DOM v1**: Encapsulación lógica y aislamiento de estilos CSS dentro de cada componente en modo `open`.
* **Custom Events API**: Mecanismo asíncrono y desacoplado para la propagación de eventos (`region-selected`, `destino-selected`, `destino-cerrado`).
* **Fetch API**: Carga asíncrona de datos en formato JSON en tiempo de ejecución.
* **APIs Multimedia Nativas**: Uso nativo de `<audio>`, `<video>` y `SpeechSynthesis` para la audio-guía.

---

## 🎨 Recursos Multimedia y Licencias

Todos los activos multimedia integrados en la guía turística han sido seleccionados respetando las normativas de propiedad intelectual y licencias abiertas:

1. **Cartografía Vectorial (`cantones_real.svg`)**:
   - **Fuente**: Wikimedia Commons (Mapa vectorial oficial de los Cantones de Costa Rica).
   - **Licencia**: Creative Commons Attribution-ShareAlike (CC BY-SA 3.0 / CC BY-SA 4.0).
   - **Uso**: Vectorización y agrupación por regiones en el componente `<mapa-costa-rica>`.
2. **Fotografías e Imágenes**:
   - **Fuente**: Bancos de imágenes de libre uso (Pexels y Unsplash).
   - **Licencia**: Licencia Pexels / Unsplash (Uso libre para proyectos educativos y no comerciales).
3. **Videos Turísticos**:
   - **Fuente**: Enlaces públicos en YouTube de promoción turística costarricense.
   - **Uso**: Apertura externa segura mediante navegación directa.
4. **Audio-Guías**:
   - **Mecanismo**: Generación dinámica en tiempo real utilizando la API nativa `SpeechSynthesis` en español (`es-ES`), garantizando que la aplicación no requiera descargas pesadas de audio.

---

## 💻 Herramientas de Desarrollo y Apoyo

Durante la planificación y ejecución del proyecto, se utilizaron las siguientes herramientas tecnológicas:

* **Visual Studio Code**: Editor de código fuente principal.
* **Git & GitHub**: Control de versiones, ramas de desarrollo y hospedaje de código.
* **Google Chrome & DevTools**: Inspección del Shadow DOM, pruebas de accesibilidad y depuración de rendimiento.
* **Markdown & Mermaid**: Redacción de la documentación técnica e ilustración de diagramas de componentes.
* **Herramientas de IA y Asistencia (Antigravity & ChatGPT)**: Empleadas de acuerdo con la Sección 9 de las Consideraciones Académicas para la estructuración de la documentación técnica en markdown, diagramación y optimización gráfica.

---

## 👏 Agradecimientos

Agradecemos al profesor del curso IF7102 – Multimedios, el **Lic. Alonso Chavarría Cubero**, por su valiosa orientación académica, retroalimentación constante y dedicación en la enseñanza de las tecnologías web nativas.

---

## ⚖️ Licencia Académica

Este proyecto fue desarrollado exclusivamente con fines académicos para el curso IF7102 – Multimedios de la Universidad de Costa Rica (I Ciclo 2026). No está destinado para uso comercial.