// 固定的數獨盤面（這是一個有解的盤面，含有空白格子）
const fixedBoard = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

// 顯示固定盤面
function generateFixedSudoku() {
    const grid = document.querySelector('.sudoku-grid');
    grid.innerHTML = '';  // 清空格子

    // 生成 9x9 格子
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            
            // 在每個格子中添加輸入框
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.maxLength = 1;
            cell.appendChild(input);

            // 設置初始數字並禁用已填寫的格子
            if (fixedBoard[row][col] !== null) {
                input.value = fixedBoard[row][col];
                input.disabled = true;  // 禁用這些格子
            }

            // 當該格子為空時，只能輸入數字 1~9
            else {
                input.addEventListener('input', function() {
                    let value = parseInt(input.value);
                    if (value < 1 || value > 9) {
                        input.value = '';  // 如果不是 1~9 之間的數字，則清空
                    }
                });
            }

            grid.appendChild(cell);
        }
    }
}

// 檢查答案
function checkAnswer() {
    const cells = document.querySelectorAll('.sudoku-cell input');
    let isCorrect = true;
    const message = document.getElementById('message');
    let isEmpty = false;  // 用來檢查是否有空格未填

    // 清除先前的錯誤標註
    cells.forEach(cell => {
        cell.style.backgroundColor = '';  // 清除背景顏色
    });

    fixedBoard.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const index = rowIndex * 9 + colIndex;
            const inputValue = parseInt(cells[index].value);

            // 檢查是否有空格未填
            if (cells[index].value === '') {
                isEmpty = true;
            }

            // 檢查用戶輸入的答案是否正確
            if (value !== null && value !== inputValue) {
                isCorrect = false;
                cells[index].style.backgroundColor = 'red';  // 標記錯誤的格子
            }
        });
    });

    if (isEmpty) {
        message.textContent = '請填寫所有空格！';
        message.style.color = 'orange';
    } else if (isCorrect) {
        message.textContent = '恭喜！答對了！';
        message.style.color = 'green';
    } else {
        message.textContent = '答案錯誤，請再試一次！';
        message.style.color = 'red';
    }
}

// 當按下 "檢查答案" 按鈕時檢查答案
document.getElementById('check-btn').addEventListener('click', () => {
    checkAnswer();
});

// 預設生成固定題目
generateFixedSudoku();
