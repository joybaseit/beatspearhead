let video = document.querySelector('#dynamic-video');
let title = document.querySelector('.s3-vid-title');
// ----------buttons----------------
let step = document.querySelector('.btn-step');
let smile = document.querySelector('.btn-smile');
let game = document.querySelector('.btn-game');
let quiz = document.querySelector('.btn-quiz');
let scratch = document.querySelector('.btn-scratch');
let vr = document.querySelector('.btn-vr');
let sound = document.querySelector('.btn-sound');
let speech_round = document.querySelector('.btn-speech_round');
let charge = document.querySelector('.btn-charge');
let tilt = document.querySelector('.btn-tilt');

step.addEventListener('click',()=>{
    title.innerHTML="step";
    video.src = 'mcanvas-images/section-3/step.mp4';
})
smile.addEventListener('click',()=>{
    title.innerHTML="smile";
    video.src = 'mcanvas-images/section-3/smile.mp4';
})
charge.addEventListener('click',()=>{
    title.innerHTML="charge";
    video.src = 'mcanvas-images/section-3/Charger.mp4';
})
quiz.addEventListener('click',()=>{
    title.innerHTML="quiz";
    video.src = 'mcanvas-images/section-3/Quiz.mp4';
})
scratch.addEventListener('click',()=>{
    title.innerHTML="scratch";
    video.src = 'mcanvas-images/section-3/Scratch.mp4';
})
vr.addEventListener('click',()=>{
    title.innerHTML="vr";
    video.src = 'mcanvas-images/section-3/Vr.mp4';
})
sound.addEventListener('click',()=>{
    title.innerHTML="sound";
    video.src = 'mcanvas-images/section-3/Sound.mp4';
})
speech_round.addEventListener('click',()=>{
    title.innerHTML="voice";
    video.src = 'mcanvas-images/section-3/Voice.mp4';
})
game.addEventListener('click',()=>{
    title.innerHTML="game";
    video.src = 'mcanvas-images/section-3/Game.mp4';
})
tilt.addEventListener('click',()=>{
    title.innerHTML="tilt";
    video.src = 'mcanvas-images/section-3/Tilt.mp4';
})