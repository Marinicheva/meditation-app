/*jshint esversion: 6 */
const player = document.querySelector('.player-part');
const playBtn = document.querySelector('#play-btn');
const pauseBtn = document.querySelector('#pause-btn');
const timerButtons = document.querySelector('#timer-buttons');
const timerPanel = document.querySelector('#time-panel');
const song = document.querySelector('#song');

let time = 10;
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

function playMeditation () {
    playBtn.classList.toggle('player-part-btn_hide');
    pauseBtn.classList.toggle('player-part-btn_hide');
    timerStart();
    timerStop();

}

function timerStart() {
    if(playBtn.classList.contains('player-part-btn_hide')) {
        timerID = setInterval(decreaseTime, 1000);
    }
    song.play();
}

function timerStop() {
    if (pauseBtn.classList.contains('player-part-btn_hide')) {
        clearInterval(timerID);
        if (song.played) {
            song.pause();
        }
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



function stopPlay() {
    song.pause();
    timerPanel.innerHTML = '00:00';//For test
}

