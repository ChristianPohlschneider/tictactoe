const cross = "X";
const circle = "O";

let fields = [
    circle,
    null,
    cross,
    null,
    null,
    null,
    null,
    cross,
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

function render() {
    let html = "<table>";

    for (let i = 0; i < 3; i++) {
        html += "<tr>";
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] ? fields[index] : "";
            if (symbol == "O") {
                html += `<td>${generateCircleSVG()}</td>`;
            }
            else if (symbol == "X") {
                html += `<td>${generateCrossSVG()}</td>`;
            }
            else {
                html += `<td>${symbol}</td>`;
            }
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
            <line x1="30" y1="30" x2="70" y2="70" stroke="#FFC000" stroke-width="8"
                stroke-dasharray="56.57" stroke-dashoffset="56.57">
                <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.2s" fill="freeze" />
            </line>
            <line x1="70" y1="30" x2="30" y2="70" stroke="#FFC000" stroke-width="8"
                stroke-dasharray="56.57" stroke-dashoffset="56.57">
                <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.2s" fill="freeze" begin="0.15s"/>
            </line>
        </svg>
    `;
}