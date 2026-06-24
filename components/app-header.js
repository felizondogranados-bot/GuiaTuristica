
class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // temas por región 
        this.themes = {
            'Guanacaste': {
                '--primary-color': '#e5b842', // Dorado elegante
                '--bg-color': '#1c150c',      // Bronce profundo
                '--text-color': '#1c150c',    // Contraste oscuro
                '--accent': '#c69c36'         // Dorado oscuro
            },
            'Caribe': {
                '--primary-color': '#d97724', // Atardecer
                '--bg-color': '#24110f',      // Madera profunda
                '--text-color': '#ffffff',
                '--accent': '#e65c00'
            },
            'Central': {
                '--primary-color': '#2a9d8f', // Verde naturaleza
                '--bg-color': '#082117',      // Verde profundo
                '--text-color': '#ffffff',
                '--accent': '#2d6a4f'
            },
            'Pacífico Sur': {
                '--primary-color': '#3a86c8', // Azul océano
                '--bg-color': '#0a1c2a',      // Azul profundo
                '--text-color': '#ffffff',
                '--accent': '#0077b6'
            }
        };
    }

    static get observedAttributes() {
        return ['active-region'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'active-region' && oldVal !== newVal) {
            this.updateTheme(newVal);
            this.render();
        }
    }

    connectedCallback() {
        //  región inicial por defecto si no existe
        if (!this.hasAttribute('active-region')) {
            this.setAttribute('active-region', 'Guanacaste');
        }
        this.updateTheme(this.getAttribute('active-region'));
        this.render();
    }

    /**
     * Actualiza las variables CSS del host basándose en el tema de la región
     */
    updateTheme(region) {
        const theme = this.themes[region] || this.themes['Guanacaste'];
        Object.keys(theme).forEach(prop => {
            this.style.setProperty(prop, theme[prop]);
        });
    }

    /**
     * Maneja el click, actualiza el estado y emite el evento para el index.html
     */
    handleRegionClick(region) {
        this.setAttribute('active-region', region);

        // Emitir CustomEvent 
        this.dispatchEvent(new CustomEvent('region-selected', {
            detail: { 
                region: region,
                theme: this.themes[region]
            },
            bubbles: true,
            composed: true // Permite que el evento atraviese el Shadow DOM
        }));
    }

    render() {
        const active = this.getAttribute('active-region');
        const regiones = Object.keys(this.themes);

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                font-family: 'Plus Jakarta Sans', sans-serif;
                position: sticky;
                top: 0;
                z-index: 1000;
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }

            header {
                background: color-mix(in srgb, var(--bg-color) 88%, transparent);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                color: white;
                padding: 1rem 5%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
                border-bottom: 2px solid var(--primary-color);
                transition: background 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .logo-container {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
            }

            .logo-icon {
                width: 28px;
                height: 28px;
                color: var(--primary-color);
                transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s ease;
            }

            .logo-container:hover .logo-icon {
                transform: rotate(360deg);
            }

            .logo-text {
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 1.3rem;
                font-weight: 700;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                color: #ffffff;
            }

            .logo-text span {
                font-family: 'Playfair Display', Georgia, serif;
                font-style: italic;
                font-weight: 600;
                color: var(--primary-color);
                text-transform: none;
                letter-spacing: 0;
            }

            nav {
                display: flex;
                gap: 12px;
            }

            button {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.85);
                padding: 8px 20px;
                border-radius: 30px;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                position: relative;
            }

            button:hover {
                background: rgba(255, 255, 255, 0.12);
                border-color: rgba(255, 255, 255, 0.25);
                color: #ffffff;
                transform: translateY(-2px);
            }

            button.active {
                background: var(--primary-color);
                color: var(--text-color);
                border-color: var(--primary-color);
                box-shadow: 0 4px 15px color-mix(in srgb, var(--primary-color) 40%, transparent);
                transform: translateY(-1px);
            }

            @media (max-width: 768px) {
                header {
                    flex-direction: column;
                    gap: 15px;
                    padding: 1rem;
                }
                nav {
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 8px;
                }
                button {
                    padding: 6px 14px;
                    font-size: 0.8rem;
                }
            }
        </style>

        <header>
            <div class="logo-container">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
                <span class="logo-text">Costa Rica <span>Explore</span></span>
            </div>
            <nav>
                ${regiones.map(reg => `
                    <button class="${active === reg ? 'active' : ''}" 
                            data-region="${reg}">
                        ${reg}
                    </button>
                `).join('')}
            </nav>
        </header>
        `;

        // Event listeners para los botones
        this.shadowRoot.querySelectorAll('button').forEach(btn => {
            btn.onclick = () => this.handleRegionClick(btn.dataset.region);
        });
    }
}

// Registro oficial del Custom Element
customElements.define('app-header', AppHeader);