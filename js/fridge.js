const input = document.getElementById('ingredientInput');
const list = document.getElementById('ingredientList');


function addIngredient() {
if (!input.value.trim()) return;


const item = document.createElement('div');
item.className = 'ingredient-item';


const img = document.createElement('img');
img.src = `assets/${input.value}.png`;
img.title = input.value;


const del = document.createElement("button");
del.className = "remove-ingredient";

const delImg = document.createElement("img");
delImg.src = "assets/buttons/delete_button.png";
delImg.draggable = false;

del.appendChild(delImg);

del.onclick = () => {
  item.remove();
  gameAudio.play("remove");
};


item.appendChild(img);
item.appendChild(del);


list.appendChild(item);
input.value='';
}


searchBtn.onclick = addIngredient;