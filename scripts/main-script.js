/*jshint esversion: 6 */
const player = document.querySelector('.player-part');
const playBtn = document.querySelector('#play-btn');
const pauseBtn = document.querySelector('#pause-btn');
const timerButtons = document.querySelector('#timer-buttons');
const timerPanel = document.querySelector('#time-panel');

let time = 10;

timerButtons.addEventListener('click', event => {
    if (event.target.classList.contains('btn-timer')) {
        time = +event.target.getAttribute('data-time');
    }
});

player.addEventListener('click', () => {
    playBtn.classList.toggle('player-part-btn_hide');
    pauseBtn.classList.toggle('player-part-btn_hide');
    setInterval(decreaseTime, 1000);
});

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
    timerPanel.innerHTML = '00:00';//For test
}

