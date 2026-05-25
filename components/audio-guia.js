// audio-guia.js - Componente Custom Element para reproductor de audio con Shadow DOM

class AudioGuia extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._audio = null;
        this._duracion = 0;
        this._tiempoActual = 0;
        this._reproduciendo = false;
    }

    // Atributos observados
    static get observedAttributes() {
        return ['src', 'titulo', 'descripcion'];
    }

    // Callback cuando cambian los atributos
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (name === 'src') {
                this.cambiarAudio(newVal);
            }
            this.render();
        }
    }

    // Callback cuando el elemento se inserta en el DOM
    connectedCallback() {
        this.render();
        this.inicializarAudio();
        this.setupEventListeners();
    }

    // Inicializar el elemento de audio
    inicializarAudio() {
        const src = this.getAttribute('src');
        if (src) {
            this._audio = new Audio(src);
            this._audio.addEventListener('loadedmetadata', () => {
                this._duracion = this._audio.duration;
                this.actualizarUI();
            });

            this._audio.addEventListener('timeupdate', () => {
                this._tiempoActual = this._audio.currentTime;
                this.actualizarProgreso();
            });

            this._audio.addEventListener('ended', () => {
                this._reproduciendo = false;
                this.actualizarBotonPlay();
            });

            this._audio.addEventListener('play', () => {
                this._reproduciendo = true;
                this.actualizarBotonPlay();
            });

            this._audio.addEventListener('pause', () => {
                this._reproduciendo = false;
                this.actualizarBotonPlay();
            });
        }
    }

    // Cambiar audio
    cambiarAudio(src) {
        if (this._audio) {
            this._audio.pause();
            this._audio.src = src;
            this._tiempoActual = 0;
            this._reproduciendo = false;
            this._audio.load();
        }
    }

    // Configurar eventos
    setupEventListeners() {
        const btnPlay = this.shadowRoot.querySelector('.btn-play');
        const btnPausa = this.shadowRoot.querySelector('.btn-pausa');
        const barra = this.shadowRoot.querySelector('.barra-progreso');
        const slider = this.shadowRoot.querySelector('.slider-progreso');
        const btnVolumen = this.shadowRoot.querySelector('.btn-volumen');
        const sliderVolumen = this.shadowRoot.querySelector('.slider-volumen');

        if (btnPlay) {
            btnPlay.addEventListener('click', () => this.reproducir());
        }

        if (btnPausa) {
            btnPausa.addEventListener('click', () => this.pausar());
        }

        if (slider) {
            slider.addEventListener('input', (e) => {
                if (this._audio) {
                    this._audio.currentTime = (e.target.value / 100) * this._duracion;
                }
            });
        }

        if (btnVolumen) {
            btnVolumen.addEventListener('click', () => this.toggleMute());
        }

        if (sliderVolumen) {
            sliderVolumen.addEventListener('input', (e) => {
                if (this._audio) {
                    this._audio.volume = e.target.value / 100;
                }
            });
        }
    }

    // Reproducir
    reproducir() {
        if (this._audio) {
            this._audio.play();
        }
    }

    // Pausar
    pausar() {
        if (this._audio) {
            this._audio.pause();
        }
    }

    // Toggle mute
    toggleMute() {
        if (this._audio) {
            this._audio.muted = !this._audio.muted;
            this.actualizarIconoVolumen();
        }
    }

    // Convertir segundos a formato MM:SS
    formatearTiempo(segundos) {
        if (isNaN(segundos)) return '0:00';
        const minutos = Math.floor(segundos / 60);
        const secs = Math.floor(segundos % 60);
        return `${minutos}:${secs.toString().padStart(2, '0')}`;
    }

    // Actualizar UI
    actualizarUI() {
        this.actualizarProgreso();
        this.actualizarTiempos();
    }

    // Actualizar progreso
    actualizarProgreso() {
        const slider = this.shadowRoot.querySelector('.slider-progreso');
        if (slider && this._duracion > 0) {
            slider.value = (this._tiempoActual / this._duracion) * 100;
        }
        this.actualizarTiempos();
    }

    // Actualizar tiempos
    actualizarTiempos() {
        const tiempoActualEl = this.shadowRoot.querySelector('.tiempo-actual');
        const tiempoTotalEl = this.shadowRoot.querySelector('.tiempo-total');

        if (tiempoActualEl) {
            tiempoActualEl.textContent = this.formatearTiempo(this._tiempoActual);
        }

        if (tiempoTotalEl) {
            tiempoTotalEl.textContent = this.formatearTiempo(this._duracion);
        }
    }

    // Actualizar botón play
    actualizarBotonPlay() {
        const btnPlay = this.shadowRoot.querySelector('.btn-play');
        const btnPausa = this.shadowRoot.querySelector('.btn-pausa');

        if (btnPlay && btnPausa) {
            if (this._reproduciendo) {
                btnPlay.style.display = 'none';
                btnPausa.style.display = 'flex';
            } else {
                btnPlay.style.display = 'flex';
                btnPausa.style.display = 'none';
            }
        }
    }

    // Actualizar ícono de volumen
    actualizarIconoVolumen() {
        const btnVolumen = this.shadowRoot.querySelector('.btn-volumen');
        if (btnVolumen) {
            btnVolumen.textContent = this._audio.muted ? '🔇' : '🔊';
        }
    }

    // Renderizar reproductor
    render() {
        const titulo = this.getAttribute('titulo') || 'Guía de Audio';
        const descripcion = this.getAttribute('descripcion') || 'Escucha la descripción de este destino';
        const src = this.getAttribute('src') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .reproductor-container {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    padding: 2rem;
                    color: white;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }

                .reproductor-header {
                    margin-bottom: 1.5rem;
                }

                .reproductor-titulo {
                    font-size: 1.3rem;
                    font-weight: 800;
                    margin: 0 0 0.5rem 0;
                    letter-spacing: 0.5px;
                }

                .reproductor-descripcion {
                    font-size: 0.9rem;
                    opacity: 0.95;
                    margin: 0;
                }

                .controles-principales {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .botones-reproduccion {
                    display: flex;
                    gap: 0.8rem;
                }

                .btn-play,
                .btn-pausa {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-play:hover,
                .btn-pausa:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                }

                .btn-pausa {
                    display: none;
                }

                .tiempos {
                    font-size: 0.85rem;
                    font-weight: 700;
                    min-width: 80px;
                    text-align: right;
                }

                .barra-progreso {
                    flex-grow: 1;
                    margin: 0 1rem;
                }

                .slider-progreso {
                    width: 100%;
                    height: 6px;
                    border-radius: 3px;
                    background: rgba(255, 255, 255, 0.2);
                    outline: none;
                    -webkit-appearance: none;
                    appearance: none;
                    cursor: pointer;
                }

                .slider-progreso::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }

                .slider-progreso::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }

                .controles-volumen {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    min-width: 150px;
                }

                .btn-volumen {
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-volumen:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .slider-volumen {
                    flex-grow: 1;
                    height: 4px;
                    border-radius: 2px;
                    background: rgba(255, 255, 255, 0.2);
                    outline: none;
                    -webkit-appearance: none;
                    appearance: none;
                    cursor: pointer;
                }

                .slider-volumen::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                }

                .slider-volumen::-moz-range-thumb {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: none;
                }

                .tiempo-actual,
                .tiempo-total {
                    font-weight: 700;
                }

                @media (max-width: 768px) {
                    .reproductor-container {
                        padding: 1.5rem;
                    }

                    .controles-principales {
                        flex-wrap: wrap;
                    }

                    .barra-progreso {
                        margin: 0.5rem 0;
                        width: 100%;
                    }

                    .btn-play,
                    .btn-pausa {
                        width: 45px;
                        height: 45px;
                        font-size: 1.3rem;
                    }

                    .controles-volumen {
                        width: 100%;
                    }
                }
            </style>

            <div class="reproductor-container">
                <div class="reproductor-header">
                    <h3 class="reproductor-titulo">🎵 ${titulo}</h3>
                    <p class="reproductor-descripcion">${descripcion}</p>
                </div>

                <div class="controles-principales">
                    <div class="botones-reproduccion">
                        <button class="btn-play" title="Reproducir">▶</button>
                        <button class="btn-pausa" title="Pausar">⏸</button>
                    </div>

                    <div class="barra-progreso">
                        <input type="range" class="slider-progreso" min="0" max="100" value="0">
                    </div>

                    <div class="tiempos">
                        <span class="tiempo-actual">0:00</span> / <span class="tiempo-total">0:00</span>
                    </div>
                </div>

                <div class="controles-volumen">
                    <button class="btn-volumen" title="Volumen">🔊</button>
                    <input type="range" class="slider-volumen" min="0" max="100" value="70">
                </div>
            </div>
        `;

        this.inicializarAudio();
        this.setupEventListeners();
        this.actualizarBotonPlay();
    }
}

// Registrar el Custom Element
customElements.define('audio-guia', AudioGuia);
