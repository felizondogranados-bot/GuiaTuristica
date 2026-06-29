class MapaCostaRica extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.outlinePath = `
            M178 71
            C207 45 236 50 267 72
            C294 91 318 65 352 71
            C385 77 394 104 428 108
            C476 113 517 113 546 141
            C580 172 607 204 650 222
            C690 238 733 271 731 314
            C728 348 697 369 659 375
            C625 381 604 399 610 429
            C615 454 641 474 632 499
            C599 494 567 470 537 438
            C503 401 462 378 417 371
            C368 363 330 343 291 318
            C262 300 237 299 211 317
            C187 335 176 370 151 399
            C129 425 98 414 99 379
            C100 348 123 317 114 291
            C105 266 74 252 58 231
            C38 205 48 172 80 160
            C108 150 126 148 140 123
            C151 102 158 86 178 71
            Z
        `;

        this.aguaPath = `
            M104 112
            C165 37 258 22 330 54
            C393 82 447 60 520 92
            C601 128 658 196 714 246
            C778 303 760 391 682 430
            C624 459 578 446 521 411
            C474 383 430 391 378 374
            C322 356 291 327 249 333
            C204 339 181 399 135 430
            C89 461 39 423 49 363
            C58 311 78 287 53 253
            C18 205 42 150 104 112
            Z
        `;

        this.regiones = [
            {
                nombre: 'Guanacaste',
                clase: 'guanacaste',
                path: `
                    M36 24
                    L356 24
                    C342 105 338 154 305 190
                    C277 221 234 219 211 244
                    C190 268 185 328 151 399
                    C129 425 98 414 99 379
                    C100 348 123 317 114 291
                    C105 266 74 252 58 231
                    C38 205 48 172 80 160
                    C108 150 126 148 140 123
                    C151 102 158 86 178 71
                    C207 45 236 50 267 72
                    C294 91 318 65 352 71
                    L36 24
                    Z
                `,
                labelX: 222,
                labelY: 168
            },
            {
                nombre: 'Central',
                clase: 'central',
                path: `
                    M356 24
                    C407 72 475 78 546 141
                    C558 176 563 211 549 247
                    C532 293 509 320 474 337
                    C426 361 366 345 321 324
                    C278 304 241 273 211 244
                    C234 219 277 221 305 190
                    C338 154 342 105 356 24
                    Z
                `,
                labelX: 420,
                labelY: 233
            },
            {
                nombre: 'Caribe',
                clase: 'caribe',
                path: `
                    M546 141
                    C580 172 607 204 650 222
                    C690 238 733 271 731 314
                    C728 348 697 369 659 375
                    C625 381 604 399 610 429
                    C564 407 522 371 474 337
                    C509 320 532 293 549 247
                    C563 211 558 176 546 141
                    Z
                `,
                labelX: 645,
                labelY: 298
            },
            {
                nombre: 'Pacífico Sur',
                clase: 'pacifico-sur',
                path: `
                    M42 520
                    L42 430
                    C94 429 124 421 151 399
                    C185 328 190 268 211 244
                    C244 267 281 292 321 309
                    C368 329 420 342 474 320
                    C524 357 565 396 610 429
                    C615 454 641 474 632 499
                    C599 494 567 470 537 438
                    C503 401 462 378 417 371
                    C368 363 330 343 291 318
                    C262 300 237 299 211 317
                    C187 335 176 370 151 399
                    C126 419 94 446 52 466
                    L42 520
                    Z
                `,
                labelX: 432,
                labelY: 390
            }
        ];
    }

    static get observedAttributes() {
        return ['active-region'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-region' && oldValue !== newValue) {
            this.actualizarRegionActiva();
        }
    }

    connectedCallback() {
        if (!this.hasAttribute('active-region')) {
            this.setAttribute('active-region', 'Guanacaste');
        }

        this.render();
        this.actualizarRegionActiva();
    }

    seleccionarRegion(region) {
        if (!this.regiones.some(item => item.nombre === region)) {
            return;
        }

        this.setAttribute('active-region', region);

        this.dispatchEvent(new CustomEvent('region-selected', {
            detail: { region },
            bubbles: true,
            composed: true
        }));
    }

    manejarTeclado(event, region) {
        if (event.key !== 'Enter' && event.key !== ' ') {
            return;
        }

        event.preventDefault();
        this.seleccionarRegion(region);
    }

    actualizarRegionActiva() {
        if (!this.shadowRoot) {
            return;
        }

        const activeRegion =
            this.getAttribute('active-region') || 'Guanacaste';

        this.shadowRoot
            .querySelectorAll('.zona')
            .forEach(zona => {
                const isActive =
                    zona.dataset.region === activeRegion;

                zona.classList.toggle('activa', isActive);
                zona.setAttribute('aria-pressed', String(isActive));
            });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: min(100%, 1180px);
                    margin: -2.4rem auto 3.25rem;
                    font-family: 'Plus Jakarta Sans', Arial, sans-serif;
                }

                .mapa-panel {
                    position: relative;
                    display: block;
                    padding: 0 0.25rem;
                    overflow: visible;
                    isolation: isolate;
                }

                .mapa-panel::before {
                    content: "";
                    position: absolute;
                    inset: 8% 5% 1%;
                    z-index: -1;
                    background:
                        radial-gradient(circle at 28% 48%, rgba(42, 157, 143, 0.13), transparent 35%),
                        radial-gradient(circle at 76% 56%, rgba(58, 134, 200, 0.12), transparent 38%),
                        linear-gradient(135deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0));
                    border-radius: 58% 42% 50% 46%;
                    filter: blur(2px);
                }

                .decoracion {
                    position: absolute;
                    top: clamp(0.25rem, 2vw, 1rem);
                    right: clamp(0.5rem, 5vw, 4rem);
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    color: #2a9d8f;
                }

                .linea {
                    display: none;
                }

                .brujula {
                    width: 42px;
                    height: 42px;
                    flex: 0 0 auto;
                }

                .mapa-contenedor {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: clamp(320px, 33vw, 430px);
                }

                .mapa-svg {
                    display: block;
                    width: min(100%, 820px);
                    height: 100%;
                    overflow: visible;
                }

                .agua {
                    fill: #e4f2f2;
                    opacity: 0.82;
                }

                .pais-sombra {
                    fill: rgba(15, 23, 42, 0.2);
                    transform: translate(-18px, 22px);
                    filter: blur(1px);
                }

                .pais-borde {
                    fill: none;
                    stroke: #111827;
                    stroke-width: 8;
                    stroke-linejoin: round;
                    stroke-linecap: round;
                    pointer-events: none;
                }

                .division {
                    fill: none;
                    stroke: rgba(255, 255, 255, 0.88);
                    stroke-width: 5;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    pointer-events: none;
                }

                .zona {
                    cursor: pointer;
                    outline: none;
                }

                .forma {
                    stroke: transparent;
                    stroke-width: 1;
                    transition:
                        filter 180ms ease,
                        opacity 180ms ease,
                        transform 180ms ease;
                    transform-box: fill-box;
                    transform-origin: center;
                }

                .guanacaste .forma {
                    fill: #e5b842;
                }

                .caribe .forma {
                    fill: #d97724;
                }

                .central .forma {
                    fill: #2a9d8f;
                }

                .pacifico-sur .forma {
                    fill: #3a86c8;
                }

                .zona:not(.activa) .forma {
                    opacity: 0.86;
                }

                .zona:hover .forma,
                .zona:focus-visible .forma {
                    opacity: 1;
                    transform: scale(1.012);
                    filter: drop-shadow(0 10px 14px rgba(15, 23, 42, 0.17));
                }

                .zona.activa .forma {
                    opacity: 1;
                    filter: drop-shadow(0 13px 19px rgba(15, 23, 42, 0.25));
                }

                .zona:focus-visible .forma {
                    filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0)) drop-shadow(0 0 7px rgba(17, 24, 39, 0.55));
                }

                .etiqueta {
                    fill: #111827;
                    paint-order: stroke;
                    stroke: rgba(255, 255, 255, 0.94);
                    stroke-width: 5px;
                    stroke-linejoin: round;
                    font-size: 25px;
                    font-weight: 800;
                    letter-spacing: 0;
                    text-anchor: middle;
                    pointer-events: visiblePainted;
                    user-select: none;
                }

                .zona.activa .etiqueta {
                    fill: #ffffff;
                    stroke: rgba(17, 24, 39, 0.82);
                }

                .punto {
                    fill: #ffffff;
                    stroke: rgba(17, 24, 39, 0.55);
                    stroke-width: 2.5;
                    pointer-events: visiblePainted;
                }

                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }

                @media (max-width: 900px) {
                    :host {
                        margin: -2.25rem auto 2.25rem;
                    }

                    .mapa-panel {
                        padding: 0;
                    }

                    .mapa-panel::before {
                        inset: 19% 2% 4%;
                    }

                    .decoracion {
                        top: 0;
                        right: 0.5rem;
                    }

                    .linea {
                        display: none;
                    }

                    .brujula {
                        width: 36px;
                        height: 36px;
                    }

                    .mapa-contenedor {
                        height: 260px;
                    }

                    .etiqueta {
                        font-size: 25px;
                    }
                }

                @media (max-width: 480px) {
                    :host {
                        margin: -2.25rem auto 1.75rem;
                    }

                    .mapa-contenedor {
                        height: 230px;
                    }

                    .etiqueta {
                        font-size: 24px;
                        stroke-width: 4.5px;
                    }
                }
            </style>

            <section class="mapa-panel" aria-labelledby="mapa-cr-titulo">
                <div class="titulo">
                    <h2 id="mapa-cr-titulo" class="sr-only">Mapa turístico de Costa Rica</h2>
                    <div class="decoracion" aria-hidden="true">
                        <span class="linea"></span>
                        <svg class="brujula" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M15.8 8.2 13.5 13.5 8.2 15.8 10.5 10.5 15.8 8.2Z"></path>
                        </svg>
                    </div>
                </div>

                <p id="mapa-cr-descripcion" class="sr-only">
                    Mapa interactivo de Costa Rica dividido en Guanacaste, Caribe, Central y Pacífico Sur.
                </p>

                <div class="mapa-contenedor">
                    <svg class="mapa-svg" viewBox="0 0 820 540" role="img" aria-labelledby="mapa-cr-titulo mapa-cr-descripcion" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <clipPath id="costa-rica-clip">
                                <path d="${this.outlinePath}"></path>
                            </clipPath>
                        </defs>

                        <path class="agua" d="${this.aguaPath}"></path>
                        <path class="pais-sombra" d="${this.outlinePath}"></path>

                        <g clip-path="url(#costa-rica-clip)">
                            ${this.regiones.map(region => `
                                <g class="zona ${region.clase}"
                                   data-region="${region.nombre}"
                                   role="button"
                                   tabindex="0"
                                   aria-label="Seleccionar ${region.nombre}"
                                   aria-pressed="false">
                                    <title>${region.nombre}</title>
                                    <path class="forma" d="${region.path}"></path>
                                </g>
                            `).join('')}
                        </g>

                        <g clip-path="url(#costa-rica-clip)">
                            <path class="division" d="M356 24 C342 105 338 154 305 190 C277 221 234 219 211 244"></path>
                            <path class="division" d="M151 399 C176 356 190 288 211 244"></path>
                            <path class="division" d="M546 141 C558 176 563 211 549 247 C532 293 509 320 474 337"></path>
                            <path class="division" d="M211 244 C244 267 281 292 321 309 C368 329 420 342 474 337"></path>
                        </g>
                        <path class="pais-borde" d="${this.outlinePath}"></path>

                        ${this.regiones.map(region => `
                            <g class="zona ${region.clase}"
                               data-region="${region.nombre}"
                               role="button"
                               tabindex="0"
                               aria-label="Seleccionar ${region.nombre}"
                               aria-pressed="false">
                                <circle class="punto" cx="${region.labelX}" cy="${region.labelY - 25}" r="4.5"></circle>
                                ${region.nombre === 'Pacífico Sur' ? `
                                    <text class="etiqueta" x="${region.labelX}" y="${region.labelY - 3}">
                                        <tspan x="${region.labelX}" dy="0">Pacífico</tspan>
                                        <tspan x="${region.labelX}" dy="22">Sur</tspan>
                                    </text>
                                ` : `
                                    <text class="etiqueta" x="${region.labelX}" y="${region.labelY}">
                                        ${region.nombre}
                                    </text>
                                `}
                            </g>
                        `).join('')}
                    </svg>
                </div>
            </section>
        `;

        this.shadowRoot
            .querySelectorAll('.zona')
            .forEach(zona => {
                const region = zona.dataset.region;

                zona.addEventListener(
                    'click',
                    () => this.seleccionarRegion(region)
                );

                zona.addEventListener(
                    'keydown',
                    event => this.manejarTeclado(event, region)
                );
            });
    }
}

customElements.define('mapa-costa-rica', MapaCostaRica);
