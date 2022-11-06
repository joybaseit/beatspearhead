let img = document.querySelector('#s6-dynamic-img');
let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let btn3 = document.querySelector('#btn3');
let btn4 = document.querySelector('#btn4');

btn1.addEventListener('click',()=>{
    img.src = 'inf/1Discoverhomepage.png';
})
btn2.addEventListener('click',()=>{
    img.src = 'inf/2createhomepage.png';
})
btn3.addEventListener('click',()=>{
    img.src = 'inf/3enablecommercehomepage.png';
})
btn4.addEventListener('click',()=>{
    img.src = 'inf/4measureandanalyze.png';
})