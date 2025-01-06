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

// 檢查該位置的數字是否在同一行、同一列、同一九宮格內重複
function isValid(board, row, col, num) {
    // 檢查行
    for (let c = 0; c < 9; c++) {
        if (board[row][c] === num) {
            return false;
        }
    }

    // 檢查列
    for (let r = 0; r < 9; r++) {
        if (board[r][col] === num) {
            return false;
        }
    }

    // 檢查 3x3 九宮格
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

// 生成中等難度的數獨題目
function generateSudoku(difficulty) {
    const cells = document.querySelectorAll('.sudoku-cell input');
    let prefilledCount = 30;  // 中等難度，30個預填數字

    // 清空所有輸入框
    cells.forEach(cell => cell.value = '');

    // 隨機生成題目
    const board = Array.from({ length: 9 }, () => Array(9).fill(null)); // 數獨盤面

    const filledIndexes = new Set();
    while (filledIndexes.size < prefilledCount) {
        const index = Math.floor(Math.random() * 81); // 隨機選擇一個格子
        if (!filledIndexes.has(index)) {
            filledIndexes.add(index);

            const row = Math.floor(index / 9);
            const col = index % 9;
            let num;
            let attempts = 0;

            // 確保數字不重複
            do {
                num = Math.floor(Math.random() * 9) + 1;
                attempts++;
            } while (!isValid(board, row, col, num) && attempts < 10);

            if (attempts < 10) {
                board[row][col] = num;
                cells[index].value = num;
            }
        }
    }
}

// 當前只使用中等難度
document.getElementById('medium-btn').addEventListener('click', () => {
    generateSudoku('medium');
});

createGrid();
generateSudoku('medium');
