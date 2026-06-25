# Guía Turística Multimedia de Costa Rica

Bienvenido a la **Guía Turística Multimedia de Costa Rica**, una aplicación web interactiva diseñada para explorar la riqueza natural, cultural y recreativa de diversas regiones de Costa Rica. La plataforma ofrece una experiencia inmersiva mediante el uso de tecnologías web nativas, integrando recursos fotográficos, mapas de ubicación y narración de voz dinámica.

---

## Descripción General del Proyecto

Esta plataforma es una aplicación web interactiva basada en **Web Components nativos** (sin dependencias de frameworks externos como React o Angular), diseñada para funcionar directamente en el navegador. La aplicación organiza los destinos turísticos costarricenses en cuatro regiones principales: **Guanacaste**, **Caribe**, **Central** y **Pacífico Sur**. 

Cada región cuenta con un tema de diseño visual específico y adaptativo. Los usuarios pueden visualizar destinos turísticos representativos, consultar sus detalles, navegar por galerías fotográficas, escuchar una descripción narrada de viva voz generada en tiempo real y acceder a videos informativos.

---

## Objetivo

El objetivo principal de este proyecto es implementar una plataforma turística interactiva de alto impacto visual y sonoro, aplicando estándares modernos de desarrollo web del lado del cliente. Se enfoca en el uso del **Shadow DOM**, **Custom Elements** y **Custom Events** para estructurar una aplicación modular, reutilizable y escalable que optimice el consumo de recursos multimedia y promueva la accesibilidad.

---

## Funcionalidades

✔ Explorar destinos turísticos
✔ Filtrar por región
✔ Visualizar detalles completos
✔ Galería de imágenes
✔ Narración mediante voz
✔ Visualización de ubicación
✔ Acceso a videos turísticos
✔ Diseño responsivo

---

## Características Principales

*   **Modularidad con Web Components:** Estructuración limpia basada en 5 Custom Elements reutilizables y autocontenidos.
*   **Encapsulación Completa (Shadow DOM):** Aislamiento total de estilos CSS y marcado HTML dentro de cada componente para prevenir colisiones globales.
*   **Temas Dinámicos y Regionales:** Adaptación en tiempo real del esquema de color y variables CSS de la aplicación dependiendo de la región seleccionada.
*   **Carga Dinámica de Datos:** Consumo asíncrono de destinos desde un archivo centralizado en formato JSON (`destinos.json`).
*   **Narración por Voz Integrada:** Soporte nativo para lectura en voz alta (Text-to-Speech) de las descripciones turísticas a través de la API Web Speech del navegador.
*   **Galerías Interactivas:** Carruseles fotográficos autogestionados con soporte para controles táctiles, visuales y navegación por teclado.
*   **Diseño 100% Responsivo:** Interfaz adaptada a dispositivos móviles, tabletas y computadoras de escritorio usando CSS Grid y Flexbox.
*   **Información Geográfica y Multimedia:** Inclusión de coordenadas geográficas de los destinos y enlaces a videos promocionales en YouTube.

---

## Tecnologías Utilizadas

La aplicación ha sido desarrollada utilizando estándares web modernos y nativos:

| Tecnología | Descripción y Uso en el Proyecto |
| :--- | :--- |
| **HTML5** | Definición del esqueleto semántico del sitio y declaración de los contenedores para Custom Elements. |
| **CSS3 (Custom Properties)** | Definición de tokens de diseño, transiciones, animaciones avanzadas y media queries para el diseño responsivo. |
| **JavaScript ES6+** | Lógica de negocio, consumo de datos asíncronos (`Fetch API`), módulos nativos (`ES Modules`) y registro de componentes. |
| **Web Components API** | Creación y registro de Custom Elements a través de `customElements.define` y el ciclo de vida del elemento. |
| **Shadow DOM v1** | Encapsulamiento del DOM en modo `open` para aislar estilos CSS y estructura interna en cada componente. |
| **Custom Events API** | Mecanismo de comunicación desacoplado entre componentes y la aplicación principal para control de eventos. |
| **Web Speech API** | Utilización de `speechSynthesis` y `SpeechSynthesisUtterance` para la generación local de la narración de audio. |

---

## Arquitectura del Proyecto

El proyecto implementa una arquitectura basada en componentes desacoplados coordinados por un controlador central (`index.html`). Los datos residen de forma externa en un JSON de destinos. La comunicación se realiza de forma ascendente mediante **Custom Events** y de forma descendente mediante la actualización de **Atributos Observados** y métodos expuestos por los componentes.

### Diagrama de Componentes y Flujo de Datos

```mermaid
graph TD
    A[index.html (Controlador Principal)] --> B[app-header (Selector de Regiones)]
    A --> C[destino-card Grid (Muestrario de Tarjetas)]
    A --> D[destino-detalle (Modal Detallado)]
    
    subgraph Data Flow
        F[(destinos.json)] -- Fetch API --> A
    end

    subgraph Event Flow
        B -- "Emite 'region-selected'" --> A
        C -- "Emite 'destino-selected'" --> A
        D -- "Emite 'destino-cerrado'" --> A
    end

    subgraph Modal Internals
        D --> E[galeria-imagenes (Carrusel)]
        D --> G[audio-guia (Narrador de Voz)]
    end
```

#### Estructura de Flujo del Sistema (Modo Texto)

```text
index.html
      │
      ▼
destinos.json
      │
      ▼
 app-header
      │
      ▼
 destino-card
      │
      ▼
 destino-detalle
     ├────────► galeria-imagenes
     ├────────► audio-guia
     └────────► Video YouTube
```

---

## Estructura Completa del Proyecto

A continuación se detalla la distribución de los archivos dentro del repositorio:

```text
GuiaTuristica/
├── index.html                  # Controlador central y maquetación general de la página
├── CREDITOS.md                 # Atribuciones y referencias de recursos utilizados
├── README.md                   # Documentación final de entrega del proyecto
├── assets/                     # Carpeta contenedora de recursos estáticos del proyecto
│   ├── audio/                  # Archivos de audio (si aplica)
│   ├── img/                    # Banco de imágenes locales utilizadas para los destinos
│   └── video/                  # Recursos de video local (si aplica)
├── components/                 # Definición JavaScript de los Custom Elements
│   ├── app-header.js           # Navegación por regiones y manejo de variables de temas
│   ├── audio-guia.js           # Lector de voz basado en Web Speech API
│   ├── destino-card.js         # Tarjeta de vista previa para el catálogo de destinos
│   ├── destino-detalle.js      # Modal contenedor del desglose de información turística
│   └── galeria-imagenes.js     # Galería de fotos con soporte de navegación
├── css/                        # Estilos globales y configuraciones iniciales
│   └── global.css              # Reglas de estilo globales, reset y fuentes tipográficas
└── data/                       # Almacenamiento de datos del aplicativo
    └── destinos.json           # Base de datos JSON de destinos turísticos
```

---

## Explicación de cada Web Component

La aplicación se compone de cinco componentes independientes basados en la clase nativa `HTMLElement`. Cada uno posee una responsabilidad específica:

### 1. `<app-header>`
*   **Archivo:** `components/app-header.js`
*   **Propósito:** Proporcionar la barra de navegación del sitio, permitiendo al usuario cambiar de región turística. Adicionalmente, posee la configuración de los temas visuales regionales e inyecta dinámicamente propiedades CSS personalizadas (`--primary-color`, `--bg-color`, `--text-color`, `--accent`) en el elemento `:host`.
*   **Atributos Observados:** `active-region`.
*   **Eventos Emitidos:** `region-selected` al cambiar la pestaña activa.

### 2. `<destino-card>`
*   **Archivo:** `components/destino-card.js`
*   **Propósito:** Representar de manera gráfica un destino individual en el catálogo. Incluye una imagen de portada con efecto hover de escala, un distintivo de la región y un botón de llamada a la acción ("Explorar").
*   **Atributos Observados:** `destino-id`, `nombre`, `region`, `imagen`, `descripcion`.
*   **Eventos Emitidos:** `destino-selected` al presionar la tarjeta, adjuntando la información correspondiente.

### 3. `<destino-detalle>`
*   **Archivo:** `components/destino-detalle.js`
*   **Propósito:** Actuar como ventana modal superpuesta para el desglose detallado de un destino. Incorpora secciones de información textual (descripción y actividades), la integración de los componentes de audio y galería, datos de latitud y longitud, y un reproductor de video de YouTube.
*   **Atributos Observados:** `destino-id`, `visible`, `region`.
*   **Eventos Emitidos:** `destino-cerrado` cuando se cierra la ventana modal.

### 4. `<galeria-imagenes>`
*   **Archivo:** `components/galeria-imagenes.js`
*   **Propósito:** Implementar una galería de imágenes interactiva en formato carrusel dentro del modal de detalle. Cuenta con botones físicos para retroceder o avanzar de imagen, indicadores de puntos para ir a una imagen directamente, transiciones suaves de opacidad y soporte de accesibilidad mediante el teclado.
*   **Atributos Observados:** `imagenes` (recibe un array serializado en formato JSON), `titulo`.

### 5. `<audio-guia>`
*   **Archivo:** `components/audio-guia.js`
*   **Propósito:** Este componente utiliza la API nativa SpeechSynthesis del navegador para convertir automáticamente la descripción textual del destino en una narración de voz, proporcionando una experiencia multimedia accesible sin depender de archivos de audio pregrabados. Presenta controles interactivos de reproducción ("Reproducir" y "Detener").
*   **Atributos Observados:** `texto`, `titulo`, `descripcion`, `region`.

---

## Explicación de los Custom Events

Para lograr el desacoplamiento de componentes, se implementan eventos personalizados que notifican cambios de estado importantes. Todos usan las banderas `bubbles: true` y `composed: true` para poder propagarse y atravesar las barreras del Shadow DOM hasta llegar al archivo `index.html`.

| Evento | Emitido por | Escuchado por | Payload (`detail`) | Propósito |
| :--- | :--- | :--- | :--- | :--- |
| **`region-selected`** | `<app-header>` | `index.html` | `{ region: string, theme: Object }` | Notificar que el usuario ha seleccionado otra región geográfica. El controlador principal filtra el grid de destinos e inyecta la nueva selección. |
| **`destino-selected`** | `<destino-card>` | `index.html` | `{ destino: Object }` | Enviar los datos del destino sobre el cual se hizo clic. Permite al controlador cargar dicha información en el modal de detalle y mostrarlo. |
| **`destino-cerrado`** | `<destino-detalle>` | `index.html` | Ninguno | Comunicar que la ventana de detalle se ha cerrado para restablecer el foco visual y ocultar el modal de forma lógica. |

---

## Integración Multimedia

La aplicación destaca por su completa integración de recursos multimedia y de accesibilidad:

1.  **Imágenes y Galería:** Uso de imágenes optimizadas de portada y una galería de múltiples imágenes para cada sitio turístico, desplegadas mediante el componente `<galeria-imagenes>` con soporte para navegación interactiva (botones, indicadores y flechas del teclado).
2.  **Narración por Voz (Audio-Guía):** En lugar de depender de pesados archivos de audio pre-grabados, el componente `<audio-guia>` realiza una síntesis de voz digital local usando la API nativa de JavaScript `speechSynthesis` en idioma español (`es-ES`).
3.  **Videos de YouTube:** Los destinos configurados con URL de video presentan un botón interactivo dentro de su modal. Al presionarlo, el sistema ejecuta una apertura segura en una nueva pestaña del navegador hacia el video promocional del sitio.

---

## Guía de Instalación

El proyecto no requiere de gestores de dependencias como npm o yarn ni procesos de compilación, facilitando su puesta en marcha directa:

1.  **Descargar el Repositorio:**
    Clone el repositorio de GitHub en su máquina local:
    ```bash
    git clone https://github.com/felizondogranados-bot/GuiaTuristica.git
    ```
2.  **Abrir el Directorio:**
    Abra la carpeta descargada con su editor de código preferido (se recomienda **Visual Studio Code**).

---

## Cómo ejecutar el proyecto utilizando Live Server

Debido a que el navegador restringe las solicitudes HTTP asíncronas para archivos locales (política CORS al cargar `data/destinos.json` usando `file://`), es necesario servir el proyecto mediante un servidor web local.

**Pasos para ejecutar con Live Server en VS Code:**

1.  Vaya a la sección de **Extensiones** en VS Code (`Ctrl+Shift+X` o `Cmd+Shift+X` en macOS).
2.  Busque e instale la extensión **Live Server** creada por *Ritwick Dey*.
3.  Abra el archivo [index.html](file:///c:/Users/feliz/OneDrive/Documentos/GitHub/GuiaTuristica/index.html) de la aplicación.
4.  Haga clic derecho en cualquier sección de edición del archivo HTML y seleccione **"Open with Live Server"** (o presione el botón **"Go Live"** en la barra de estado inferior derecha de VS Code).
5.  El navegador se abrirá automáticamente en la dirección por defecto: `http://127.0.0.1:5500/index.html`.

---

## Cómo agregar nuevos destinos al JSON

Para extender la base de datos de destinos turísticos de la guía, simplemente debe editar el archivo [destinos.json](file:///c:/Users/feliz/OneDrive/Documentos/GitHub/GuiaTuristica/data/destinos.json) ubicado en la ruta `data/`.

### Estructura de un Objeto de Destino

Cada elemento de la lista debe respetar la siguiente estructura de atributos:

```json
{
  "id": "identificador-unico",
  "nombre": "Nombre del Destino Turístico",
  "region": "Nombre de la Región (Guanacaste / Caribe / Central / Pacífico Sur)",
  "descripcion": "Texto descriptivo detallado del lugar. Será leído en voz alta por el componente de audio.",
  "imagen_portada": "Ruta de la imagen de portada, ej: assets/img/nombre_archivo.jpg",
  "galeria": [
    "imagen_galeria_1.jpg",
    "imagen_galeria_2.jpg"
  ],
  "video": "URL completa del video promocional de YouTube",
  "actividades": [
    "Actividad 1",
    "Actividad 2",
    "Actividad 3"
  ],
  "lat": 9.99999,
  "lng": -84.99999
}
```

> [!IMPORTANT]
> El campo `region` debe coincidir exactamente con una de las cuatro regiones soportadas por el sistema (`Guanacaste`, `Caribe`, `Central`, `Pacífico Sur`) para que los estilos temáticos se apliquen correctamente y el destino aparezca en la pestaña indicada.

---

## Diseño Responsivo

La interfaz está construida bajo los conceptos de desarrollo móvil primero (*Mobile First*) y diseño adaptativo:

*   **Grid de Destinos:** Usa una rejilla CSS flexible con la propiedad `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, lo que reordena las tarjetas automáticamente según el ancho útil.
*   **Media Queries Adaptativas:**
    *   **Hasta 1024px (Tabletas en Horizontal):** Ajuste de espaciados y reducción de los márgenes globales de visualización.
    *   **Hasta 768px (Tabletas/Móviles en Vertical):** Reestructuración del encabezado (los botones de navegación se centran y colapsan en filas) y conversión de la vista de dos columnas del modal detalle en una sola columna vertical.
    *   **Hasta 480px (Móviles pequeños):** Ajuste en el tamaño de las fuentes principales (como el título del catálogo que pasa de `3.2rem` a `1.6rem`) para garantizar una lectura cómoda sin desbordamientos de pantalla.

---

##  Capturas de Pantalla

*(A continuación se presentan marcadores reservados para incorporar imágenes y capturas de pantalla de la interfaz final del proyecto).*

### 1. Vista de Catálogo de Destinos (Página de Inicio)
![Vista Principal de la Guía Turística](assets/screenshots/vista-principal.png)
*Descripción: Captura de pantalla que ilustra la barra superior con el selector de regiones activas y la visualización de la cuadrícula con las tarjetas turísticas.*

### 2. Modal de Detalle Multimedia (Destino Seleccionado)
![Vista del Detalle del Destino](assets/screenshots/vista-detalle.png)
*Descripción: Despliegue de la ventana modal informativa mostrando la portada regional, descripción del sitio, actividades, controles de la audio-guía con voz y la galería fotográfica.*

### 3. Visualización en Dispositivos Móviles (Diseño Responsivo)
![Diseño Responsivo en Móvil](assets/screenshots/vista-movil.png)
*Descripción: Captura en resolución móvil mostrando la adaptabilidad del encabezado de navegación por región y el colapso vertical del grid de tarjetas.*

---

## Integrantes

La siguiente tabla detalla la información de los autores que participaron en el diseño, desarrollo e implementación del presente proyecto:

| Nombre Completo | Carné / Identificación | Correo Electrónico | Contribución en el Proyecto |
| :--- | :--- | :--- | :--- |
| Steven Rodríguez Chacón | `[Completar Carné]` | `[Completar Correo]` | Desarrollo de Web Components, Estilos y Lógica |
| Francela Elizondo Granados | `[Completar Carné]` | felizondogranados@gmail.com | Desarrollo de Web Components, Estilos y Lógica |

---

## Información Académica y del Curso

*   **Institución:** Universidad de Costa Rica
*   **Carrera:** Carrera de Informática Empresarial
*   **Sede:** Sede Regional de Guanacaste
*   **Curso:** Curso IF7102 - Multimedios
*   **Profesor:** Lic. Alonso Chavarría Cubero
*   **Ciclo Lectivo:** [Ciclo Lectivo y Año, ej: I Ciclo 2026]

---

## Créditos y Atribuciones

Los recursos multimedia, imágenes libres de regalías de Pexels/Unsplash, herramientas de bocetado y diseño utilizadas para conceptualizar este proyecto se encuentran detallados de forma explícita en el archivo adjunto [CREDITOS.md](file:///c:/Users/feliz/OneDrive/Documentos/GitHub/GuiaTuristica/CREDITOS.md).

---

## Licencia

Este proyecto ha sido desarrollado con **fines académicos** y formativos para el curso IF7102 Multimedios de la Universidad de Costa Rica. Su distribución y uso se rigen por las políticas de propiedad intelectual y ética académica de la institución educativa.
