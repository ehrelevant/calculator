

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
    console.log(evt.target.value);

    const storedLength = storedOperation.length;
    if (evt.target.classList[0] === 'num-btn') {
        displayStr += evt.target.value;
        resultsDis.textContent = displayStr;
        if (storedLength == 1) {
            storedOperation.pop();
        }
    }

    console.log(displayStr);

    if (evt.target.classList[0] === 'op-btn') {
        const op = evt.target.value;
        if (storedLength == 0) {
            storedOperation.push(parseInt(displayStr));
            storedOperation.push(op);
            displayStr = '';
        } else if (storedLength == 1) {
            storedOperation.push(op);
            displayStr = '';
        } else if (storedLength == 2 && displayStr == '') {
            storedOperation[1] = op;
        } else {
            const savedOp = storedOperation.pop();
            const a = storedOperation.pop();
            const b = parseInt(displayStr);

            const result = operate(savedOp, a, b);

            console.log(result);
            resultsDis.textContent = result;
            storedOperation.push(result);
            if (op !== '=') {
                storedOperation.push(op);
            }
            displayStr = '';
        }
    }
    console.log(storedOperation);
}