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
        this.setupEventListeners();
    }

    // Método para establecer imágenes
    setImagenes(imagenes) {
        this._imagenes = imagenes;
        this._indiceActual = 0;
        this.setAttribute('imagenes', JSON.stringify(imagenes));
        this.render();
        this.setupEventListeners();
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
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }

                .galeria-header {
                    padding: 1.2rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .galeria-header h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    font-weight: 700;
                }

                .galeria-content {
                    position: relative;
                    width: 100%;
                    height: 400px;
                    background: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .imagen-actual {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: opacity 0.4s ease;
                    opacity: 1;
                }

                .controles {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    z-index: 10;
                }

                .btn-anterior,
                .btn-siguiente {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-anterior:hover,
                .btn-siguiente:hover {
                    background: rgba(0, 0, 0, 0.8);
                    transform: scale(1.1);
                }

                .puntos {
                    display: flex;
                    gap: 8px;
                }

                .punto {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.6);
                }

                .punto:hover {
                    background: rgba(255, 255, 255, 0.6);
                }

                .punto.activo {
                    background: white;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                }

                .contador {
                    color: white;
                    font-size: 0.9rem;
                    font-weight: 700;
                    background: rgba(0, 0, 0, 0.5);
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                }

                .galeria-footer {
                    padding: 1rem;
                    background: #f8f9fa;
                    text-align: center;
                    font-size: 0.9rem;
                    color: #7f8c8d;
                }

                @media (max-width: 768px) {
                    .galeria-content {
                        height: 250px;
                    }

                    .btn-anterior,
                    .btn-siguiente {
                        width: 35px;
                        height: 35px;
                        font-size: 1rem;
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
