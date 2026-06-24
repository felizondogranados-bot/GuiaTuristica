class AudioGuia extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['texto', 'titulo', 'descripcion'];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback() {
        this.render();
        this.setupEventListeners();
    }

    reproducir() {

        const texto = this.getAttribute('texto');

        if (!texto) return;

        speechSynthesis.cancel();

        const mensaje =
            new SpeechSynthesisUtterance(texto);

        mensaje.lang = 'es-ES';
        mensaje.rate = 1;
        mensaje.pitch = 1;
        mensaje.volume = 1;

        speechSynthesis.speak(mensaje);
    }

    pausar() {
        speechSynthesis.cancel();
    }

    setupEventListeners() {

        const btnPlay =
            this.shadowRoot.querySelector('.btn-play');

        const btnStop =
            this.shadowRoot.querySelector('.btn-stop');

        if (btnPlay) {
            btnPlay.onclick = () => this.reproducir();
        }

        if (btnStop) {
            btnStop.onclick = () => this.pausar();
        }
    }

    render() {

        const titulo =
            this.getAttribute('titulo') ||
            'Guía Turística';

        const descripcion =
            this.getAttribute('descripcion') ||
            'Escucha la descripción del destino';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
            }

            .contenedor {
                background: linear-gradient(135deg, #2d6a4f 0%, #0077b6 100%);
                padding: 1.5rem;
                border-radius: 16px;
                color: white;
                box-shadow: 0 10px 25px rgba(45, 106, 79, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            h3 {
                margin: 0 0 8px 0;
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 1.25rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 8px;
                letter-spacing: 0.3px;
            }

            p {
                margin: 0 0 1.2rem 0;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 0.85rem;
                opacity: 0.85;
                line-height: 1.4;
            }

            .controles {
                display: flex;
                gap: 12px;
            }

            button {
                border: none;
                padding: 10px 20px;
                border-radius: 30px;
                cursor: pointer;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 0.8rem;
                font-weight: 700;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                display: inline-flex;
                align-items: center;
                gap: 6px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .btn-play {
                background: white;
                color: #2d6a4f;
                box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
            }

            .btn-play:hover {
                background: #f4f1ea;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(255, 255, 255, 0.25);
            }

            .btn-stop {
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
            }

            .btn-stop:hover {
                background: #ef4444;
                border-color: #ef4444;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
            }
        </style>

        <div class="contenedor">
            <h3>🎧 ${titulo}</h3>
            <p>${descripcion}</p>
            <div class="controles">
                <button class="btn-play">
                    ▶ Reproducir
                </button>
                <button class="btn-stop">
                    ⏹ Detener
                </button>
            </div>
        </div>
        `;
}

customElements.define(
    'audio-guia',
    AudioGuia
);