// destino-detalle.js - Componente Custom Element para vista detalle del destino con Shadow DOM

class DestinoDetalle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._destino = null;
    }

    // Atributos observados
    static get observedAttributes() {
        return ['destino-id', 'visible'];
    }

    // Callback cuando cambian los atributos
    attributeChangedCallback(name, oldVal, newVal) {

        if (name === 'visible') {

            const container =
                this.shadowRoot.querySelector(
                    '.detalle-container'
                );

            if (!container) return;

            if (newVal === 'true') {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        }
    }

    // Callback cuando el elemento se inserta en el DOM
    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    // Método para establecer datos completos del destino
    setDestino(destino) {

        this._destino = destino;

        this.setAttribute(
            'destino-id',
            destino.id
        );

        this.render();

        const container =
            this.shadowRoot.querySelector(
                '.detalle-container'
            );

        if (container) {
            container.style.display = 'block';
        }

        this.setupEventListeners();
    }

    // Obtener los datos del destino
    getDestino() {
        return this._destino;
    }

    // Configurar eventos
    setupEventListeners() {
        const btnCerrar = this.shadowRoot.querySelector('.btn-cerrar');
        if (btnCerrar) {
            btnCerrar.addEventListener('click', () => this.cerrar());
        }

        // Botón de video si existe
        const btnVideo = this.shadowRoot.querySelector('.btn-video');
        if (btnVideo) {
            btnVideo.addEventListener('click', () => this.reproducirVideo());
        }

        // Cerrar modal al hacer click en el fondo (overlay)
        const container = this.shadowRoot.querySelector('.detalle-container');
        if (container) {
            container.addEventListener('click', (e) => {
                if (e.target === container) {
                    this.cerrar();
                }
            });
        }
    }

    // Cerrar detalle
    cerrar() {
        this.dispatchEvent(new CustomEvent('destino-cerrado', {
            bubbles: true,
            composed: true
        }));
        this.setAttribute('visible', 'false');
    }

    // Reproducir video
    reproducirVideo() {
        if (this._destino && this._destino.video) {
            alert(`Reproducir video: ${this._destino.video}`);
            // Aquí puedes implementar una modal de video si lo deseas
        }
    }

    // Renderizar detalle
    render() {
        if (!this._destino) {
            this.shadowRoot.innerHTML = '<div></div>';
            return;
        }

        const {
            nombre = 'Destino',
            region = 'Costa Rica',
            descripcion = 'Sin descripción',
            imagen_portada = 'assets/img/default.jpg',
            galeria = [],
            audio = '',
            video = '',
            actividades = [],
            lat = 0,
            lng = 0
        } = this._destino;

        const actividadesHTML = actividades
            .map(act => `<span class="actividad-badge">${act}</span>`)
            .join('');

        const imagenesTotales = galeria.length > 0
            ? galeria.map(img => `assets/img/${img}`)
            : [imagen_portada];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .detalle-container {
                 position: fixed;
                 top: 0;
                 left: 0;
                 right: 0;
                 bottom: 0;
                 background: rgba(0, 0, 0, 0.5);
                 display: block;
                 z-index: 10000;
                 overflow-y: auto;
                 padding: 2rem;
}

                .detalle-modal {
                    background: white;
                    margin: 2rem auto;
                    border-radius: 12px;
                    max-width: 900px;
                    overflow: hidden;
                    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.4s ease;
                    pointer-events: auto;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .detalle-modal {
                    background: white;
                    margin: 2rem auto;
                    border-radius: 12px;
                    max-width: 900px;
                    overflow: hidden;
                    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.4s ease;
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .detalle-header {
                    position: relative;
                    height: 350px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: flex-end;
                    padding: 2rem;
                    color: white;
                }

                .detalle-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url('${imagen_portada}');
                    background-size: cover;
                    background-position: center;
                    opacity: 0.7;
                    z-index: 1;
                }

                .detalle-header-content {
                    position: relative;
                    z-index: 2;
                }

                .detalle-region {
                    display: inline-block;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 0.8rem;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .detalle-titulo {
                    font-size: 2.2rem;
                    font-weight: 800;
                    margin: 0;
                    letter-spacing: 0.5px;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                }

                .btn-cerrar {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 40px;
                    height: 40px;
                    background: rgba(0, 0, 0, 0.3);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 3;
                }

                .btn-cerrar:hover {
                    background: rgba(0, 0, 0, 0.6);
                    transform: rotate(90deg);
                }

                .detalle-body {
                    padding: 2.5rem;
                }

                .seccion {
                    margin-bottom: 2.5rem;
                }

                .seccion:last-child {
                    margin-bottom: 0;
                }

                .seccion-titulo {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #2c3e50;
                    margin-bottom: 1rem;
                    padding-bottom: 0.8rem;
                    border-bottom: 3px solid #667eea;
                    letter-spacing: 0.3px;
                }

                .descripcion {
                    font-size: 1rem;
                    line-height: 1.8;
                    color: #555;
                }

                .actividades {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.8rem;
                }

                .actividad-badge {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 0.6rem 1.2rem;
                    border-radius: 25px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                }

                .actividad-badge:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
                }

                .galeria-section {
                    margin-bottom: 2rem;
                }

                .audio-section {
                    margin-bottom: 2rem;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
                    padding: 1.5rem;
                    border-radius: 8px;
                    border-left: 4px solid #667eea;
                }

                .coordenadas {
                    display: flex;
                    gap: 2rem;
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                }

                .coordenada {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }

                .coordenada-etiqueta {
                    font-weight: 700;
                    color: #667eea;
                    font-size: 0.9rem;
                }

                .coordenada-valor {
                    font-family: 'Courier New', monospace;
                    color: #2c3e50;
                    font-weight: 600;
                }

                .btn-video {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.8rem 1.8rem;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-top: 0.8rem;
                }

                .btn-video:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                }

                @media (max-width: 768px) {
                    .detalle-modal {
                        margin: 1rem;
                        border-radius: 8px;
                    }

                    .detalle-header {
                        height: 250px;
                        padding: 1.5rem;
                    }

                    .detalle-titulo {
                        font-size: 1.8rem;
                    }

                    .detalle-body {
                        padding: 1.5rem;
                    }

                    .seccion-titulo {
                        font-size: 1.2rem;
                    }

                    .coordenadas {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>

            <div class="detalle-container">
                <div class="detalle-modal">
                    <div class="detalle-header">
                        <button class="btn-cerrar" title="Cerrar">✕</button>
                        <div class="detalle-header-content">
                            <span class="detalle-region">${region}</span>
                            <h1 class="detalle-titulo">${nombre}</h1>
                        </div>
                    </div>

                    <div class="detalle-body">
                        <!-- Sección Descripción -->
                        <!-- Sección Descripción -->
                        <div class="seccion">
                        <h2 class="seccion-titulo">
                        🌴 Acerca de ${nombre}
                        </h2>

                        <p class="descripcion">
                        ${descripcion}
                        </p>
                        </div>

                        <!-- Sección Actividades -->
                        <div class="seccion">
                            <h2 class="seccion-titulo">🎯 Actividades</h2>
                            <div class="actividades">
                                ${actividadesHTML}
                            </div>
                        </div>

                        <!-- Sección Galería -->
                        ${imagenesTotales.length > 0 ? `
                        <div class="seccion galeria-section">
                            <h2 class="seccion-titulo">🖼 Galería</h2>
                            <galeria-imagenes 
                                titulo="Imágenes del destino"
                                imagenes='${JSON.stringify(imagenesTotales)}'></galeria-imagenes>
                        </div>
                        ` : ''}

                        <!-- Sección Audio -->
                        <div class="seccion audio-section">

                        <h2 class="seccion-titulo">
                        🎧 Guía Turística
                        </h2>

                     <p class="descripcion" style="margin-bottom: 1rem;">
                        Presiona reproducir para escuchar la descripción de este destino.
                      </p>

                     <audio-guia
                     titulo="Narración del Destino"
                     descripcion="Audio generado automáticamente"
                     texto="${descripcion}">
                      </audio-guia>

                     </div>
                       

                        <!-- Sección Ubicación -->
                        <div class="seccion">
                            <h2 class="seccion-titulo">🗺 Ubicación</h2>
                            <div class="coordenadas">
                                <div class="coordenada">
                                    <span class="coordenada-etiqueta">Latitud:</span>
                                    <span class="coordenada-valor">${lat}</span>
                                </div>
                                <div class="coordenada">
                                    <span class="coordenada-etiqueta">Longitud:</span>
                                    <span class="coordenada-valor">${lng}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Sección Video (si existe) -->
                        ${video ? `
                        <div class="seccion">
                            <button class="btn-video">🎬 Ver Video</button>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }
}

// Registrar el Custom Element
customElements.define('destino-detalle', DestinoDetalle);
