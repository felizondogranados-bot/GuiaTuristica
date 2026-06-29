// destino-detalle.js - Componente Custom Element para vista detalle del destino con Shadow DOM

class DestinoDetalle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._destino = null;
    }

    static get observedAttributes() {
        return ['destino-id', 'visible'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'visible') {
            const container = this.shadowRoot.querySelector('.detalle-container');
            if (!container) return;
            if (newVal === 'true') {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        }
    }

    connectedCallback() {
        this.render();
    }

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

    getDestino() {
        return this._destino;
    }

    setupEventListeners() {
        const btnCerrar = this.shadowRoot.querySelector('.btn-cerrar');
        if (btnCerrar) {
            btnCerrar.addEventListener('click', () => this.cerrar());
        }

        const btnVideo = this.shadowRoot.querySelector('.btn-video');
        if (btnVideo) {
            btnVideo.addEventListener('click', () => this.reproducirVideo());
        }

        const container = this.shadowRoot.querySelector('.detalle-container');
        if (container) {
            container.addEventListener('click', (e) => {
                if (e.target === container) {
                    this.cerrar();
                }
            });
        }
    }

    cerrar() {
        this.dispatchEvent(new CustomEvent('destino-cerrado', {
            bubbles: true,
            composed: true
        }));
        this.setAttribute('visible', 'false');
    }

    reproducirVideo() {
        if (this._destino && this._destino.video) {
            window.open(this._destino.video, '_blank');
        }
    }

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
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }

                .detalle-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(13, 27, 24, 0.65);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    display: block;
                    z-index: 10000;
                    overflow-y: auto;
                    padding: 2rem 1rem;
                }

                .detalle-modal {
                    background: #fcfbf7;
                    margin: 2rem auto;
                    border-radius: 24px;
                    max-width: 980px;
                    overflow: hidden;
                    box-shadow: 0 30px 70px rgba(15, 23, 42, 0.2);
                    border: 1px solid rgba(15, 23, 42, 0.08);
                    animation: modalEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    transition: background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
                }

                @keyframes modalEntrance {
                    from {
                        transform: translateY(35px) scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }

                .detalle-header {
                    position: relative;
                    height: 390px;
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
                    background: linear-gradient(to top, rgba(13, 27, 24, 0.9) 0%, rgba(13, 27, 24, 0.35) 55%, transparent 100%);
                    z-index: 2;
                }

                .detalle-header-content {
                    position: relative;
                    z-index: 3;
                }

                .detalle-region {
                    display: inline-block;
                    background: rgba(255, 255, 255, 0.18);
                    color: white;
                    padding: 0.48rem 1.2rem;
                    border-radius: 30px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 0.8rem;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                }

                .detalle-titulo {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 2.8rem;
                    font-weight: 800;
                    margin: 0;
                    letter-spacing: -0.5px;
                    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                    line-height: 1.2;
                }

                .btn-cerrar {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 44px;
                    height: 44px;
                    background: rgba(13, 27, 24, 0.55);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.25);
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
                    background: rgba(13, 27, 24, 0.88);
                    border-color: rgba(255, 255, 255, 0.5);
                    transform: rotate(90deg) scale(1.08);
                }

                .detalle-body {
                    padding: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .seccion {
                    background: #ffffff;
                    padding: 2rem;
                    border-radius: 20px;
                    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
                    border: 1px solid rgba(15, 23, 42, 0.06);
                    transition: all 0.4s ease;
                }

                .seccion-titulo {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 1.2rem;
                    padding-bottom: 0.8rem;
                    border-bottom: 2px solid rgba(15, 23, 42, 0.08);
                    letter-spacing: 0.3px;
                }

                .descripcion {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.98rem;
                    line-height: 1.75;
                    color: #4b5563;
                }

                .actividades {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .actividad-badge {
                    background: rgba(15, 23, 42, 0.04);
                    color: #374151;
                    padding: 0.6rem 1.3rem;
                    border-radius: 30px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    border: 1px solid rgba(15, 23, 42, 0.08);
                }

                .galeria-section {
                    padding: 0;
                    background: transparent;
                    box-shadow: none;
                    border: none;
                }

                .audio-section {
                    background: #ffffff;
                    padding: 2rem;
                    border-radius: 20px;
                    border: 1px solid rgba(15, 23, 42, 0.06);
                    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
                }

                .coordenadas {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    background: rgba(15, 23, 42, 0.04);
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid rgba(15, 23, 42, 0.08);
                }

                .coordenada {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .coordenada-etiqueta {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-weight: 800;
                    color: #4b5563;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .coordenada-valor {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    color: #1f2937;
                    font-weight: 800;
                    font-size: 1.1rem;
                }

                .btn-video {
                    border: none;
                    padding: 0.88rem 2.4rem;
                    border-radius: 30px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 0.5rem;
                }

                /* Temas Regionales en Modal */
                :host([region="Guanacaste"]) .seccion-titulo {
                    border-bottom-color: #e5b842;
                }
                :host([region="Guanacaste"]) .btn-video {
                    background: linear-gradient(135deg, #e5b842, #c69c36);
                    color: #1c150c;
                    box-shadow: 0 6px 20px rgba(229, 184, 66, 0.3);
                }
                :host([region="Guanacaste"]) .btn-video:hover {
                    box-shadow: 0 8px 25px rgba(229, 184, 66, 0.5);
                    transform: translateY(-2px);
                }
                :host([region="Guanacaste"]) .actividad-badge:hover {
                    background: #e5b842;
                    color: #1c150c;
                    border-color: #e5b842;
                }

                :host([region="Caribe"]) .seccion-titulo {
                    border-bottom-color: #06b6d4;
                }
                :host([region="Caribe"]) .btn-video {
                    background: linear-gradient(135deg, #06b6d4, #0891b2);
                    color: white;
                    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.3);
                }
                :host([region="Caribe"]) .btn-video:hover {
                    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.5);
                    transform: translateY(-2px);
                }
                :host([region="Caribe"]) .actividad-badge:hover {
                    background: #06b6d4;
                    color: white;
                    border-color: #06b6d4;
                }

                :host([region="Central"]) .seccion-titulo {
                    border-bottom-color: #0f766e;
                }
                :host([region="Central"]) .btn-video {
                    background: linear-gradient(135deg, #0f766e, #0d9488);
                    color: white;
                    box-shadow: 0 6px 20px rgba(15, 118, 110, 0.3);
                }
                :host([region="Central"]) .btn-video:hover {
                    box-shadow: 0 8px 25px rgba(15, 118, 110, 0.5);
                    transform: translateY(-2px);
                }
                :host([region="Central"]) .actividad-badge:hover {
                    background: #0f766e;
                    color: white;
                    border-color: #0f766e;
                }

                :host([region="Pacífico Sur"]) .seccion-titulo {
                    border-bottom-color: #0284c7;
                }
                :host([region="Pacífico Sur"]) .btn-video {
                    background: linear-gradient(135deg, #0284c7, #0369a1);
                    color: white;
                    box-shadow: 0 6px 20px rgba(2, 132, 199, 0.3);
                }
                :host([region="Pacífico Sur"]) .btn-video:hover {
                    box-shadow: 0 8px 25px rgba(2, 132, 199, 0.5);
                    transform: translateY(-2px);
                }
                :host([region="Pacífico Sur"]) .actividad-badge:hover {
                    background: #0284c7;
                    color: white;
                    border-color: #0284c7;
                }

                /* Modo Oscuro Tropical Nocturno para el Modal */
                :host-context([data-theme="dark"]) .detalle-modal {
                    background: #142622;
                    border-color: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.65);
                }

                :host-context([data-theme="dark"]) .seccion,
                :host-context([data-theme="dark"]) .audio-section {
                    background: #1a332d;
                    border-color: rgba(255, 255, 255, 0.08);
                }

                :host-context([data-theme="dark"]) .seccion-titulo {
                    color: #f8fafc;
                }

                :host-context([data-theme="dark"]) .descripcion,
                :host-context([data-theme="dark"]) .coordenada-etiqueta {
                    color: #cbd5e1;
                }

                :host-context([data-theme="dark"]) .coordenada-valor {
                    color: #f8fafc;
                }

                :host-context([data-theme="dark"]) .actividad-badge,
                :host-context([data-theme="dark"]) .coordenadas {
                    background: rgba(255, 255, 255, 0.06);
                    color: #cbd5e1;
                    border-color: rgba(255, 255, 255, 0.12);
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
                        padding: 1rem 0.5rem;
                    }

                    .detalle-modal {
                        margin: 0.5rem auto;
                        border-radius: 20px;
                    }

                    .detalle-header {
                        height: 270px;
                        padding: 2rem 1.5rem;
                    }

                    .detalle-titulo {
                        font-size: 2.1rem;
                    }

                    .detalle-body {
                        padding: 1.5rem 1.2rem;
                        gap: 1.5rem;
                    }

                    .seccion {
                        padding: 1.5rem 1.2rem;
                    }

                    .coordenadas {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .detalle-modal {
                        animation: none !important;
                    }
                    .btn-cerrar, .btn-video, .actividad-badge, .seccion {
                        transition: none !important;
                    }
                }
            </style>

            <div class="detalle-container">
                <div class="detalle-modal">
                    <div class="detalle-header">
                        <button class="btn-cerrar" title="Cerrar modal">✕</button>
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
                                <h2 class="seccion-titulo">🎯 Actividades Destacadas</h2>
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
                                    Ver Video Destacado
                                </button>
                            </div>
                            ` : ''}
                        </div>

                        <!-- Columna Derecha (Lateral) -->
                        <div class="col-right">
                            <!-- Sección Audio -->
                            <div class="seccion audio-section">
                                <h2 class="seccion-titulo">
                                    🎧 Audio Guía Pura Vida
                                </h2>
                                <p class="descripcion" style="margin-bottom: 1.2rem;">
                                    Presioná reproducir para escuchar la narración guiada de este destino.
                                </p>
                                <audio-guia
                                    titulo="Narración del Destino"
                                    descripcion="Audio generado por voz"
                                    texto="${descripcion}"
                                    region="${region}">
                                </audio-guia>
                            </div>

                            <!-- Sección Galería (si existen imágenes) -->
                            ${imagenesTotales.length > 0 ? `
                            <div class="seccion galeria-section">
                                <galeria-imagenes 
                                    titulo="Galería de Imágenes"
                                    imagenes='${JSON.stringify(imagenesTotales)}'></galeria-imagenes>
                            </div>
                            ` : ''}

                            <!-- Sección Ubicación -->
                            <div class="seccion">
                                <h2 class="seccion-titulo">🗺 Ubicación Geográfica</h2>
                                <div class="coordenadas">
                                    <div class="coordenada">
                                        <span class="coordenada-etiqueta">Latitud</span>
                                        <span class="coordenada-valor">${lat}° N</span>
                                    </div>
                                    <div class="coordenada">
                                        <span class="coordenada-etiqueta">Longitud</span>
                                        <span class="coordenada-valor">${lng}° O</span>
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
