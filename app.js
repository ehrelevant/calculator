

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
        case '*':
            return multiply(first, second);
        case '/':
            return divide(first, second);
    }
}


const opDis = document.querySelector('#operations_display');
const resultsDis = document.querySelector('#results_display');
const buttonPad = document.querySelector('#button_pad');
buttonPad.addEventListener('click', insertValue, true);

function insertValue(evt) {
    if (evt.target.classList[0] === 'num-btn') {
        console.log(evt.target.value);
        resultsDis.textContent += evt.target.value;
    }
}