// 生成 9x9 數獨格子
const grid = document.querySelector('.sudoku-grid');

// 隨機生成 9x9 數獨格子
function createGrid() {
    grid.innerHTML = ''; // 清空現有的格子
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');

            // 在每個格子中添加一個輸入框
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.maxLength = 1;  // 只允許一個數字

            cell.appendChild(input);
            grid.appendChild(cell);
        }
    }
}

// 生成隨機數獨題目（低、中、高難度）
function generateSudoku(difficulty) {
    const cells = document.querySelectorAll('.sudoku-cell input');
    let prefilledCount;

    if (difficulty === 'easy') {
        prefilledCount = 40;  // 低難度，40個預填數字
    } else if (difficulty === 'medium') {
        prefilledCount = 30;  // 中難度，30個預填數字
    } else {
        prefilledCount = 20;  // 高難度，20個預填數字
    }

    // 清空所有輸入框
    cells.forEach(cell => cell.value = '');

    // 隨機生成題目
    const filledIndexes = new Set();
    while (filledIndexes.size < prefilledCount) {
        const index = Math.floor(Math.random() * 81); // 隨機選擇一個格子
        filledIndexes.add(index);
    }

    filledIndexes.forEach(index => {
        const value = Math.floor(Math.random() * 9) + 1; // 隨機選擇一個1到9的數字
        cells[index].value = value;
        cells[index].disabled = true; // 禁用已填的格子
    });
}

// 檢查數獨的正確性
function checkSudoku() {
    const cells = document.querySelectorAll('.sudoku-cell input');
    const message = document.getElementById('message');
    let isValid = true;

    // 檢查每行
    for (let i = 0; i < 9; i++) {
        const rowValues = new Set();
        for (let j = 0; j < 9; j++) {
            const cellValue = cells[i * 9 + j].value;
            if (cellValue && rowValues.has(cellValue)) {
                isValid = false;
                break;
            }
            rowValues.add(cellValue);
        }
    }

    // 檢查每列
    for (let j = 0; j < 9; j++) {
        const colValues = new Set();
        for (let i = 0; i < 9; i++) {
            const cellValue = cells[i * 9 + j].value;
            if (cellValue && colValues.has(cellValue)) {
                isValid = false;
                break;
            }
            colValues.add(cellValue);
        }
    }

    // 檢查每個 3x3 九宮格
    for (let r = 0; r < 9; r += 3) {
        for (let c = 0; c < 9; c += 3) {
            const blockValues = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const cellValue = cells[(r + i) * 9 + (c + j)].value;
                    if (cellValue && blockValues.has(cellValue)) {
                        isValid = false;
                        break;
                    }
                    blockValues.add(cellValue);
                }
            }
        }
    }

    // 顯示檢查結果
    if (isValid) {
        message.textContent = '數獨完成！';
        message.style.color = 'green';
    } else {
        message.textContent = '數獨錯誤，請檢查並修正！';
        message.style.color = 'red';
    }
}

// 綁定難度選擇按鈕
document.getElementById('easy-btn').addEventListener('click', () => {
    createGrid();
    generateSudoku('easy');
});
document.getElementById('medium-btn').addEventListener('click', () => {
    createGrid();
    generateSudoku('medium');
});
document.getElementById('hard-btn').addEventListener('click', () => {
    createGrid();
    generateSudoku('hard');
});

// 綁定檢查答案按鈕
document.getElementById('check-btn').addEventListener('click', checkSudoku);

// 預設生成低難度題目
createGrid();
generateSudoku('easy');
