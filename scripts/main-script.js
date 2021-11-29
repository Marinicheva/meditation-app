/*jshint esversion: 6 */
const player = document.querySelector('.player-part');
const playBtn = document.querySelector('#play-btn');
const pauseBtn = document.querySelector('#pause-btn');
const timerButtons = document.querySelector('#timer-buttons');
const timerPanel = document.querySelector('#time-panel');
const song = document.querySelector('#song');
const video = document.querySelector('#video-bg');
const soundTypeBtns = document.querySelectorAll('.btn-sound-type');

let time = 0;
let timerID;

timerButtons.addEventListener('click', event => {
    if (event.target.classList.contains('btn-timer')) {
        time = +event.target.getAttribute('data-time');
        if (time < 60) {
            timerPanel.innerHTML = `00:${time}`;
        } else if ((time / 60) >= 10) {
            timerPanel.innerHTML = `${Math.floor(time / 60)}:0${time % 60}`;
        } else if ((time % 60) === 0) {
            timerPanel.innerHTML = `0${Math.floor(time / 60)}:0${time % 60}`;
        } else {
            timerPanel.innerHTML = `0${Math.floor(time / 60)}:${time % 60}`;
        }
    }
});

player.addEventListener('click', () => {
    playMeditation();    
});

soundTypeBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        let soundAttr = event.target.getAttribute('data-sound');
        let videoAttr = event.target.getAttribute('data-video');
        song.setAttribute('src', soundAttr);
        video.setAttribute('src', videoAttr);
        checkPlaying();
    });
});


function playMeditation () {
    playBtn.classList.toggle('player-part-btn_hide');
    pauseBtn.classList.toggle('player-part-btn_hide');
    timerWork();
}

function timerWork() {
    if(playBtn.classList.contains('player-part-btn_hide')) {
        timerID = setInterval(decreaseTime, 1000);
        song.play();
        video.play();
    } else {
        clearInterval(timerID);
        song.pause();
        video.pause();
    }
}

function decreaseTime() {
    let currentTime = --time;
    let leftMinutes = Math.floor(currentTime / 60);
    let leftSeconds = Math.floor(currentTime % 60);

    if (currentTime <= 0) {
        stopPlay();
    } else {
        if (leftMinutes < 10) {
            if (leftSeconds < 10) {
                timerPanel.innerHTML = `0${leftMinutes}:0${leftSeconds}`;
            } else {
                timerPanel.innerHTML = `0${leftMinutes}:${leftSeconds}`;
            }
        } else {
            timerPanel.innerHTML = `${leftMinutes}:${leftSeconds}`;
        }
    }
}

function checkPlaying() {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
      } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
      }
}

function stopPlay() {
    song.pause();
    video.pause();
    timerPanel.innerHTML = '00:00';
}

