const musicNote = document.getElementById("music-note");
const animationStage = document.querySelector(".animation-stage");
const toggleButton = document.getElementById("toggle-animation");
const speedControl = document.getElementById("speed-control");

let animationFrame;
let isPaused = false;
let progress = 0;
let lastTime = performance.now();

function animateNote(currentTime) {
    const elapsed = currentTime - lastTime;
    lastTime = currentTime;

    if (!isPaused) {
        const speed = Number(speedControl.value);
        progress = (progress + elapsed * 0.00016 * speed) % 2;

        const direction = progress <= 1 ? progress : 2 - progress;
        const travelDistance = Math.max(0, animationStage.clientWidth - musicNote.offsetWidth);
        const horizontalPosition = direction * travelDistance;
        const verticalBounce = Math.sin(progress * Math.PI * 6) * 12;
        const rotation = progress * 360;

        musicNote.style.transform = `translate(${horizontalPosition}px, ${verticalBounce}px) rotate(${rotation}deg)`;
    }

    animationFrame = requestAnimationFrame(animateNote);
}

toggleButton.addEventListener("click", () => {
    isPaused = !isPaused;
    toggleButton.textContent = isPaused ? "Play animation" : "Pause animation";
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    isPaused = true;
    toggleButton.textContent = "Play animation";
}

animationFrame = requestAnimationFrame(animateNote);

window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(animationFrame);
});
