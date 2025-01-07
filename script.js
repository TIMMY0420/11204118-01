// 生成 9x9 數獨格子
const grid = document.querySelector('.sudoku-grid');

// 固定的數獨題目（部分已填入數字的題目）
const puzzle = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, 7, null, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

// 生成 9x9 數獨格子
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

            // 如果該格子在題目中已有數字，則設置為只讀
            if (puzzle[row][col] !== null) {
                input.value = puzzle[row][col];
                input.disabled = true;  // 禁用已填入的格子
            }

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

// 檢查玩家填寫的答案
function checkAnswer() {
    const cells = document.querySelectorAll('.sudoku-cell input');
    let isCorrect = true;
    let isComplete = true;

    // 檢查每個格子的數字
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const row = Math.floor(i / 9);
        const col = i % 9;
        const playerValue = parseInt(cell.value);

        // 如果該格子沒有填寫數字，則跳過檢查
        if (cell.value === '') {
            isComplete = false;  // 如果有格子沒有填寫
            continue;
        }

        // 進行數字比對
        if (playerValue !== puzzle[row][col]) {
            isCorrect = false;
            break; // 一旦有錯誤，停止檢查
        }
    }

    // 顯示結果
    const message = document.getElementById('message');
    if (!isComplete) {
        message.textContent = "請完成空格";
        message.style.color = 'orange';
    } else if (isCorrect) {
        message.textContent = "恭喜你，答案正確！";
        message.style.color = 'green';
    } else {
        message.textContent = "答案錯誤，請再試一次！";
        message.style.color = 'red';
    }
}

// 按鈕事件
document.getElementById('check-btn').addEventListener('click', checkAnswer);

// 初始化遊戲
createGrid();
