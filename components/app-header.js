class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Temas por región para acentos y colores identificadores
        this.themes = {
            'Guanacaste': {
                '--primary-color': '#e5b842', // Dorado Atardecer Sol
                '--accent': '#c69c36'
            },
            'Caribe': {
                '--primary-color': '#06b6d4', // Turquesa Caribe
                '--accent': '#0891b2'
            },
            'Central': {
                '--primary-color': '#0f766e', // Verde Selva / Bosque
                '--accent': '#0d9488'
            },
            'Pacífico Sur': {
                '--primary-color': '#0284c7', // Azul Océano Pacífico
                '--accent': '#0369a1'
            }
        };

        // Estado del tema global (oscuro / claro)
        this.currentTheme = localStorage.getItem('guia-turistica-theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    static get observedAttributes() {
        return ['active-region'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'active-region' && oldVal !== newVal) {
            this.updateTheme(newVal);
            this.updateActiveButton(newVal);
        }
    }

    connectedCallback() {
        if (!this.hasAttribute('active-region')) {
            this.setAttribute('active-region', 'Guanacaste');
        }
        
        // Aplicar el tema global al documento principal
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        this.render();
        this.updateTheme(this.getAttribute('active-region'));
        this.updateActiveButton(this.getAttribute('active-region'));
    }

    updateTheme(region) {
        const theme = this.themes[region] || this.themes['Guanacaste'];
        Object.keys(theme).forEach(prop => {
            this.style.setProperty(prop, theme[prop]);
        });
    }

    updateActiveButton(region) {
        if (!this.shadowRoot) return;
        this.shadowRoot.querySelectorAll('.btn-region').forEach(btn => {
            const isActive = btn.dataset.region === region;
            btn.classList.toggle('active', isActive);
        });
    }

    toggleDarkMode() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('guia-turistica-theme', this.currentTheme);
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.render();
    }

    handleRegionClick(region) {
        if (this.getAttribute('active-region') === region) return;

        this.setAttribute('active-region', region);

        this.dispatchEvent(new CustomEvent('region-selected', {
            detail: { 
                region: region,
                theme: this.themes[region]
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const active = this.getAttribute('active-region') || 'Guanacaste';
        const regiones = Object.keys(this.themes);
        const isDark = this.currentTheme === 'dark';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                font-family: 'Plus Jakarta Sans', sans-serif;
                position: sticky;
                top: 0;
                z-index: 1000;
                transition: all 0.4s ease;
            }

            header {
                background: var(--header-bg, rgba(252, 251, 247, 0.88));
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                padding: 1rem 5%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 4px 25px rgba(15, 23, 42, 0.06);
                border-bottom: 2px solid var(--primary-color);
                transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
            }

            :host-context([data-theme="dark"]) header {
                background: rgba(13, 27, 24, 0.9);
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
            }

            .logo-container {
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                user-select: none;
            }

            .logo-icon {
                width: 34px;
                height: 34px;
                color: var(--primary-color);
                transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
            }

            .logo-container:hover .logo-icon {
                transform: rotate(360deg);
            }

            .logo-text {
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 1.35rem;
                font-weight: 800;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                color: #1f2937;
                display: flex;
                flex-direction: column;
                line-height: 1.1;
                transition: color 0.4s ease;
            }

            :host-context([data-theme="dark"]) .logo-text {
                color: #f8fafc;
            }

            .logo-text span {
                font-family: 'Playfair Display', Georgia, serif;
                font-style: italic;
                font-weight: 600;
                color: var(--primary-color);
                text-transform: none;
                letter-spacing: 0;
                font-size: 1.1rem;
            }

            .nav-actions {
                display: flex;
                align-items: center;
                gap: 16px;
            }

            nav {
                display: flex;
                gap: 10px;
            }

            .btn-region {
                background: rgba(15, 23, 42, 0.04);
                border: 1px solid rgba(15, 23, 42, 0.1);
                color: #4b5563;
                padding: 9px 20px;
                border-radius: 30px;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 0.88rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                position: relative;
            }

            :host-context([data-theme="dark"]) .btn-region {
                background: rgba(255, 255, 255, 0.06);
                border-color: rgba(255, 255, 255, 0.12);
                color: #cbd5e1;
            }

            .btn-region:hover {
                background: rgba(15, 23, 42, 0.08);
                border-color: rgba(15, 23, 42, 0.2);
                color: #1f2937;
                transform: translateY(-2px);
            }

            :host-context([data-theme="dark"]) .btn-region:hover {
                background: rgba(255, 255, 255, 0.15);
                border-color: rgba(255, 255, 255, 0.3);
                color: #ffffff;
            }

            .btn-region.active {
                background: var(--primary-color);
                color: #ffffff;
                border-color: var(--primary-color);
                box-shadow: 0 4px 15px color-mix(in srgb, var(--primary-color) 40%, transparent);
                transform: translateY(-1px);
            }

            .btn-region.active[data-region="Guanacaste"] {
                color: #1c150c;
            }

            .theme-toggle {
                background: rgba(15, 23, 42, 0.05);
                border: 1px solid rgba(15, 23, 42, 0.12);
                color: #1f2937;
                width: 42px;
                height: 42px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }

            :host-context([data-theme="dark"]) .theme-toggle {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.2);
                color: #f8fafc;
            }

            .theme-toggle:hover {
                transform: scale(1.08) rotate(15deg);
                background: rgba(15, 23, 42, 0.1);
            }

            :host-context([data-theme="dark"]) .theme-toggle:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .theme-toggle svg {
                width: 20px;
                height: 20px;
                fill: none;
                stroke: currentColor;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            @media (max-width: 868px) {
                header {
                    flex-direction: column;
                    gap: 14px;
                    padding: 1rem;
                }
                .nav-actions {
                    width: 100%;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                nav {
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 8px;
                }
                .btn-region {
                    padding: 7px 15px;
                    font-size: 0.82rem;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                *, ::before, ::after {
                    animation-duration: 0.01ms !important;
                    transition-duration: 0.01ms !important;
                }
            }
        </style>

        <header>
            <div class="logo-container" id="logo-btn">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
                <div class="logo-text">Costa Rica <span>Pura Vida</span></div>
            </div>
            
            <div class="nav-actions">
                <nav>
                    ${regiones.map(reg => `
                        <button class="btn-region ${active === reg ? 'active' : ''}" 
                                data-region="${reg}">
                            ${reg}
                        </button>
                    `).join('')}
                </nav>

                <button class="theme-toggle" id="theme-toggle-btn" aria-label="Cambiar modo claro/oscuro" title="Cambiar tema">
                    ${isDark ? `
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                    ` : `
                        <svg viewBox="0 0 24 24">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    `}
                </button>
            </div>
        </header>
        `;

        this.shadowRoot.querySelectorAll('.btn-region').forEach(btn => {
            btn.onclick = () => this.handleRegionClick(btn.dataset.region);
        });

        const themeBtn = this.shadowRoot.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.onclick = () => this.toggleDarkMode();
        }

        const logoBtn = this.shadowRoot.getElementById('logo-btn');
        if (logoBtn) {
            logoBtn.onclick = () => this.handleRegionClick('Guanacaste');
        }
    }
}

customElements.define('app-header', AppHeader);