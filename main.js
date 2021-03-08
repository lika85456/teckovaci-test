console.log("zadek")
let startButton = document.getElementById("start_button");
let startDiv = document.getElementById("start_div");
let startTime = 0;

var clicks = [

];

startButton.addEventListener("click", () => {
    startDiv.innerHTML = "Start in: 3";
    let time = new Date().getTime();
    let startInterval = setInterval(() => {
        startDiv.innerHTML = "Start in: " + (3 - (new Date().getTime() - time) / 1000);
        if ((3 - (new Date().getTime() - time) / 1000) < 0) {
            clearInterval(startInterval);
            start();
        }
    }, 100)
});
function start() {
    let id = 0;
    startTime = (new Date()).getTime();

    let tapFunction = () => {
        id++;
        if (id > 1) {
            document.getElementById(id - 1).style.backgroundColor = "gray";
            document.getElementById(id - 1).removeEventListener("click", tapFunction);
        }
        if (id > 6) {
            clearInterval(tapInterval);
            fillResultTable();
            return;
        }
        let currentDocument = document.getElementById(id);
        clicks[id - 1] = [];
        currentDocument.style.backgroundColor = "#8F8";
        currentDocument.addEventListener("click", () => {
            if (id !== +currentDocument.id) { return; }
            clicks[id - 1].push({
                time: (new Date()).getTime()
            });
        });

    };
    let tapInterval = setInterval(tapFunction, 5000);
    tapFunction();

}

function fillResultTable() {
    let table = document.getElementById("result_table");
    let lastTime = startTime;
    for (let i = 0; i < 6; i++) {
        let tr = document.createElement("tr");
        for (let x = 0; x < clicks[i].length; x++) {
            let td = document.createElement("td");
            td.innerHTML = clicks[i][x].time - lastTime;
            lastTime = clicks[i][x].time;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}