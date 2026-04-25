const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const phrases = [
  "cloud governance",
  "cloud-native architecture",
  "AI systems architecture",
  "observability and reproducibility",
  "governable cloud-native platforms"
];

const typedText = document.querySelector("#typed-text");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedText) return;

  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
    window.setTimeout(typeLoop, 58);
    return;
  }

  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    window.setTimeout(typeLoop, 1350);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeLoop, 32);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  window.setTimeout(typeLoop, 250);
}

typeLoop();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
        bar.style.width = `${bar.dataset.width || 0}%`;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".skill-category").forEach((element) => skillObserver.observe(element));

const canvas = document.querySelector("#hero-canvas");
const context = canvas?.getContext("2d");
let particles = [];

function resizeCanvas() {
  if (!canvas || !context) return;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(canvas.offsetWidth * pixelRatio);
  canvas.height = Math.floor(canvas.offsetHeight * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const count = Math.max(48, Math.floor(canvas.offsetWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.offsetWidth,
    y: Math.random() * canvas.offsetHeight,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    radius: Math.random() * 1.8 + 0.7
  }));
}

function drawNetwork() {
  if (!canvas || !context) return;
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(45, 212, 191, 0.58)";
    context.fill();
  });

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.hypot(dx, dy);

      if (distance < 118) {
        context.beginPath();
        context.moveTo(particles[i].x, particles[i].y);
        context.lineTo(particles[j].x, particles[j].y);
        context.strokeStyle = `rgba(79, 124, 255, ${0.18 * (1 - distance / 118)})`;
        context.lineWidth = 1;
        context.stroke();
      }
    }
  }

  window.requestAnimationFrame(drawNetwork);
}

resizeCanvas();
drawNetwork();
window.addEventListener("resize", resizeCanvas);

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name") || "";
  const email = form.get("email") || "";
  const message = form.get("message") || "";
  const subject = encodeURIComponent("Portfolio inquiry");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

const backToTop = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("visible", window.scrollY > 650);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
