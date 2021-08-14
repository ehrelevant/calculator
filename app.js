
const MAX_ROUND = 6;

const opDis = document.querySelector('#operations_display');
const resultsDis = document.querySelector('#results_display');
const buttonPad = document.querySelector('#button_pad');
buttonPad.addEventListener('click', insertValue, true);

let displayStr = '';
let storedOperation = [];

function insertValue(evt) {
    const storedLength = storedOperation.length;
    if (evt.target.classList[0] === 'num-btn') {
        if (displayStr === '0') {
            displayStr = evt.target.value;
            resultsDis.textContent = displayStr;
        } else {
            displayStr += evt.target.value;
            resultsDis.textContent = displayStr;
        }
        if (storedLength == 1) {
            storedOperation.pop();
        }
    }

    if (evt.target.classList[0] === 'delete-btn') {
        if (displayStr == '') {
            resultsDis.textContent = '';
            opDis.textContent = '';
            storedOperation = [];
        } else {
            displayStr = displayStr.slice(0, -1);
            resultsDis.textContent = displayStr;
        }
    }

    if (evt.target.classList[0] === 'clear-btn') {
        if (displayStr == '') {
            resultsDis.textContent = '';
            opDis.textContent = '';
            storedOperation = [];
        } else {
            resultsDis.textContent = '0';
            displayStr = '';
        }
    }

    if (evt.target.classList[0] === 'op-btn') {
        const op = evt.target.value;
        if (storedLength == 0) {
            if (displayStr != '' && op !== '=') {
                storedOperation.push(Number(displayStr));
                storedOperation.push(op);
                displayStr = '';
            }
        } else if (storedLength == 1) {
            if (op !== '=') {
                storedOperation.push(op);
                displayStr = '';
            }
        } else if (storedLength == 2 && displayStr == '') {
            if (op !== '=') {
                storedOperation[1] = op;
            }
        } else {
            const savedOp = storedOperation.pop();
            const a = storedOperation.pop();
            const b = Number(displayStr);

            if (savedOp === '/' && b === 0) {
                resultsDis.textContent = 'ERROR! Cannot Divide by 0.';
            } else {
                const result = Math.round(operate(savedOp, a, b) * (10 ** MAX_ROUND)) / (10 ** MAX_ROUND);

                resultsDis.textContent = result;
                storedOperation.push(result);
                if (op !== '=') {
                    storedOperation.push(op);
                }
            }
            displayStr = '';
        }
    }

    if (evt.target.classList[0] === 'deci-btn') {
        if (displayStr == '') {
            displayStr = '0.';
            resultsDis.textContent = displayStr;
        } else if (!displayStr.includes('.')){
            displayStr += evt.target.value;
            resultsDis.textContent = displayStr;
        }
    }

    if (evt.target.classList[0] === 'neg-btn') {
        if (displayStr == '') {
            displayStr = storedOperation[0].toString();
        }

        if (displayStr.slice(0, 1) !== '-') {
            displayStr = '-' + displayStr;
            resultsDis.textContent = displayStr;
        } else {
            displayStr = displayStr.slice(1);
            resultsDis.textContent = displayStr;
        }
    }
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