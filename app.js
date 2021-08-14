
const MAX_ROUND = 6;

let displayStr = '';
let storedOperation = [];


const opDis = document.querySelector('#operations_display');
const resultsDis = document.querySelector('#results_display');
const buttonPad = document.querySelector('#button_pad');

buttonPad.addEventListener('click', insertValue, true);

function insertValue(evt) {
    const storedLength = storedOperation.length;
    switch (evt.target.classList[0]) {
        case 'num-btn':
            addNumber(evt.target.value, storedLength);
            break;
        case 'op-btn':
            prepareOperation(evt.target.value, storedLength);
            break;
        case 'delete-btn':
            deleteValues();
            break;
        case 'clear-btn':
            clearValues();
            break;
        case 'deci-btn':
            addDecimal();
            break;
        case 'neg-btn':
            negateOperation(storedLength);
            break;
    }
}


function addNumber(newNum, storedLength) {
    if (displayStr === '0') {
        displayStr = newNum;
        resultsDis.textContent = displayStr;
    } else {
        displayStr += newNum;
        resultsDis.textContent = displayStr;
    }
    if (storedLength == 1) {
        storedOperation.pop();
    }
}

function prepareOperation(op, storedLength) {
    if (op !== '=') {
        if (storedLength == 0) {
            storedOperation.push(Number(displayStr));
            storedOperation.push(op);
            displayStr = '';
        } else if (storedLength == 1) {
            storedOperation.push(op);
            displayStr = '';
        } else if (storedLength == 2 && displayStr == '') {
            storedOperation[1] = op;
        }
    }
    if (storedLength == 2 && displayStr != '') {
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


function clearValues() {
    if (displayStr == '') {
        resultsDis.textContent = '';
        opDis.textContent = '';
        storedOperation = [];
    } else {
        resultsDis.textContent = '0';
        displayStr = '';
    }
}

function deleteValues() {
    if (displayStr == '') {
        resultsDis.textContent = '';
        opDis.textContent = '';
        storedOperation = [];
    } else {
        displayStr = displayStr.slice(0, -1);
        resultsDis.textContent = displayStr;
    }
}


function addDecimal() {
    if (displayStr == '') {
        displayStr = '0.';
        resultsDis.textContent = displayStr;
    } else if (!displayStr.includes('.')){
        displayStr += '.';
        resultsDis.textContent = displayStr;
    }
}

function negateOperation(storedLength) {
    const isNegatingStored = (displayStr == '' && storedLength == 1);
    if (isNegatingStored) {
        displayStr = storedOperation[0].toString();
    }

    if (displayStr.slice(0, 1) !== '-') {
        displayStr = '-' + displayStr;
        resultsDis.textContent = displayStr;
    } else {
        displayStr = displayStr.slice(1);
        resultsDis.textContent = displayStr;
    }

    if (isNegatingStored) {
        storedOperation[0] = Number(displayStr);
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