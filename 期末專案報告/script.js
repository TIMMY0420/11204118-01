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
    const cells = document.querySelectorAll('.sudoku-cell input');

    // 清空所有輸入框
    cells.forEach(cell => cell.value = '');

    // 顯示固定盤面
    fixedBoard.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const index = rowIndex * 9 + colIndex;
            if (value !== null) {
                cells[index].value = value;
                cells[index].disabled = true;  // 禁用輸入框，這些格子是預設的
            }
        });
    });
}

// 檢查答案
function checkAnswer() {
    const cells = document.querySelectorAll('.sudoku-cell input');
    let isCorrect = true;

    fixedBoard.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const index = rowIndex * 9 + colIndex;
            const inputValue = parseInt(cells[index].value);
            if (value !== null && value !== inputValue) {
                isCorrect = false;
                cells[index].style.backgroundColor = 'red';  // 標記錯誤的格子
            } else {
                cells[index].style.backgroundColor = '';  // 清除背景顏色
            }
        });
    });

    const message = document.getElementById('message');
    if (isCorrect) {
        message.textContent = '恭喜！答對了！';
        message.style.color = 'green';
    } else {
        message.textContent = '答案錯誤，請再試一次！';
        message.style.color = 'red';
    }
}

// 當按下 "中難度" 按鈕時顯示固定的題目
document.getElementById('medium-btn').addEventListener('click', () => {
    generateFixedSudoku();
});

// 當按下 "檢查答案" 按鈕時檢查答案
document.getElementById('check-btn').addEventListener('click', () => {
    checkAnswer();
});

// 預設生成固定題目
generateFixedSudoku();
