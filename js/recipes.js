const recipes = [
  { name: "Recipe 1", desc: "A yummy dish..." },
  { name: "Recipe 2", desc: "A second dish..." },
  { name: "Recipe 3", desc: "Another one..." },
  { name: "Recipe 4", desc: "More food..." },
];

const container = document.getElementById("recipesContainer");
const descBox = document.getElementById("recipeDescription");
const bookmark = document.getElementById("bookmark");
let page = 0;

function renderPage() {
  container.innerHTML = "";
  const start = page * 3;
  recipes.slice(start, start + 3).forEach((r, i) => {
    const b = document.createElement("button");
    b.textContent = r.name;
    b.onclick = () => showRecipe(r);
    container.appendChild(b);
  });
}

function showRecipe(r) {
  descBox.innerHTML = `
<h2>${r.name}</h2>
<p>${r.desc}</p>
<button onclick="location.href='kitchen.html'">Choose this recipe</button>
`;
}

const screenWrap = document.getElementById("screenWrap");

bookmark.addEventListener("click", () => {
  // bookmark flies out
  bookmark.classList.add("clicked");

  // blur screen AFTER bookmark leaves
  setTimeout(() => {
    screenWrap.classList.add("screen-blur");
    document.querySelector(".bg-layer").classList.add("blurred");
  }, 500);

  // change background while blurred
  setTimeout(() => {
    const bg = document.querySelector(".bg-layer");
    bg.style.backgroundImage = "url('assets/backgrounds/recipes_screen0.png')";
  }, 1200);

  // unblur smoothly
  setTimeout(() => {
    screenWrap.classList.remove("screen-blur");
    document.querySelector(".bg-layer").classList.remove("blurred");
  }, 1700);
});

renderPage();
