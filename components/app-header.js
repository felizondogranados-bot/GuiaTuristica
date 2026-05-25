
class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // temas por región 
        this.themes = {
            'Guanacaste': {
                '--primary-color': '#f1c40f', // Oro/Sol
                '--bg-color': '#3e2c00',      // Tierra oscura
                '--text-color': '#000000',    // Contraste oscuro
                '--accent': '#f39c12'
            },
            'Caribe': {
                '--primary-color': '#e67e22', // Atardecer/Fuego
                '--bg-color': '#2c0300',      // Madera profunda
                '--text-color': '#ffffff',
                '--accent': '#d35400'
            },
            'Central': {
                '--primary-color': '#2ecc71', // Verde Bosque/Vida
                '--bg-color': '#062c1d',      // Musgo oscuro
                '--text-color': '#ffffff',
                '--accent': '#27ae60'
            },
            'Pacífico Sur': {
                '--primary-color': '#3498db', // Océano
                '--bg-color': '#001f3f',      // Azul profundo
                '--text-color': '#ffffff',
                '--accent': '#2980b9'
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
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            header {
                background: var(--bg-color);
                color: white;
                padding: 1.2rem 5%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                border-bottom: 4px solid var(--primary-color);
                transition: background 0.6s ease, border-color 0.6s ease;
            }

            .logo-container {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .logo-text {
                font-size: 1.4rem;
                font-weight: 800;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                color: #ffffff;
            }

            nav {
                display: flex;
                gap: 12px;
            }

            button {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #ecf0f1;
                padding: 10px 22px;
                border-radius: 30px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            }

            button:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
                border-color: var(--primary-color);
            }

            button.active {
                background: var(--primary-color);
                color: var(--text-color);
                border-color: var(--primary-color);
                box-shadow: 0 0 15px var(--primary-color);
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
                }
                button {
                    padding: 8px 15px;
                    font-size: 0.8rem;
                }
            }
        </style>

        <header>
            <div class="logo-container">
                <span class="logo-text">Costa Rica Explore</span>
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