

function add(a, b) {
    return a + b;
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(a, b) {
    return a * b;
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

function operate(operator, first, second) {
    switch(operator) {
        case '+':
            return add(first, second);
        case '-':
            return subtract(first, second);
        case '×':
            return multiply(first, second);
        case '/':
            return divide(first, second);
    }
}


const opDis = document.querySelector('#operations_display');
const resultsDis = document.querySelector('#results_display');
const buttonPad = document.querySelector('#button_pad');
buttonPad.addEventListener('click', insertValue, true);

let displayStr = '';
let storedOperation = [];

function insertValue(evt) {
    console.log(evt.target.value, displayStr);
    if (evt.target.classList[0] === 'num-btn') {
        displayStr += evt.target.value;
        resultsDis.textContent = displayStr;
    }

    if (evt.target.classList[0] === 'op-btn') {
        if (storedOperation.length <= 1) {
            storedOperation.push(parseInt(displayStr));
            storedOperation.push(evt.target.value);
            displayStr = '';
        } else {
            const op = storedOperation.pop();
            const a = storedOperation.pop();
            const b = parseInt(displayStr);
            const result = operate(op, a, b);
            console.log(result);
            storedOperation.push(result);
        }
    }

    console.log(storedOperation);
}
