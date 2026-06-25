# Créditos del Proyecto

Este proyecto ha sido desarrollado como parte del curso **IF7102 – Multimedios** de la carrera de Informática Empresarial de la **Universidad de Costa Rica**, en la Sede Regional de Guanacaste. La plataforma representa el esfuerzo por integrar tecnologías nativas del desarrollo web para construir soluciones interactivas, accesibles y robustas adaptadas al sector turístico de Costa Rica.

---

## Integrantes

La siguiente tabla resume los datos de los estudiantes responsables del análisis, diseño y desarrollo de la plataforma:

| Integrante | Rol / Responsabilidad Principal | 
| 
| **Francela Elizondo Granados** | Codiseñadora de interfaz y Desarrolladora Frontend |  |
| **Steven Rodríguez Chacón** | Arquitecto de componentes y Desarrollador Frontend | `

---

## Distribución del Trabajo

El desarrollo de este proyecto se llevó a cabo bajo un enfoque colaborativo y ágil. Ambos integrantes se involucraron activamente en todas las etapas del ciclo de vida del software, incluyendo el análisis de requisitos, diseño de interfaces, implementación técnica de Custom Elements, control de calidad (pruebas en diversos navegadores) y la redacción de la documentación técnica final.

A continuación se detallan las contribuciones específicas y aportes principales de cada miembro:

| Integrante | Principales Aportes y Tareas Realizadas |

| **Francela Elizondo Granados** | <ul><li>Análisis de requerimientos funcionales y diseño de la estructura del JSON de destinos.</li><li>Maquetación HTML semántica y definición de estilos CSS base responsivos.</li><li>Implementación y desarrollo del componente de navegación `<app-header>`.</li><li>Pruebas de visualización en dispositivos móviles y validación de adaptabilidad.</li></ul> |
| **Steven Rodríguez Chacón** | <ul><li>Arquitectura técnica y diseño lógico de comunicación mediante Custom Events.</li><li>Desarrollo de los Custom Elements `<destino-card>`, `<destino-detalle>` y `<galeria-imagenes>`.</li><li>Implementación de la síntesis de voz mediante Web Speech API en `<audio-guia>`.</li><li>Integración general de la aplicación y depuración de bugs de estilos Shadow DOM.</li></ul> |

---

## Tecnologías Utilizadas

La solución tecnológica se fundamenta en el uso exclusivo de estándares y APIs nativas del navegador, garantizando un alto rendimiento y compatibilidad sin requerir librerías o frameworks de terceros:

*   **HTML5:** Estructuración de marcado semántico y definición de plantillas (templates) para componentes.
*   **CSS3:** Estilos responsivos basados en Flexbox/Grid, animaciones nativas y tokens de temas mediante Custom Properties (Variables CSS).
*   **JavaScript ES6+:** Programación orientada a objetos (clases) para los componentes y modularización mediante ES Modules.
*   **Web Components API:** Registro de elementos personalizados a través del ciclo de vida del DOM de la API nativa.
*   **Shadow DOM:** Encapsulación lógica y aislamiento visual de estilos en cada componente.
*   **Custom Events API:** Mecanismo asíncrono y desacoplado para la propagación de eventos y estados de la aplicación.
*   **Fetch API:** Carga asíncrona de datos en formato JSON en tiempo de ejecución.
*   **JSON:** Modelo estructurado para el almacenamiento persistente de los destinos turísticos.
*   **Web Speech API:** Generación dinámica de la narración auditiva mediante la interfaz `SpeechSynthesis`.
*   **Git:** Sistema de control de versiones distribuido para el seguimiento del código.
*   **GitHub:** Plataforma de alojamiento de código para el desarrollo en equipo.
*   **GitHub Pages:** Servicio de alojamiento estático para el despliegue en vivo de la aplicación.

---

## Recursos Multimedia

Todos los activos multimedia integrados en la guía turística se gestionan de la siguiente manera:

1.  **Imágenes:** Las fotografías y recursos visuales de los destinos turísticos (portadas y galerías) se obtuvieron de bancos de imágenes de libre uso (Pexels y Unsplash) y son implementados únicamente con fines didácticos e instructivos de carácter educativo.
2.  **Videos:** Los videos de promoción son enlaces públicos de YouTube y se consumen externamente, abriéndose de manera segura en pestañas nuevas.
3.  **Audio-Guía:** La narración de voz se genera en tiempo real utilizando la API nativa `SpeechSynthesis` del navegador, por lo que el repositorio no almacena ni requiere la descarga de pesados archivos de audio pregrabados en disco.

---

## Herramientas de Desarrollo y Apoyo

Durante la planificación y ejecución del proyecto, se utilizaron las siguientes herramientas tecnológicas:

*   **Visual Studio Code:** Editor de código fuente principal para la programación del proyecto.
*   **Git & GitHub:** Control de versiones, ramas de desarrollo y respaldo del proyecto.
*   **Google Chrome:** Navegador web de pruebas principal, aprovechando Chrome DevTools para la inspección del Shadow DOM.
*   **PlantUML:** Herramienta utilizada para la construcción y modelado de diagramas de secuencia e interacciones de componentes.
*   **Markdown:** Formato de lenguaje ligero para la elaboración de la documentación técnica y bitácoras del proyecto.
*   **Antigravity:** Asistente inteligente y agente de IA integrado, empleado para la estructuración de la documentación técnica, diagramación en markdown y apoyo en la organización de los archivos del repositorio.
*   **ChatGPT:** Modelo de lenguaje utilizado como soporte interactivo para la revisión de código, redacción de comentarios en español y refactorización de estilos.

---

## Agradecimientos

Agradecemos sinceramente al profesor del curso IF7102 – Multimedios, el **Lic. Alonso Chavarría Cubero**, por su constante orientación académica, realimentación constructiva y dedicación a lo largo del ciclo lectivo. Su guía fue de gran valor para comprender la arquitectura de Web Components modernos y la aplicación correcta de las APIs multimedia en entornos profesionales del desarrollo web.

---

## Licencia

Este proyecto fue desarrollado exclusivamente con fines académicos para el curso IF7102 – Multimedios de la Universidad de Costa Rica. No está destinado para uso comercial.