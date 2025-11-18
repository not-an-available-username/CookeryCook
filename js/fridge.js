const input = document.getElementById('ingredientInput');
const list = document.getElementById('ingredientList');


function addIngredient() {
if (!input.value.trim()) return;


const item = document.createElement('div');
item.className = 'ingredient-item';


const img = document.createElement('img');
img.src = `assets/${input.value}.png`;
img.title = input.value;


const del = document.createElement('button');
del.textContent = 'X';
del.onclick = ()=> item.remove();


item.appendChild(img);
item.appendChild(del);


list.appendChild(item);
input.value='';
}


searchBtn.onclick = addIngredient;