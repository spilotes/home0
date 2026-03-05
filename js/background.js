/**
 * BACKGROUND ANIMADO - Linkebat
 *
 * Este script cria:
 * - Estrelas piscando no background
 * - Morcegos voando pela tela
 * - Efeito parallax que segue o mouse
 */

// ============================================
// CONFIGURAÇÕES
// ============================================
const CONFIG = {
  stars: {
    count: 50, // Quantidade de estrelas
    minDuration: 2, // Duração mínima da animação (segundos)
    maxDuration: 5, // Duração máxima da animação (segundos)
  },
  bats: {
    count: 15, // Quantidade de morcegos
    minSize: 3, // Tamanho mínimo (px)
    maxSize: 3, // Tamanho máximo (px)
    minDuration: 15, // Duração mínima do voo (segundos)
    maxDuration: 25, // Duração máxima do voo (segundos)
  },
};

// ============================================
// SVG DO MORCEGO
// ============================================
const BAT_SVG = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="12" cy="13" rx="3" ry="4" fill="currentColor"/>
  <path d="M9 12C7 10 4 8 2 9C3 11 4 13 5 14C6 15 8 14 9 13" fill="currentColor"/>
  <path d="M15 12C17 10 20 8 22 9C21 11 20 13 19 14C18 15 16 14 15 13" fill="currentColor"/>
  <path d="M10 9L9 6L11 8" fill="currentColor"/>
  <path d="M14 9L15 6L13 8" fill="currentColor"/>
  <circle cx="11" cy="12" r="0.8" fill="#ef4444"/>
  <circle cx="13" cy="12" r="0.8" fill="#ef4444"/>
</svg>
`;

// ============================================
// CLASSE PRINCIPAL
// ============================================
class AnimatedBackground {
  constructor() {
    this.container = null;
    this.gradientLayer = null;
    this.starsLayer = null;
    this.batsLayer = null;
    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  init() {
    this.createContainer();
    this.createGradientLayer();
    this.createStarsLayer();
    this.createBatsLayer();
    this.setupMouseTracking();
  }

  // Cria o container principal do background
  createContainer() {
    this.container = document.createElement("div");
    this.container.className = "background-container";

    // Insere no início do body
    document.body.insertBefore(this.container, document.body.firstChild);
  }

  // Cria a camada de gradiente animado
  createGradientLayer() {
    this.gradientLayer = document.createElement("div");
    this.gradientLayer.className = "background-gradient";
    this.container.appendChild(this.gradientLayer);
  }

  // Cria as estrelas piscando
  createStarsLayer() {
    this.starsLayer = document.createElement("div");
    this.starsLayer.className = "stars-container";

    for (let i = 0; i < CONFIG.stars.count; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Posição aleatória
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Duração e delay aleatórios
      const duration =
        Math.random() * (CONFIG.stars.maxDuration - CONFIG.stars.minDuration) +
        CONFIG.stars.minDuration;
      const delay = Math.random() * 3;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.setProperty("--twinkle-duration", `${duration}s`);
      star.style.setProperty("--twinkle-delay", `${delay}s`);

      this.starsLayer.appendChild(star);
    }

    this.container.appendChild(this.starsLayer);
  }

  // Cria os morcegos voando
  createBatsLayer() {
    this.batsLayer = document.createElement("div");
    this.batsLayer.className = "bats-container";

    for (let i = 0; i < CONFIG.bats.count; i++) {
      const bat = document.createElement("div");
      bat.className = "bat";
      bat.innerHTML = BAT_SVG;

      // Posição inicial aleatória
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Tamanho aleatório
      const size =
        Math.random() * (CONFIG.bats.maxSize - CONFIG.bats.minSize) +
        CONFIG.bats.minSize;

      // Duração e delay aleatórios
      const duration =
        Math.random() * (CONFIG.bats.maxDuration - CONFIG.bats.minDuration) +
        CONFIG.bats.minDuration;
      const delay = Math.random() * 10;

      bat.style.left = `${x}%`;
      bat.style.top = `${y}%`;
      bat.style.width = `${size}px`;
      bat.style.height = `${size}px`;
      bat.style.color = "rgba(239, 68, 68, 0.4)"; // Vermelho com transparência
      bat.style.setProperty("--fly-duration", `${duration}s`);
      bat.style.setProperty("--fly-delay", `${delay}s`);

      this.batsLayer.appendChild(bat);
    }

    this.container.appendChild(this.batsLayer);
  }

  // Configura o tracking do mouse para efeito parallax
  setupMouseTracking() {
    document.addEventListener("mousemove", (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Normaliza a posição do mouse (-0.5 a 0.5)
      this.mouseX = e.clientX / width - 0.5;
      this.mouseY = e.clientY / height - 0.5;

      // Atualiza o gradiente
      this.updateGradient();
    });
  }

  // Atualiza a posição do gradiente baseado no mouse
  updateGradient() {
    if (!this.gradientLayer) return;

    const x1 = 20 + this.mouseX * 10;
    const y1 = 30 + this.mouseY * 10;
    const x2 = 80 + this.mouseX * 10;
    const y2 = 70 + this.mouseY * 10;

    this.gradientLayer.style.background = `
      radial-gradient(ellipse at ${x1}% ${y1}%, rgba(220, 38, 38, 0.25) 0%, transparent 60%),
      radial-gradient(ellipse at ${x2}% ${y2}%, rgba(127, 29, 29, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 100%, rgba(69, 10, 10, 0.3) 0%, transparent 50%)
    `;
  }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Inicia quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  new AnimatedBackground();
});

// Exporta para uso como módulo (opcional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = AnimatedBackground;
}
