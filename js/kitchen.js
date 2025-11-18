const sprite = document.getElementById('chefSprite');
let frame = 0;


setInterval(()=>{
frame = (frame+1) % 4;
sprite.style.objectPosition = `-${frame*200}px 0px`;
}, 200);