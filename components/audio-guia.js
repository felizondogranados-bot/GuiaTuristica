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

            :host{
                display:block;
                width:100%;
            }

            .contenedor{
                background:linear-gradient(
                    135deg,
                    #667eea 0%,
                    #764ba2 100%
                );
                padding:20px;
                border-radius:12px;
                color:white;
            }

            h3{
                margin:0 0 10px 0;
            }

            p{
                margin:0 0 20px 0;
                opacity:0.9;
            }

            .controles{
                display:flex;
                gap:10px;
            }

            button{
                border:none;
                padding:12px 20px;
                border-radius:8px;
                cursor:pointer;
                font-weight:bold;
            }

            .btn-play{
                background:white;
                color:#333;
            }

            .btn-stop{
                background:#ff4d4d;
                color:white;
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
}

customElements.define(
    'audio-guia',
    AudioGuia
);