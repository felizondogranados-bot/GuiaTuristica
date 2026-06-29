// destino-card.js - Componente Custom Element para tarjeta de destino con Shadow DOM

class DestinoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._destino = null;
    }

    static get observedAttributes() {
        return ['destino-id', 'nombre', 'region', 'imagen', 'descripcion'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal && this.isConnected) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    setDestino(destino) {
        this._destino = destino;
        this.setAttribute('destino-id', destino.id);
        this.setAttribute('nombre', destino.nombre);
        this.setAttribute('region', destino.region);
        this.setAttribute('imagen', destino.imagen_portada);
        this.setAttribute('descripcion', destino.descripcion);
        this.render();
    }

    getDestino() {
        return this._destino;
    }

    setupEventListeners() {
        const card = this.shadowRoot.querySelector('.card');
        if (card) {
            card.addEventListener('click', () => this.handleCardClick());
        }
    }

    handleCardClick() {
        this.dispatchEvent(new CustomEvent('destino-selected', {
            detail: { 
                destino: this._destino
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const nombre = this.getAttribute('nombre') || 'Destino';
        const region = this.getAttribute('region') || 'Costa Rica';
        const imagen = this.getAttribute('imagen') || 'assets/img/default.jpg';
        const descripcion = this.getAttribute('descripcion') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    animation: cardFadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @keyframes cardFadeSlide {
                    from {
                        opacity: 0;
                        transform: translateY(24px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .card {
                    background: var(--card-bg, #ffffff);
                    border-radius: 22px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
                    cursor: pointer;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    position: relative;
                    border: 1px solid rgba(15, 23, 42, 0.08);
                    will-change: transform, box-shadow;
                }

                :host-context([data-theme="dark"]) .card {
                    background: #142622;
                    border-color: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
                }

                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 22px 50px rgba(15, 23, 42, 0.14);
                }

                :host-context([data-theme="dark"]) .card:hover {
                    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.55);
                }

                .image-container {
                    position: relative;
                    width: 100%;
                    height: 225px;
                    overflow: hidden;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .card:hover .card-image {
                    transform: scale(1.08);
                }

                .region-badge {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    z-index: 5;
                    color: white;
                    padding: 0.48rem 1.1rem;
                    border-radius: 20px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }

                .card-content {
                    padding: 1.6rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .card-title {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.48rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 0.6rem;
                    line-height: 1.25;
                    transition: color 0.4s ease;
                }

                :host-context([data-theme="dark"]) .card-title {
                    color: #f8fafc;
                }

                .card-description {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.92rem;
                    color: #4b5563;
                    line-height: 1.55;
                    margin-bottom: 1.4rem;
                    flex-grow: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.4s ease;
                }

                :host-context([data-theme="dark"]) .card-description {
                    color: #cbd5e1;
                }

                .card-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-top: auto;
                    padding-top: 1.1rem;
                    border-top: 1px solid rgba(15, 23, 42, 0.08);
                    transition: border-color 0.4s ease;
                }

                :host-context([data-theme="dark"]) .card-footer {
                    border-top-color: rgba(255, 255, 255, 0.08);
                }

                .cta-button {
                    border: none;
                    padding: 0.68rem 1.45rem;
                    border-radius: 25px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.82rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .cta-button .icon {
                    font-size: 1.1rem;
                    transition: transform 0.3s ease;
                }

                .card:hover .cta-button .icon {
                    transform: translateX(5px);
                }

                /* Colores por Región */
                :host([region="Guanacaste"]) .region-badge {
                    background: rgba(229, 184, 66, 0.92);
                    color: #1c150c;
                }
                :host([region="Guanacaste"]) .cta-button {
                    background: linear-gradient(135deg, #e5b842, #c69c36);
                    color: #1c150c;
                    box-shadow: 0 4px 14px rgba(229, 184, 66, 0.3);
                }
                :host([region="Guanacaste"]) .cta-button:hover {
                    box-shadow: 0 6px 18px rgba(229, 184, 66, 0.5);
                }

                :host([region="Caribe"]) .region-badge {
                    background: rgba(6, 182, 212, 0.92);
                    color: white;
                }
                :host([region="Caribe"]) .cta-button {
                    background: linear-gradient(135deg, #06b6d4, #0891b2);
                    color: white;
                    box-shadow: 0 4px 14px rgba(6, 182, 212, 0.3);
                }
                :host([region="Caribe"]) .cta-button:hover {
                    box-shadow: 0 6px 18px rgba(6, 182, 212, 0.5);
                }

                :host([region="Central"]) .region-badge {
                    background: rgba(15, 118, 110, 0.92);
                    color: white;
                }
                :host([region="Central"]) .cta-button {
                    background: linear-gradient(135deg, #0f766e, #0d9488);
                    color: white;
                    box-shadow: 0 4px 14px rgba(15, 118, 110, 0.3);
                }
                :host([region="Central"]) .cta-button:hover {
                    box-shadow: 0 6px 18px rgba(15, 118, 110, 0.5);
                }

                :host([region="Pacífico Sur"]) .region-badge {
                    background: rgba(2, 132, 199, 0.92);
                    color: white;
                }
                :host([region="Pacífico Sur"]) .cta-button {
                    background: linear-gradient(135deg, #0284c7, #0369a1);
                    color: white;
                    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
                }
                :host([region="Pacífico Sur"]) .cta-button:hover {
                    box-shadow: 0 6px 18px rgba(2, 132, 199, 0.5);
                }

                @media (max-width: 768px) {
                    .image-container {
                        height: 195px;
                    }
                    .card-title {
                        font-size: 1.3rem;
                    }
                    .card-description {
                        font-size: 0.88rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    :host {
                        animation: none !important;
                    }
                    .card, .card-image, .cta-button .icon {
                        transition: none !important;
                    }
                }
            </style>

            <div class="card">
                <div class="image-container">
                    <span class="region-badge">${region}</span>
                    <img src="${imagen}" alt="${nombre}" class="card-image">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${nombre}</h3>
                    <p class="card-description">${descripcion}</p>
                    <div class="card-footer">
                        <button class="cta-button">
                            Explorar <span class="icon">→</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }
}

customElements.define('destino-card', DestinoCard);
