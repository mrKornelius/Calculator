let y = '';
let op = null;
let lastPressedBtn = null;
/*  Extra functions
 *      1/x, (-), '.', memo, clear, 
 */

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => {
    if (b === 0) return NaN;
    return a / b
};
const pow = a => a * a;
const sqrt = a => Math.sqrt(a);
const sign = a => -a;
const percent = a => a / 100;

const operate = (op, a, b) => op(a,b);


const x = document.querySelector('input');
const eq = document.querySelector('.eq');
const pl = document.querySelector('.add');
const mi = document.querySelector('.sub');
const mu = document.querySelector('.mul');
const di = document.querySelector('.div');

x.value = '0';

const nums = Array.from(document.querySelectorAll('.num'));
nums.forEach(btn => btn.addEventListener('click', () => {
    if (x.value === '0' || lastPressedBtn.includes('operator') || op === null) {
        x.value = '';
    }
    x.value += btn.textContent;
    lastPressedBtn = btn.classList.value;
}));

const operators = Array.from(document.querySelectorAll('.operator'));
operators.forEach(btn => btn.addEventListener('click', () => {
    // console.log(btn.textContent);

    if (y === '') {
        y = +x.value;
    } else {
        x.value = operate(op, y, +x.value);
        y = +x.value;
    }

    switch (btn.textContent) {
        case '+':    op = add; break;
        case '-':    op = sub; break;
        case 'x':    op = mul; break;
        case '/':    op = div; break;
        case '^2':   op = pow; 
                     equals(); 
                     break;
        case 'sqrt': op = sqrt;
                     equals();    
                     break;
        case '±':    op = sign;
                     equals();    
                     break;
        case '%':    op = percent;
                     equals();    
                     break;
        default: 
            console.log('Error button: ' + btn.textContent);
    }
        
    lastPressedBtn = btn.classList.value;
}));

function equals() {
    if (op === null) return;
    x.value = operate(op,y,+x.value);
    op = null;
    y = '';
}
eq.addEventListener('click', equals);

