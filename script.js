let currentGrid = [];
let levelsData = [];

async function init() {
    const response = await fetch('data/levels.json');
    const data = await response.json();
    levelsData = data.levels;
    loadLevel(0);
}

function loadLevel(index) {
    currentGrid = JSON.parse(JSON.stringify(levelsData[index].grid));
    render();
}

function toggle(r, c) {
    if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        currentGrid[r][c] = currentGrid[r][c] === 1 ? 0 : 1;
    }
}

function handleCellClick(r, c) {
    toggle(r, c);     // Клік
    toggle(r - 1, c); // Вгору
    toggle(r + 1, c); // Вниз
    toggle(r, c - 1); // Вліво
    toggle(r, c + 1); // Вправо
    render();
    checkWin();
}

function render() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.className = `cell ${currentGrid[r][c] === 1 ? 'on' : 'off'}`;
            cell.onclick = () => handleCellClick(r, c);
            board.appendChild(cell);
        }
    }
}

function checkWin() {
    const win = currentGrid.every(row => row.every(cell => cell === 0));
    document.getElementById('status').textContent = win ? "Ви перемогли!" : "";
}

init();
