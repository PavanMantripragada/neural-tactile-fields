const revealItems = document.querySelectorAll(
  ".section-heading, .panel-card, .link-card, .hero-copy, .hero-stack"
);

revealItems.forEach((item) => {
  item.setAttribute("data-reveal", "");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));

const copyButton = document.querySelector("[data-copy-target]");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const targetId = copyButton.getAttribute("data-copy-target");
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      copyButton.classList.add("is-copied");
      window.setTimeout(() => copyButton.classList.remove("is-copied"), 1400);
    } catch (error) {
      console.error("Unable to copy BibTeX.", error);
    }
  });
}
