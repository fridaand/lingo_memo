function updateRounds() {
    let rounds = localStorage.getItem("totalRounds") || 0;
    document.getElementById("info-rounds").innerText = rounds;
}

function updateTime(time, id) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById(id).innerText =  minutes + ":" + seconds;
}

function updateTotalTime() {
    let totalTime = localStorage.getItem("totalTime");
    updateTime(totalTime, "info-totaltime");
}
