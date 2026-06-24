// galeria-imagenes.js - Componente Custom Element para galería de imágenes con Shadow DOM

class GaleriaImagenes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._imagenes = [];
        this._indiceActual = 0;
    }

    // Atributos observados
    static get observedAttributes() {
        return ['imagenes', 'titulo'];
    }

    // Callback cuando cambian los atributos
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (name === 'imagenes') {
                try {
                    this._imagenes = JSON.parse(newVal);
                    this._indiceActual = 0;
                    this.render();
                } catch (e) {
                    console.error('Error parsing imagenes:', e);
                }
            } else if (name === 'titulo') {
                this.render();
            }
        }
    }

    // Callback cuando el elemento se inserta en el DOM
    connectedCallback() {
        this.render();
    }

    // Método para establecer imágenes
    setImagenes(imagenes) {
        this._imagenes = imagenes;
        this._indiceActual = 0;
        this.setAttribute('imagenes', JSON.stringify(imagenes));
    }

    // Obtener imágenes
    getImagenes() {
        return this._imagenes;
    }

    // Configurar eventos
    setupEventListeners() {
        const btnAnterior = this.shadowRoot.querySelector('.btn-anterior');
        const btnSiguiente = this.shadowRoot.querySelector('.btn-siguiente');
        const puntos = this.shadowRoot.querySelectorAll('.punto');

        if (btnAnterior) {
            btnAnterior.addEventListener('click', () => this.mostrarAnterior());
        }

        if (btnSiguiente) {
            btnSiguiente.addEventListener('click', () => this.mostrarSiguiente());
        }

        puntos.forEach((punto, indice) => {
            punto.addEventListener('click', () => this.irAImagen(indice));
        });

        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.mostrarAnterior();
            if (e.key === 'ArrowRight') this.mostrarSiguiente();
        });
    }

    // Mostrar imagen anterior
    mostrarAnterior() {
        this._indiceActual = (this._indiceActual - 1 + this._imagenes.length) % this._imagenes.length;
        this.actualizarGaleria();
    }

    // Mostrar siguiente imagen
    mostrarSiguiente() {
        this._indiceActual = (this._indiceActual + 1) % this._imagenes.length;
        this.actualizarGaleria();
    }

    // Ir a una imagen específica
    irAImagen(indice) {
        this._indiceActual = indice;
        this.actualizarGaleria();
    }

    // Actualizar galería
    actualizarGaleria() {
        const imagen = this.shadowRoot.querySelector('.imagen-actual');
        const puntos = this.shadowRoot.querySelectorAll('.punto');

        if (imagen) {
            imagen.style.opacity = '0';
            setTimeout(() => {
                imagen.src = this._imagenes[this._indiceActual];
                imagen.style.opacity = '1';
            }, 200);
        }

        puntos.forEach((punto, indice) => {
            punto.classList.toggle('activo', indice === this._indiceActual);
        });
    }

    // Renderizar galería
    render() {
        if (this._imagenes.length === 0) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                    }
                    .galeria-vacia {
                        text-align: center;
                        padding: 2rem;
                        color: #7f8c8d;
                    }
                </style>
                <div class="galeria-vacia">
                    <p>No hay imágenes disponibles</p>
                </div>
            `;
            return;
        }

        const titulo = this.getAttribute('titulo') || 'Galería de Imágenes';
        const imagenesHTML = this._imagenes.map((_, i) => 
            `<span class="punto ${i === 0 ? 'activo' : ''}"></span>`
        ).join('');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .galeria-container {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
                    border: 1px solid rgba(0, 0, 0, 0.04);
                }

                .galeria-header {
                    padding: 1.2rem 1.5rem;
                    background: #f4f1ea;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
                }

                .galeria-header h3 {
                    margin: 0;
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1f2937;
                }

                .galeria-content {
                    position: relative;
                    width: 100%;
                    height: 400px;
                    background: #f4f1ea;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .imagen-actual {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    opacity: 1;
                }

                .controles {
                    position: absolute;
                    bottom: 20px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20px;
                    z-index: 10;
                    pointer-events: none;
                }

                .btn-anterior,
                .btn-siguiente {
                    width: 44px;
                    height: 44px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    color: white;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: auto;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .btn-anterior:hover,
                .btn-siguiente:hover {
                    background: rgba(15, 23, 42, 0.6);
                    border-color: rgba(255, 255, 255, 0.4);
                    transform: scale(1.08);
                }

                .puntos {
                    display: flex;
                    gap: 8px;
                    background: rgba(15, 23, 42, 0.45);
                    padding: 6px 12px;
                    border-radius: 20px;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    pointer-events: auto;
                    align-items: center;
                }

                .punto {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.45);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    border: none;
                }

                .punto:hover {
                    background: rgba(255, 255, 255, 0.8);
                }

                .punto.activo {
                    width: 22px;
                    border-radius: 4px;
                    background: white;
                    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
                }

                .contador {
                    color: white;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 700;
                    background: rgba(15, 23, 42, 0.55);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    padding: 0.45rem 0.85rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                }

                .galeria-footer {
                    padding: 1rem;
                    background: #faf9f6;
                    text-align: center;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.85rem;
                    color: #4b5563;
                    border-top: 1px solid rgba(0, 0, 0, 0.04);
                }

                @media (max-width: 768px) {
                    .galeria-content {
                        height: 280px;
                    }

                    .btn-anterior,
                    .btn-siguiente {
                        width: 38px;
                        height: 38px;
                        font-size: 0.85rem;
                    }
                }
            </style>

            <div class="galeria-container">
                <div class="galeria-header">
                    <h3>${titulo}</h3>
                </div>

                <div class="galeria-content">
                    <img src="${this._imagenes[this._indiceActual]}" alt="Imagen ${this._indiceActual + 1}" class="imagen-actual">
                    
                    <div class="controles">
                        <button class="btn-anterior" title="Imagen anterior">❮</button>
                        <div class="puntos">
                            ${imagenesHTML}
                        </div>
                        <button class="btn-siguiente" title="Siguiente imagen">❯</button>
                    </div>

                    <div class="contador" style="position: absolute; top: 15px; right: 15px;">
                        ${this._indiceActual + 1} / ${this._imagenes.length}
                    </div>
                </div>

                <div class="galeria-footer">
                    Usa las flechas ← → para navegar o haz clic en los puntos
                </div>
            </div>
        `;

        this.setupEventListeners();
    }
}

// Registrar el Custom Element
customElements.define('galeria-imagenes', GaleriaImagenes);
