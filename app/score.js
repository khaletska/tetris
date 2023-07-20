var gameMode = "";
let current_page = 1;
let rows = 10;
let lastPage;
let allHighScores = {}
let highScores = {}
let highScoreReq = []

class PlayerScore {
    constructor(position, playername, score, time, mode) {
        this.position = position;
        this.playername = playername;
        this.score = score;
        this.gameTime = time;
        this.mode = mode
    }
}
class Event {
    constructor(type, payload) {
        this.type = type,
            this.payload = payload
    }
}

// iteraction with page
const list_leaders = document.getElementById('leaders-board')
const list_element = document.getElementById('list')
const pagination_element = document.getElementById('pagination')
document.querySelector("#basic-mode-btn").addEventListener('click', () => {
    gameMode = "basic";
    document.body.style.backgroundImage = "";
    makeHighScoresForCurrMode();
    sendEvent("request_scores", "")
})
document.querySelector("#story-mode-btn").addEventListener('click', () => {
    gameMode = "story";
    // change background image and color of font
    document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1075493710692876330/1103635316495097917/background.jpg')";

    sendEvent("request_scores", "")
})

document.querySelector("#open-players-board-btn").addEventListener('click', () => {
    document.getElementById('players-list').style.display = "flex";
})

function routeEvent(event) {
    if (event.type === undefined) {
        alert("no 'type' in event")
    }
    switch (event.type) {
        case "send_scores":
            // get players depends on game mode
            highScores = event.payload
            if (gameMode != "") {
                makeHighScoresForCurrMode();
            }
            createLidersBoard(list_leaders)
            createPlayersBoard(list_element, rows, current_page)
            break
        default:
            alert("unsupported message type")
            break
    }
}

//generates a new message as json and sends it to the web server
function sendScores() {
    var playerName = document.getElementById("player-name").value;
    var score = document.getElementById("score").innerText
    var timer = document.querySelector("#timer").innerHTML
    var mode = gameMode
    if (playerName != null) {
        const newScore = new PlayerScore(0, playerName, parseInt(score), timer, mode)
        sendEvent("new_score", newScore)
    }
    return false
}

function sendEvent(eventName, payload) {
    const event = new Event(eventName, payload)
    conn.send(JSON.stringify(event))
}


window.onload = function () {
    // Apply our listener functions to the submit event on the form
    document.getElementById("submitscore").onsubmit = sendScores;


    // Check if the browser supports WebSocket
    if (window["WebSocket"]) {
        conn = new WebSocket("ws://" + document.location.host + "/ws");

        conn.onmessage = function (event) {
            const eventData = JSON.parse(event.data)
            const evt = Object.assign(new Event, eventData)
            routeEvent(evt)
        }
        conn.onopen = function (event) {
            sendEvent("request_scores", "")
        }
    } else {
        alert("Not supporting websockets");
    }
};



// TODO create comment
function makeHighScoresForCurrMode() {
    let currentHighScores = [];
    for (let i in highScores) {
        if (highScores[i].mode === gameMode) {
            let user = new PlayerScore(highScores[i].position, highScores[i].playerName, highScores[i].score, highScores[i].gameTime, highScores[i].mode)
            currentHighScores.push(user);
        }
    }

    highScores = currentHighScores;
}

// creates table for leadership board
function createLidersBoard(wrapper) {
    wrapper.innerHTML = ""

    let table = document.createElement('table')
    let cols = ["", "username", "score", "time"]
    let thead = document.createElement("thead")
    let tr = document.createElement("tr")

    cols.forEach((item) => {
        let th = document.createElement("th")
        th.innerText = item
        tr.appendChild(th)
    })

    thead.appendChild(tr)
    table.append(tr)

    // sort all users:
    highScores.sort((a, b) => b.score - a.score);

    let len;
    highScores.length < 3 ? len = highScores.length : len = 3

    for (let i = 0; i < len; i++) {
        let tr = document.createElement("tr")
        let vals = Object.values(highScores[i])
        for (let v in vals) {
            if (v == 0) {
                let td = document.createElement("td")
                td.innerText = i + 1
                tr.appendChild(td)
            } else if (v == 1 || v == 2 || v == 3) {
                let td = document.createElement("td")
                td.innerText = vals[v]
                tr.appendChild(td)
            }
        }
        table.appendChild(tr)
    }
    wrapper.appendChild(table)
    checkVisabilityOfPageBtns()
}

// creates a table from json data for the last sores pop up
function createPlayersBoard(wrapper, rows_per_page, pagenumber) {
    let table = document.createElement('table')
    let cols = ["", "username", "score", "time"]
    let thead = document.createElement("thead")
    let tr = document.createElement("tr")

    cols.forEach((item) => {
        let th = document.createElement("th")
        th.innerText = item
        tr.appendChild(th)
    })
    thead.appendChild(tr)
    table.append(tr)
    wrapper.innerHTML = ""
    pagenumber--
    //creates rest of the data
    let start = rows_per_page * pagenumber
    let end = start + rows_per_page
    if (end > highScores.length) end = highScores.length
    for (let i = start; i < end; i++) {
        let tr = document.createElement("tr")
        let vals = Object.values(highScores[i])
        for (let v in vals) {
            if (v == 0) {
                let td = document.createElement("td")
                td.innerText = i + 1
                tr.appendChild(td)
            } else if (v == 1 || v == 2 || v == 3) {
                let td = document.createElement("td")
                td.innerText = vals[v]
                tr.appendChild(td)
            }
        }
        table.appendChild(tr)
    }
    wrapper.appendChild(table)
}

// is it necessary to create all buttons instead of 2 buttons '<' '>' ?


document.getElementById('prev-page').addEventListener('click', () => {
    if (current_page > 1) current_page--
    checkVisabilityOfPageBtns()
    createPlayersBoard(list_element, rows, current_page)
})
document.getElementById('next-page').addEventListener('click', () => {
    //
    current_page++
    checkVisabilityOfPageBtns()
    // if (current_page > 1) current_page--
    createPlayersBoard(list_element, rows, current_page)
})


function checkVisabilityOfPageBtns() {
    lastPage = Math.ceil(highScores.length / 10);

    if (current_page === 1) {
        document.getElementById('prev-page').style.visibility = 'hidden';
    } else {
        document.getElementById('prev-page').style.visibility = 'visible';
    }

    if (current_page === lastPage) {
        document.getElementById('next-page').style.visibility = 'hidden';
    } else {
        document.getElementById('next-page').style.visibility = 'visible';
    }
}