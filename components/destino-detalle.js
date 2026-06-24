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
    }

    // Método para establecer datos completos del destino
    setDestino(destino) {
        this._destino = destino;
        this.setAttribute('destino-id', destino.id);
        this.setAttribute('region', destino.region);
        this.render();

        const container = this.shadowRoot.querySelector('.detalle-container');
        if (container) {
            container.style.display = 'block';
        }
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
        window.open(this._destino.video, '_blank');
    }
}  // Aquí puedes implementar una modal de video si lo deseas
      

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
                    background: rgba(15, 23, 42, 0.45);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    display: block;
                    z-index: 10000;
                    overflow-y: auto;
                    padding: 2rem;
                }

                .detalle-modal {
                    background: #faf9f6;
                    margin: 2rem auto;
                    border-radius: 20px;
                    max-width: 950px;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
                    border: 1px solid rgba(0, 0, 0, 0.04);
                    animation: modalEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes modalEntrance {
                    from {
                        transform: translateY(30px) scale(0.96);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }

                .detalle-header {
                    position: relative;
                    height: 380px;
                    display: flex;
                    align-items: flex-end;
                    padding: 3rem 2.5rem;
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
                    z-index: 1;
                }

                .detalle-header::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%);
                    z-index: 2;
                }

                .detalle-header-content {
                    position: relative;
                    z-index: 3;
                }

                .detalle-region {
                    display: inline-block;
                    background: rgba(255, 255, 255, 0.15);
                    color: white;
                    padding: 0.45rem 1.1rem;
                    border-radius: 30px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 0.8rem;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(4px);
                }

                .detalle-titulo {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 2.6rem;
                    font-weight: 800;
                    margin: 0;
                    letter-spacing: 0.5px;
                    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    line-height: 1.25;
                }

                .btn-cerrar {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 44px;
                    height: 44px;
                    background: rgba(15, 23, 42, 0.5);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    color: white;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 10;
                }

                .btn-cerrar:hover {
                    background: rgba(15, 23, 42, 0.8);
                    border-color: rgba(255, 255, 255, 0.4);
                    transform: rotate(90deg) scale(1.05);
                }

                .detalle-body {
                    padding: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .seccion {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
                    border: 1px solid rgba(0, 0, 0, 0.03);
                }

                .seccion-titulo {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.45rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 1.2rem;
                    padding-bottom: 0.8rem;
                    border-bottom: 2px solid #e5e7eb;
                    letter-spacing: 0.3px;
                }

                .descripcion {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.95rem;
                    line-height: 1.75;
                    color: #4b5563;
                }

                .actividades {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .actividad-badge {
                    background: #f4f1ea;
                    color: #374151;
                    padding: 0.55rem 1.2rem;
                    border-radius: 30px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    border: 1px solid rgba(0, 0, 0, 0.04);
                }

                .galeria-section {
                    padding: 0;
                    background: transparent;
                    box-shadow: none;
                    border: none;
                }

                .audio-section {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    border: 1px solid rgba(0, 0, 0, 0.03);
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.02);
                }

                .coordenadas {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    background: #f4f1ea;
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.03);
                }

                .coordenada {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .coordenada-etiqueta {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-weight: 700;
                    color: #4b5563;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .coordenada-valor {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    color: #1f2937;
                    font-weight: 700;
                    font-size: 1.05rem;
                }

                .btn-video {
                    border: none;
                    padding: 0.85rem 2.2rem;
                    border-radius: 30px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 0.5rem;
                }

                /* Temas Regionales en Modal */
                :host([region="Guanacaste"]) .seccion-titulo {
                    border-bottom-color: #e5b842;
                }
                :host([region="Guanacaste"]) .btn-video {
                    background: linear-gradient(135deg, #e5b842, #c69c36);
                    color: #1c150c;
                    box-shadow: 0 6px 20px rgba(229, 184, 66, 0.25);
                }
                :host([region="Guanacaste"]) .btn-video:hover {
                    box-shadow: 0 8px 24px rgba(229, 184, 66, 0.4);
                    transform: translateY(-2px);
                }
                :host([region="Guanacaste"]) .actividad-badge:hover {
                    background: #e5b842;
                    color: #1c150c;
                    border-color: #e5b842;
                }

                :host([region="Caribe"]) .seccion-titulo {
                    border-bottom-color: #d97724;
                }
                :host([region="Caribe"]) .btn-video {
                    background: linear-gradient(135deg, #d97724, #e65c00);
                    color: white;
                    box-shadow: 0 6px 20px rgba(217, 119, 36, 0.25);
                }
                :host([region="Caribe"]) .btn-video:hover {
                    box-shadow: 0 8px 24px rgba(217, 119, 36, 0.4);
                    transform: translateY(-2px);
                }
                :host([region="Caribe"]) .actividad-badge:hover {
                    background: #d97724;
                    color: white;
                    border-color: #d97724;
                }

                :host([region="Central"]) .seccion-titulo {
                    border-bottom-color: #2a9d8f;
                }
                :host([region="Central"]) .btn-video {
                    background: linear-gradient(135deg, #2a9d8f, #2d6a4f);
                    color: white;
                    box-shadow: 0 6px 20px rgba(42, 157, 143, 0.25);
                }
                :host([region="Central"]) .btn-video:hover {
                    box-shadow: 0 8px 24px rgba(42, 157, 143, 0.4);
                    transform: translateY(-2px);
                }
                :host([region="Central"]) .actividad-badge:hover {
                    background: #2a9d8f;
                    color: white;
                    border-color: #2a9d8f;
                }

                :host([region="Pacífico Sur"]) .seccion-titulo {
                    border-bottom-color: #3a86c8;
                }
                :host([region="Pacífico Sur"]) .btn-video {
                    background: linear-gradient(135deg, #3a86c8, #0077b6);
                    color: white;
                    box-shadow: 0 6px 20px rgba(58, 134, 200, 0.25);
                }
                :host([region="Pacífico Sur"]) .btn-video:hover {
                    box-shadow: 0 8px 24px rgba(58, 134, 200, 0.4);
                    transform: translateY(-2px);
                }
                :host([region="Pacífico Sur"]) .actividad-badge:hover {
                    background: #3a86c8;
                    color: white;
                    border-color: #3a86c8;
                }

                @media (min-width: 850px) {
                    .detalle-body {
                        display: grid;
                        grid-template-columns: 1.15fr 0.85fr;
                        gap: 2.5rem;
                    }

                    .col-left {
                        display: flex;
                        flex-direction: column;
                        gap: 2.5rem;
                    }

                    .col-right {
                        display: flex;
                        flex-direction: column;
                        gap: 2.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .detalle-container {
                        padding: 1rem;
                    }

                    .detalle-modal {
                        margin: 1rem auto;
                        border-radius: 16px;
                    }

                    .detalle-header {
                        height: 260px;
                        padding: 2rem 1.5rem;
                    }

                    .detalle-titulo {
                        font-size: 1.9rem;
                    }

                    .detalle-body {
                        padding: 1.5rem;
                        gap: 1.5rem;
                    }

                    .seccion {
                        padding: 1.5rem;
                    }

                    .coordenadas {
                        grid-template-columns: 1fr;
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
                        <!-- Columna Izquierda (Principal) -->
                        <div class="col-left">
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

                            <!-- Sección Video (si existe) -->
                            ${video ? `
                            <div class="seccion">
                                <h2 class="seccion-titulo">🎬 Video Turístico</h2>
                                <button class="btn-video">
                                    <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                        <polygon points="5 3 19 12 5 21 5 3"/>
                                    </svg>
                                    Ver Video
                                </button>
                            </div>
                            ` : ''}
                        </div>

                        <!-- Columna Derecha (Lateral) -->
                        <div class="col-right">
                            <!-- Sección Audio -->
                            <div class="seccion audio-section">
                                <h2 class="seccion-titulo">
                                    🎧 Guía Turística
                                </h2>
                                <p class="descripcion" style="margin-bottom: 1.2rem;">
                                    Presiona reproducir para escuchar la descripción de este destino.
                                </p>
                                <audio-guia
                                    titulo="Narración del Destino"
                                    descripcion="Audio generado por voz"
                                    texto="${descripcion}">
                                </audio-guia>
                            </div>

                            <!-- Sección Galería (si existen imágenes) -->
                            ${imagenesTotales.length > 0 ? `
                            <div class="seccion galeria-section">
                                <galeria-imagenes 
                                    titulo="Imágenes de ${nombre}"
                                    imagenes='${JSON.stringify(imagenesTotales)}'></galeria-imagenes>
                            </div>
                            ` : ''}

                            <!-- Sección Ubicación -->
                            <div class="seccion">
                                <h2 class="seccion-titulo">🗺 Ubicación</h2>
                                <div class="coordenadas">
                                    <div class="coordenada">
                                        <span class="coordenada-etiqueta">Latitud</span>
                                        <span class="coordenada-valor">${lat}</span>
                                    </div>
                                    <div class="coordenada">
                                        <span class="coordenada-etiqueta">Longitud</span>
                                        <span class="coordenada-valor">${lng}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }
}

// Registrar el Custom Element
customElements.define('destino-detalle', DestinoDetalle);
