// Animation and Graph setup
const animationGif = document.getElementById("animationGif");
const graphCanvas = document.getElementById("intensityGraph");
const graphCtx = graphCanvas.getContext("2d");

// State
let isRunning = false;
let isPaused = false;
let isGraphVisible = false;
let intensityData = [];
let originalGifSrc = "image/Animation part.gif";

// Initialize - show static GIF on load
window.addEventListener('load', function () {
    stopGifAnimation();
    animationGif.classList.add('stopped');
});

// Generate intensity data for double-slit pattern (classical - two peaks like image)
function generateIntensityData() {
    intensityData = [];
    const width = graphCanvas.width;
    const centerX = width / 2;
    const slitSeparation = 180; // Distance between two peaks

    for (let x = 0; x < width; x++) {
        const position = x - centerX;

        // Two separate gaussian peaks - classical particle behavior
        const peak1X = -slitSeparation / 2;
        const peak2X = slitSeparation / 2;
        const sigma = 60; // Width of each peak

        // Calculate intensity for each peak
        const intensity1 = Math.exp(-Math.pow(position - peak1X, 2) / (2 * sigma * sigma));
        const intensity2 = Math.exp(-Math.pow(position - peak2X, 2) / (2 * sigma * sigma));

        // Total intensity is sum of both peaks (no interference, classical behavior)
        const totalIntensity = intensity1 + intensity2;
        intensityData.push(totalIntensity);
    }
}

// Draw intensity graph
function drawIntensityGraph() {
    if (!isGraphVisible || intensityData.length === 0) return;

    const width = graphCanvas.width;
    const height = graphCanvas.height;
    const padding = 50;
    const graphHeight = height - 2 * padding;

    graphCtx.fillStyle = "white";
    graphCtx.fillRect(0, 0, width, height);

    graphCtx.strokeStyle = "#333";
    graphCtx.lineWidth = 2;
    graphCtx.strokeRect(0, 0, width, height);

    graphCtx.fillStyle = "#2c3e50";
    graphCtx.font = "bold 18px Arial";
    graphCtx.textAlign = "center";
    graphCtx.fillText("Intensity Distribution Graph", width / 2, 30);

    graphCtx.strokeStyle = "#34495e";
    graphCtx.lineWidth = 2;

    graphCtx.beginPath();
    graphCtx.moveTo(padding, padding);
    graphCtx.lineTo(padding, height - padding);
    graphCtx.stroke();

    graphCtx.beginPath();
    graphCtx.moveTo(padding, height - padding);
    graphCtx.lineTo(width - padding, height - padding);
    graphCtx.stroke();

    graphCtx.fillStyle = "#2c3e50";
    graphCtx.font = "14px Arial";
    graphCtx.textAlign = "center";
    graphCtx.fillText("Position", width / 2, height - 10);

    graphCtx.save();
    graphCtx.translate(15, height / 2);
    graphCtx.rotate(-Math.PI / 2);
    graphCtx.fillText("Intensity", 0, 0);
    graphCtx.restore();

    const maxIntensity = Math.max(...intensityData);

    graphCtx.strokeStyle = "#e74c3c";
    graphCtx.fillStyle = "rgba(231, 76, 60, 0.2)";
    graphCtx.lineWidth = 3;

    graphCtx.beginPath();
    const graphWidth = width - 2 * padding;

    for (let i = 0; i < intensityData.length; i++) {
        const x = padding + (i / intensityData.length) * graphWidth;
        const normalizedIntensity = intensityData[i] / maxIntensity;
        const y = height - padding - (normalizedIntensity * graphHeight);

        if (i === 0) {
            graphCtx.moveTo(x, y);
        } else {
            graphCtx.lineTo(x, y);
        }
    }

    graphCtx.lineTo(width - padding, height - padding);
    graphCtx.lineTo(padding, height - padding);
    graphCtx.closePath();
    graphCtx.fill();

    graphCtx.beginPath();
    for (let i = 0; i < intensityData.length; i++) {
        const x = padding + (i / intensityData.length) * graphWidth;
        const normalizedIntensity = intensityData[i] / maxIntensity;
        const y = height - padding - (normalizedIntensity * graphHeight);

        if (i === 0) {
            graphCtx.moveTo(x, y);
        } else {
            graphCtx.lineTo(x, y);
        }
    }
    graphCtx.stroke();
}

function stopGifAnimation() {
    const canvas = document.createElement('canvas');
    canvas.width = animationGif.naturalWidth || 800;
    canvas.height = animationGif.naturalHeight || 600;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(animationGif, 0, 0);
    animationGif.src = canvas.toDataURL();
}

function startAnimation() {
    isRunning = true;
    isPaused = false;
    animationGif.classList.remove("paused", "stopped");

    // Restart GIF animation
    animationGif.src = "";
    setTimeout(() => {
        animationGif.src = originalGifSrc;
    }, 10);
}

function stopAnimation() {
    if (isRunning) {
        isRunning = false;
        isPaused = true;
        animationGif.classList.add("paused");

        // Immediately freeze GIF at current frame
        stopGifAnimation();
    }
}

function resetAnimation() {
    isRunning = false;
    isPaused = false;
    animationGif.classList.remove("paused");
    animationGif.classList.add("stopped");

    // Reset to initial static frame
    animationGif.src = "";
    setTimeout(() => {
        animationGif.src = originalGifSrc;
        setTimeout(() => {
            stopGifAnimation();
        }, 100);
    }, 10);

    // Hide graph on reset
    if (isGraphVisible) {
        toggleGraph();
    }
}

function toggleGraph() {
    isGraphVisible = !isGraphVisible;

    if (isGraphVisible) {
        graphCanvas.style.display = "block";
        generateIntensityData();
        drawIntensityGraph();
        document.getElementById("showGraphBtn").textContent = "Hide Graph";
    } else {
        graphCanvas.style.display = "none";
        document.getElementById("showGraphBtn").textContent = "Show Graph";
    }
}

document.getElementById("startBtn").addEventListener("click", startAnimation);
document.getElementById("stopBtn").addEventListener("click", stopAnimation);
document.getElementById("resetBtn").addEventListener("click", resetAnimation);
document.getElementById("showGraphBtn").addEventListener("click", toggleGraph);

generateIntensityData();
