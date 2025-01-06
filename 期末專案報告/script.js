/* 基本佈局 */
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f4;
}

.sudoku-container {
    border: 2px solid #333;
    padding: 20px;
    background-color: white;
    text-align: center;
    width: 450px;
}

h1 {
    font-size: 24px;
    color: #333;
}

/* 難度選擇按鈕 */
.difficulty-buttons {
    margin-bottom: 20px;
}

.difficulty-buttons button {
    padding: 10px;
    font-size: 16px;
    margin: 5px;
    cursor: pointer;
}

.difficulty-buttons button:hover {
    background-color: #ddd;
}

/* 數獨格子佈局 */
.sudoku-grid {
    display: grid;
    grid-template-columns: repeat(9, 50px);
    grid-template-rows: repeat(9, 50px);
    gap: 1px;
}

.sudoku-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    font-size: 18px;
}

/* 加粗每個 3x3 九宮格的邊框 */
.sudoku-grid .sudoku-cell:nth-child(3n) {
    border-right: 2px solid #333; /* 加粗每個九宮格的右邊框 */
}

.sudoku-grid .sudoku-cell:nth-child(n+28):nth-child(-n+36),
.sudoku-grid .sudoku-cell:nth-child(n+57):nth-child(-n+63) {
    border-bottom: 2px solid #333; /* 加粗每個九宮格的底邊框 */
}

/* 輸入框樣式 */
.sudoku-cell input {
    border: none;
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 18px;
    background-color: transparent;
    outline: none;
}

/* 顯示訊息 */
#message {
    margin-top: 10px;
    font-size: 18px;
    color: green;
}

#check-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
}

#check-btn:hover {
    background-color: #555;
}
