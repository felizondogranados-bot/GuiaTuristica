# Fase 2 - Guía Turística Multimedia de Costa Rica

## 📋 Requisitos Implementados

La Fase 2 ha sido completamente implementada con los siguientes componentes:

### ✅ 4 Custom Elements Definidos

1. **`<destino-card>`** (`components/destino-card.js`)
   - Tarjeta visual del destino
   - Shadow DOM con estilos encapsulados
   - Atributos observados: `destino-id`, `nombre`, `region`, `imagen`, `descripcion`
   - Emite evento: `destino-selected`
   - Efectos hover interactivos

2. **`<destino-detalle>`** (`components/destino-detalle.js`)
   - Vista detallada completa del destino
   - Shadow DOM con modal personalizado
   - Atributos observados: `destino-id`, `visible`
   - Integra `<galeria-imagenes>` y `<audio-guia>`
   - Muestra descripción, actividades, galería, audio y ubicación GPS

3. **`<galeria-imagenes>`** (`components/galeria-imagenes.js`)
   - Galería de imágenes interactiva
   - Shadow DOM completamente encapsulado
   - Atributos observados: `imagenes`, `titulo`
   - Controles: botones anterior/siguiente y puntos indicadores
   - Animaciones suaves de transición
   - Soporte para teclado (flechas)

4. **`<audio-guia>`** (`components/audio-guia.js`)
   - Reproductor de audio personalizado
   - Shadow DOM con estilos profesionales
   - Atributos observados: `src`, `titulo`, `descripcion`
   - Controles: play/pause, barra de progreso, volumen
   - Displays de tiempo actual y duración

### ✅ Shadow DOM Aplicado

Todos los componentes utilizan Shadow DOM en modo `'open'`:
```javascript
this.attachShadow({ mode: 'open' });
```

Los estilos están completamente encapsulados dentro de cada componente, evitando conflictos CSS globales.

### ✅ Atributos Observados

Cada componente implementa `observedAttributes`:

```javascript
static get observedAttributes() {
    return ['atributo1', 'atributo2', ...];
}

attributeChangedCallback(name, oldVal, newVal) {
    // Reacciona a cambios de atributos
}
```

### ✅ Carga Dinámica desde JSON

El `index.html` carga destinos con `fetch()`:

```javascript
const response = await fetch('./data/destinos.json');
const destinosGlobales = await response.json();
```

### ✅ Eventos Personalizados

- `region-selected`: Emitido por `<app-header>` cuando cambia la región
- `destino-selected`: Emitido por `<destino-card>` cuando se selecciona un destino
- `destino-cerrado`: Emitido por `<destino-detalle>` cuando se cierra

## 🚀 Cómo Usar

### 1. Instalación
El proyecto no requiere instalación de dependencias. Solo necesitas:
- VS Code con Live Server
- Un navegador moderno (Chrome, Firefox, Edge, Safari)

### 2. Ejecutar el Proyecto
```bash
# Abre la carpeta en VS Code
# Click derecho en index.html > "Open with Live Server"
```

O accede a: `http://localhost:5500` (o el puerto que use Live Server)

### 3. Estructura de Carpetas
```
proyecto-guia-turistica/
├── index.html              # Página principal
├── data/
│   └── destinos.json      # Base de datos de destinos
├── components/
│   ├── app-header.js      # Navegación por región
│   ├── destino-card.js    # Tarjeta de destino
│   ├── destino-detalle.js # Vista detalle
│   ├── galeria-imagenes.js # Galería
│   └── audio-guia.js      # Reproductor de audio
├── assets/
│   ├── img/               # Imágenes de destinos
│   ├── audio/             # Archivos de audio
│   └── video/             # Archivos de video
├── css/
│   └── global.css         # Estilos globales
├── CREDITOS.md            # Créditos del proyecto
└── FASE_2_README.md       # Este archivo
```

## 📱 Características

### Responsive Design
- Funciona en móvil, tablet y escritorio
- Grid adaptable que se ajusta a cualquier pantalla
- Interfaz optimizada para touch en móviles

### Temas por Región
Cada región tiene su propio tema de color:
- **Guanacaste**: Oro/Sol (#f1c40f)
- **Caribe**: Atardecer (#e67e22)
- **Central**: Bosque (#2ecc71)
- **Pacífico Sur**: Océano (#3498db)

### Interactividad
- Tarjetas con efecto hover (levitación)
- Galería con navegación flecha/puntos
- Reproductor de audio con controles
- Modal animado del detalle
- Transiciones suaves

## 🎨 Personalización

### Agregar un Nuevo Destino

Edita `data/destinos.json`:

```json
{
    "id": "ejemplo-01",
    "nombre": "Nombre del Destino",
    "region": "Guanacaste",
    "descripcion": "Descripción aquí...",
    "imagen_portada": "assets/img/ejemplo.jpg",
    "galeria": ["img1.jpg", "img2.jpg"],
    "audio": "assets/audio/ejemplo.mp3",
    "video": "assets/video/ejemplo.mp4",
    "actividades": ["Actividad1", "Actividad2"],
    "lat": 10.1234,
    "lng": -85.1234
}
```

### Cambiar Colores

En `components/app-header.js`, modifica el objeto `themes`:

```javascript
this.themes = {
    'Guanacaste': {
        '--primary-color': '#f1c40f',
        '--bg-color': '#3e2c00',
        // ...
    }
};
```

## 🔧 Tecnologías Utilizadas

- **HTML5**: Semántica web y Custom Elements
- **CSS3**: Grid, Flexbox, gradientes, animaciones
- **JavaScript ES6+**: 
  - Web Components
  - Shadow DOM
  - Fetch API
  - CustomEvents
  - ES Modules

## ✨ Características Avanzadas

### 1. Encapsulación CSS
Cada componente tiene sus propios estilos que no afectan al resto:
```javascript
this.shadowRoot.innerHTML = `<style>/* estilos encapsulados */</style>`;
```

### 2. Gestión de Eventos
Comunicación limpia entre componentes:
```javascript
this.dispatchEvent(new CustomEvent('evento-personalizado', {
    detail: { data: value },
    bubbles: true,
    composed: true
}));
```

### 3. Propiedades Dinámicas
Los componentes pueden recibir datos mediante propiedades:
```javascript
const card = document.createElement('destino-card');
card.setDestino(destinoObject);
```

## 🐛 Solución de Problemas

### Las imágenes no cargan
- Verifica que existan archivos en `assets/img/`
- Usa rutas relativas correctas: `assets/img/nombre.jpg`

### El audio no funciona
- Asegúrate que los archivos de audio existan
- Formatos soportados: MP3, WAV, OGG

### El video no reproduce
- Agrega manualmente una implementación de reproductor HTML5
- O integra un reproductor como Plyr o Video.js

### Errores de CORS
- Asegúrate de usar Live Server, no abrir directo con `file://`

## 📚 Documentación

Cada componente tiene comentarios en español explicando su funcionamiento.

## 📝 Notas para la Entrega

Este proyecto cumple con todos los requisitos de la Fase 2:
- ✅ Mínimo 4 Custom Elements
- ✅ Shadow DOM aplicado a todos
- ✅ Atributos observados implementados
- ✅ HTML Templates (implícitos en el render)
- ✅ Carga dinámica desde JSON
- ✅ Eventos personalizados
- ✅ Diseño responsive
- ✅ Código limpio y comentado
- ✅ Uso exclusivo de tecnologías nativas

---

**Desarrollado con ❤️ para IF7102 - Multimedia Web**
