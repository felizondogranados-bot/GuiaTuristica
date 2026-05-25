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
        if (oldVal !== newVal) {
            this.render();
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

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: 100%;
                }

                .card {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .card:hover {
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
                }

                .card-image {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .card:hover .card-image {
                    transform: scale(1.05);
                }

                .card-content {
                    padding: 1.5rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .region-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 0.8rem;
                    width: fit-content;
                }

                .card-title {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #2c3e50;
                    margin-bottom: 0.8rem;
                    letter-spacing: 0.3px;
                }

                .card-description {
                    font-size: 0.95rem;
                    color: #7f8c8d;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    flex-grow: 1;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #ecf0f1;
                }

                .cta-button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.7rem 1.5rem;
                    border-radius: 25px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .cta-button:hover {
                    transform: translateX(2px);
                    box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
                }

                .icon {
                    font-size: 1.2rem;
                }

                @media (max-width: 768px) {
                    .card-image {
                        height: 180px;
                    }

                    .card-title {
                        font-size: 1.1rem;
                    }

                    .card-description {
                        font-size: 0.9rem;
                    }
                }
            </style>

            <div class="card">
                <img src="${imagen}" alt="${nombre}" class="card-image">
                <div class="card-content">
                    <span class="region-badge">${region}</span>
                    <h3 class="card-title">${nombre}</h3>
                    <p class="card-description">${descripcion}</p>
                    <div class="card-footer">
                        <button class="cta-button">
                            <span class="icon">→</span> Explorar
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
