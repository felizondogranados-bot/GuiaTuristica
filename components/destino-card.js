// destino-card.js - Componente Custom Element para tarjeta de destino con Shadow DOM

class DestinoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._destino = null;
    }

    // Atributos observados
    static get observedAttributes() {
        return ['destino-id', 'nombre', 'region', 'imagen', 'descripcion'];
    }

    // Callback cuando cambian los atributos
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal && this.isConnected) {
            this.render();
        }
    }

    // Callback cuando el elemento se inserta en el DOM
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

    // Obtener los datos del destino
    getDestino() {
        return this._destino;
    }

    // Configurar eventos de la tarjeta
    setupEventListeners() {
        const card = this.shadowRoot.querySelector('.card');
        if (card) {
            card.addEventListener('click', () => this.handleCardClick());
            
            // Efecto hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        }
    }

    // Emitir evento cuando se hace clic en la tarjeta
    handleCardClick() {
        this.dispatchEvent(new CustomEvent('destino-selected', {
            detail: { 
                destino: this._destino
            },
            bubbles: true,
            composed: true
        }));
    }

    // Renderizar la tarjeta
    render() {
        const nombre = this.getAttribute('nombre') || 'Destino';
        const region = this.getAttribute('region') || 'Costa Rica';
        const imagen = this.getAttribute('imagen') || 'assets/img/default.jpg';
        const descripcion = this.getAttribute('descripcion') || '';

        this.shadowRoot.innerHTML = `            <style>
                :host {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }

                .card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
                    cursor: pointer;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    position: relative;
                    border: 1px solid rgba(0, 0, 0, 0.03);
                    will-change: transform, box-shadow;
                }

                .card:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
                }

                .image-container {
                    position: relative;
                    width: 100%;
                    height: 220px;
                    overflow: hidden;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .card:hover .card-image {
                    transform: scale(1.05);
                }

                .region-badge {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    z-index: 5;
                    color: white;
                    padding: 0.45rem 1rem;
                    border-radius: 20px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(4px);
                }

                .card-content {
                    padding: 1.5rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .card-title {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.45rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 0.6rem;
                    line-height: 1.25;
                }

                .card-description {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.9rem;
                    color: #4b5563;
                    line-height: 1.5;
                    margin-bottom: 1.2rem;
                    flex-grow: 1;
                    /* Line clamp */
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-top: auto;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                }

                .cta-button {
                    border: none;
                    padding: 0.65rem 1.4rem;
                    border-radius: 25px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .cta-button .icon {
                    font-size: 1.1rem;
                    transition: transform 0.3s ease;
                }

                .cta-button:hover .icon {
                    transform: translateX(3px);
                }

                /* Colores por Región */
                :host([region="Guanacaste"]) .region-badge {
                    background: #e5b842;
                    color: #1c150c;
                }
                :host([region="Guanacaste"]) .cta-button {
                    background: linear-gradient(135deg, #e5b842, #c69c36);
                    color: #1c150c;
                    box-shadow: 0 4px 12px rgba(229, 184, 66, 0.25);
                }
                :host([region="Guanacaste"]) .cta-button:hover {
                    box-shadow: 0 6px 16px rgba(229, 184, 66, 0.4);
                }

                :host([region="Caribe"]) .region-badge {
                    background: #d97724;
                    color: white;
                }
                :host([region="Caribe"]) .cta-button {
                    background: linear-gradient(135deg, #d97724, #e65c00);
                    color: white;
                    box-shadow: 0 4px 12px rgba(217, 119, 36, 0.25);
                }
                :host([region="Caribe"]) .cta-button:hover {
                    box-shadow: 0 6px 16px rgba(217, 119, 36, 0.4);
                }

                :host([region="Central"]) .region-badge {
                    background: #2a9d8f;
                    color: white;
                }
                :host([region="Central"]) .cta-button {
                    background: linear-gradient(135deg, #2a9d8f, #2d6a4f);
                    color: white;
                    box-shadow: 0 4px 12px rgba(42, 157, 143, 0.25);
                }
                :host([region="Central"]) .cta-button:hover {
                    box-shadow: 0 6px 16px rgba(42, 157, 143, 0.4);
                }

                :host([region="Pacífico Sur"]) .region-badge {
                    background: #3a86c8;
                    color: white;
                }
                :host([region="Pacífico Sur"]) .cta-button {
                    background: linear-gradient(135deg, #3a86c8, #0077b6);
                    color: white;
                    box-shadow: 0 4px 12px rgba(58, 134, 200, 0.25);
                }
                :host([region="Pacífico Sur"]) .cta-button:hover {
                    box-shadow: 0 6px 16px rgba(58, 134, 200, 0.4);
                }

                @media (max-width: 768px) {
                    .image-container {
                        height: 190px;
                    }

                    .card-title {
                        font-size: 1.25rem;
                    }

                    .card-description {
                        font-size: 0.85rem;
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

// Registrar el Custom Element
customElements.define('destino-card', DestinoCard);
