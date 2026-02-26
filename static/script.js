// ===== TYPE EFFECT =====
const roles = [
"Aspiring Data Scientist",
"Machine Learning & Deep Learning Learner",
"Python Developer"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function typeEffect(){
current = roles[i];
const typingElement = document.querySelector(".typing");

if(!isDeleting){
typingElement.textContent = current.substring(0, j + 1);
j++;

if(j === current.length){
setTimeout(() => {
isDeleting = true;
}, 1200);
}
}else{
typingElement.textContent = current.substring(0, j - 1);
j--;

if(j === 0){
isDeleting = false;
i = (i+1) % roles.length;
}
}

setTimeout(typeEffect, isDeleting ? 50 : 100);
}


document.addEventListener("DOMContentLoaded", function(){
typeEffect();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll("nav a").forEach(link=>{
link.addEventListener("click",function(e){
const target = this.getAttribute("href");

if(target.startsWith("#")){
e.preventDefault();
document.querySelector(target)
.scrollIntoView({behavior:"smooth"});
}
});
});

// ===== IMAGE MODAL =====
function openModal(imgSrc){
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

modal.style.display = "block";
modalImg.src = imgSrc;
}

document.querySelector(".close").addEventListener("click", function(){
document.getElementById("imageModal").style.display = "none";
});

window.addEventListener("click", function(event){
const modal = document.getElementById("imageModal");
if(event.target === modal){
modal.style.display = "none";
}
});
