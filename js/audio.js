// ===== GLOBAL AUDIO MANAGER ===== //

window.gameAudio = {
  theme: new Audio("assets/audio/theme_music.mp3"),
  click: new Audio("assets/audio/button_clicking.mp3"),
  chicken: new Audio("assets/audio/screaming_chicken_touch.mp3"),
  remove: new Audio("assets/audio/remove_ingredient.mp3"),

  init() {
    this.theme.loop = true;

    // Try autoplay immediately (works on desktop + GitHub Pages)
    this.theme.volume = 0.6;
    this.theme.play().catch(() => {
      // If browser blocks autoplay, start after any interaction
      const resume = () => {
        this.theme.play();
        document.removeEventListener("pointerdown", resume);
      };
      document.addEventListener("pointerdown", resume, { once: true });
    });

    // Universal click sound
    document.addEventListener("click", () => {
      this.play("click");
    });

    // Chicken sound
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("chicken")) {
        this.play("chicken");
      }
    });

    // Remove-ingredient sound
    document.addEventListener("click", (e) => {
      if (e.target.closest(".remove-ingredient")) {
        this.play("remove");
      }
    });
  },

  play(name) {
    const s = this[name];
    if (!s) return;
    s.currentTime = 0;
    s.play();
  },
};

// Initialize automatically
window.addEventListener("DOMContentLoaded", () => {
  gameAudio.init();
});
