function add (a,b) {
	return +a + +b;
}

function subtract (a,b) {
	return +a - +b;
}

function multiply (a,b) {
	return +a * +b;
}

function divide (a,b) {
	return +a / +b;
}

let operate = (func, a, b) => {
    return func(a, b);
}

let operatorObj = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

let display = document.querySelector('input');
let displayArray=[];

let numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        displayArray.push(btn.textContent);
        display.setAttribute('value', `${displayArray.join('')}`);
    })
})

let operatorBtns = document.querySelectorAll('.operator-btn');
operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        displayArray.push(' ' + btn.textContent + ' ');
        display.setAttribute('value', `${displayArray.join('')}`);
    })
})

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    displayArray = [];
    display.setAttribute('value', `${displayArray.join('')}`);
})

let equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', () => {
    let evalArray = displayArray.join('').split(' ');
    //evaluate multiplication and division left to right
    for(let i=0; i<evalArray.length; i++){
        if (['*', '/'].includes(evalArray[i])){
            let operator = operatorObj[evalArray[i]];
            let ans = operate(operator, evalArray[i-1], evalArray[i+1])
            if (!isFinite(ans)){
                display.setAttribute('value', `Invalid request`);
                displayArray=[];
                return;
            }
            evalArray.splice(i-1, 3, ans);
            i = -1;
        }      
    }
    //evaluate addition and subtraction left to right
    for(let i=0; i<evalArray.length; i++){
        if (['+', '-'].includes(evalArray[i])){
            let operator = operatorObj[evalArray[i]];
            let ans = operate(operator, evalArray[i-1], evalArray[i+1])
            if (!isFinite(ans)){
                display.setAttribute('value', `Invalid request;`);
                displayArray=[];
                return;
            }
            evalArray.splice(i-1, 3, ans);
            i = -1;
        }      
    }
    display.setAttribute('value', `${evalArray[0]}`);
    displayArray=[];
})