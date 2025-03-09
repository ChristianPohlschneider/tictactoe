const cross = "X";
const circle = "O";
let currentPlayer = circle; // Startspieler
let gameOver = false; // Spielstatus

let fields = Array(9).fill(null);

function init() {
    render();
}

function handleClick(index, element) {
    if (fields[index] !== null || gameOver) return; // Falls das Feld schon belegt ist oder das Spiel vorbei ist, nichts tun

    fields[index] = currentPlayer; // Spielerzug speichern
    element.innerHTML = currentPlayer === cross ? generateCrossSVG() : generateCircleSVG(); // SVG einfügen
    element.onclick = null; // onclick-Event entfernen

    let winData = checkWinner();
    if (winData) {
        gameOver = true;
        drawWinningLine(winData);
        return;
    }

    currentPlayer = currentPlayer === cross ? circle : cross; // Spieler wechseln
}

function render() {
    let html = '<div id="board-wrapper" style="position: relative; width: 300px; height: 300px;">';
    html += "<table>";

    for (let i = 0; i < 3; i++) {
        html += "<tr>";
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index];
            html += `<td onclick="handleClick(${index}, this)" style="width: 100px; height: 100px; position: relative;">`;
            if (symbol === cross) {
                html += generateCrossSVG();
            } else if (symbol === circle) {
                html += generateCircleSVG();
            }
            html += "</td>";
        }
        html += "</tr>";
    }

    html += "</table></div>";
    html += '<div class="buttondiv">';
    html += '<button class="restartButton" onclick="restartGame()">Restart Game!</button>';
    html += '</div>';
    document.getElementById("content").innerHTML = html;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]             // Diagonalen
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combo;
        }
    }
    return null;
}

function drawWinningLine(winCombo) {
    const board = document.getElementById("board-wrapper");
    const line = document.createElement("div");
    line.style.position = "absolute";
    line.style.backgroundColor = "white";
    line.style.height = "5px";
    line.style.transformOrigin = "center center";
    line.style.borderRadius = "5px";

    const positions = [
        { x: 50, y: 50 }, { x: 150, y: 50 }, { x: 250, y: 50 },
        { x: 50, y: 150 }, { x: 150, y: 150 }, { x: 250, y: 150 },
        { x: 50, y: 250 }, { x: 150, y: 250 }, { x: 250, y: 250 }
    ];

    const [a, b, c] = winCombo.map(i => positions[i]);
    const dx = c.x - a.x;
    const dy = c.y - a.y;
    const length = Math.sqrt(dx * dx + dy * dy) + 20; // +20 für bessere Anpassung
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    line.style.width = `${length}px`;
    line.style.left = `${(a.x + c.x) / 2}px`;
    line.style.top = `${(a.y + c.y) / 2}px`;
    line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    board.appendChild(line);
}

function restartGame() {
    fields = Array(9).fill(null);
    currentPlayer = circle;
    gameOver = false;
    render();
}

function generateCircleSVG() {
    return `<svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" stroke="#00B0EF" stroke-width="8" fill="none"
                    stroke-dasharray="188.4" stroke-dashoffset="188.4">
                    <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="0.2s" fill="freeze" />
                </circle>
            </svg>`;
}

function generateCrossSVG() {
    return `<svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10"
                    stroke-dasharray="84.85" stroke-dashoffset="84.85">
                    <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.2s" fill="freeze" />
                </line>
                <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10"
                    stroke-dasharray="84.85" stroke-dashoffset="84.85">
                    <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.2s" fill="freeze" begin="0.15s"/>
                </line>
            </svg>`;
}