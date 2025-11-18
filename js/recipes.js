const recipes = [
{ name:'Recipe 1', desc:'A yummy dish...' },
{ name:'Recipe 2', desc:'A second dish...' },
{ name:'Recipe 3', desc:'Another one...' },
{ name:'Recipe 4', desc:'More food...' }
];


const container = document.getElementById('recipesContainer');
const descBox = document.getElementById('recipeDescription');
const bookmark = document.getElementById('bookmark');
let page = 0;


function renderPage() {
container.innerHTML = '';
const start = page*3;
recipes.slice(start, start+3).forEach((r,i)=>{
const b = document.createElement('button');
b.textContent = r.name;
b.onclick = ()=> showRecipe(r);
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


bookmark.addEventListener("click", () => {
  bookmark.classList.add("clicked");
  setTimeout(() => {
    document.body.classList.add("screen-blur");
  }, 600);
  setTimeout(() => {
    document.body.style.backgroundImage = "url('assets/backgrounds/recipes_screen0.png')";
  }, 1400);
  setTimeout(() => {
    document.body.classList.remove("screen-blur");
  }, 2200);
});



renderPage();