const cross = "X";
const circle = "O";
let currentPlayer = circle; // Startspieler

let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]




// let fields = [
//     circle, circle, null,
//     null, cross, null,
//     cross, null, null,
// ];

function init() {
    render();
}

function handleClick(index, element) {
    if (fields[index] !== null) return; // Falls das Feld schon belegt ist, nichts tun

    fields[index] = currentPlayer; // Spielerzug speichern
    element.innerHTML = currentPlayer === cross ? generateCrossSVG() : generateCircleSVG(); // SVG einfügen
    element.onclick = null; // onclick-Event entfernen
    currentPlayer = currentPlayer === cross ? circle : cross; // Spieler wechseln
}

function render() {
    let html = "<table>";

    for (let i = 0; i < 3; i++) {
        html += "<tr>";
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index];

            html += `<td onclick="handleClick(${index}, this)">`;
            if (symbol === cross) {
                html += generateCrossSVG();
            } else if (symbol === circle) {
                html += generateCircleSVG();
            }
            html += `</td>`;
        }
        html += "</tr>";
    }

    html += "</table>";
    document.getElementById("content").innerHTML = html;
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="#00B0EF" stroke-width="8" fill="none"
                stroke-dasharray="188.4" stroke-dashoffset="188.4">
                <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="0.2s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10"
                stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.2s" fill="freeze" />
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10"
                stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.2s" fill="freeze" begin="0.15s"/>
            </line>
        </svg>
    `;
}