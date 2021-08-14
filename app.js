
const MAX_ROUND = 6;
const DIVIDE_BY_0_MESSAGE = 'ERROR! Cannot Divide by 0.'

let displayStr = '';
let storedOperation = [];

// The use of this "lastSavedEquation" global variable may be a naive implementation;
// however, given given the structure of my code, I couldn't think of a better method of
// Pasing the last equation to the variable.
let lastSavedEquation = '';

const opDis = document.querySelector('#operations_display');
const resultsDis = document.querySelector('#results_display');
const buttonPad = document.querySelector('#button_pad');


buttonPad.addEventListener('click', (e) => {
    insertValue(e.target.classList[0], e.target.value);
}, true);


function insertValue(buttonClass, buttonValue) {
    const storedLength = storedOperation.length;
    switch (buttonClass) {
        case 'num-btn':
            addNumber(buttonValue, storedLength);
            break;
        case 'op-btn':
            prepareOperation(buttonValue, storedLength);
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

    const newStoredLength = storedOperation.length;
    updateOperationsDisplay(newStoredLength);
}


document.addEventListener('keydown', passKeyPress);

function passKeyPress(e) {
    let key = e.key;

    if (key == 'Shift') {
        // Skip shift because it causes issues in the code
        return;
    }

    if (/[0-9]/.test(key)) {
        insertValue('num-btn', key);

    } else if (/[+\-*/=(Enter)]/.test(key)) {
        if (key === 'Enter') key = '=';
        if (key === '*') key = '×';
        insertValue('op-btn', key);

    } else if (key === 'Backspace' || key === 'd') {
        insertValue('delete-btn', key);

    } else if (key === 'Escape' || key === 'c') {
        insertValue('clear-btn', key);

    } else if (key === '.') {
        insertValue('deci-btn', key);

    } else if (key === '~' || key === 'n') {
        insertValue('neg-btn', key);

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
    } else if (storedLength == 2) {

        lastSavedEquation = `${storedOperation[0]} ${storedOperation[1]}`
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

        lastSavedEquation = `${storedOperation[0]} ${storedOperation[1]}`
    }
    if (storedLength == 2 && displayStr != '') {
        const savedOp = storedOperation.pop();
        const a = storedOperation.pop();
        const b = Number(displayStr);

        if (savedOp === '/' && b === 0) {
            resultsDis.textContent = DIVIDE_BY_0_MESSAGE;
        } else {
            const result = Math.round(operate(savedOp, a, b) * (10 ** MAX_ROUND)) / (10 ** MAX_ROUND);

            resultsDis.textContent = result;
            storedOperation.push(result);
            if (op !== '=') {
                storedOperation.push(op);
            }
        }

        lastSavedEquation = `${a} ${savedOp} ${b} =`
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




function updateOperationsDisplay(storedLength) {
    if (storedLength == 0) {
        opDis.textContent = '';
        lastSavedEquation = '';
    } else {
        opDis.textContent = lastSavedEquation;
    }
}