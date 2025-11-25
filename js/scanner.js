const URL = "models/ingredient-model/";
let model;

let stableIngredient = null;
let stableStartTime = null;
const REQUIRED_TIME = 3000; // 3 seconds

async function init() {
  try {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("Model loaded");
  } catch (err) {
    console.error("Model load error:", err);
    document.getElementById("result").textContent = "Model failed to load!";
    return;
  }

  const video = document.getElementById("video");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    video.srcObject = stream;
    await video.play();
  } catch (err) {
    console.error("Camera failed:", err);
    document.getElementById("result").textContent = "Camera blocked!";
    return;
  }

  requestAnimationFrame(loop);
}

async function loop() {
  await predict();
  requestAnimationFrame(loop);
}

async function predict() {
  const video = document.getElementById("video");
  if (video.readyState < 2) return;

  let prediction = await model.predict(video);

  let best = prediction.reduce(
    (max, p) => (p.probability > max.probability ? p : max),
    prediction[0]
  );

  document.getElementById("result").textContent =
    `${best.className}: ${Math.round(best.probability * 100)}%`;

  const fill = document.getElementById("progressFill");

  if (best.probability > 0.90) {
    if (stableIngredient !== best.className) {
      stableIngredient = best.className;
      stableStartTime = performance.now();
      fill.style.width = "0%";
    } else {
      const elapsed = performance.now() - stableStartTime;
      const progress = Math.min(elapsed / REQUIRED_TIME, 1);

      fill.style.width = (progress * 100) + "%";

      if (elapsed >= REQUIRED_TIME) {
        fill.style.width = "100%";
        addIngredient(stableIngredient);
      }
    }
  } else {
    stableIngredient = null;
    stableStartTime = null;
    fill.style.width = "0%";
  }
}

function addIngredient(name) {
  let stored = JSON.parse(localStorage.getItem("fridgeIngredients") || "[]");

  if (!stored.includes(name)) {
    stored.push(name);
    localStorage.setItem("fridgeIngredients", JSON.stringify(stored));
  }

  const result = document.getElementById("result");
  result.textContent = `${name} added!`;
  result.style.color = "#00ff00";

  setTimeout(() => {
    window.location.href = "fridge.html";
  }, 1500); 
}

init();
