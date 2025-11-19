const sprite = document.getElementById("chefSprite");
let frame = 0;

// Animate chef sprite
setInterval(() => {
  frame = (frame + 1) % 4;
  sprite.style.objectPosition = `-${frame * 200}px 0px`;
}, 200);


// ===== COOKING LOGIC =====

const recipeId = localStorage.getItem("currentRecipe");
let step = 1;

const recipeFull = document.getElementById("recipeFull");
const stepImage = document.getElementById("stepImage");
const stepNext = document.getElementById("stepNext");

if (!recipeId) {
  console.warn("No recipe selected!");
} else {
  loadStep();
}

function loadStep() {
  const path = `assets/recipe-text/${recipeId}_${step}.png`;
  stepImage.src = path;

  stepImage.onerror = () => {
    // Step does not exist → loop back to step 1
    step = 1;
    stepImage.src = `assets/recipe-text/${recipeId}_1.png`;
  };
}

stepNext.onclick = () => {
  step++;
  loadStep();

  if (window.gameAudio) gameAudio.play("click");
};
