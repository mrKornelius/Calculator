let y = '';
let op = null;
let lastPressedBtn = null;
/*  Extra functions
 *      1/x, '.', backspace, PI, x^y, x!, floor/ceil?
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
const ac = document.querySelector('.allclear');
const neg = document.querySelector('.neg');


const nums = Array.from(document.querySelectorAll('.num'));
const ops = Array.from(document.querySelectorAll('.operator'));

x.value = '0';

// Functions
function equals() {
    if (op === null) return;
    x.value = operate(op,y,+x.value);
    op = null;
    y = '';
}

function allClear() {
    x.value = '0';
    op = null;
    y = '';
    lastPressedBtn = null;
}

function numbers() {
    if (x.value === '0' || lastPressedBtn.includes('operator') ){//|| op === null) {
        x.value = '';
    }
    if (this.textContent === '(-)' && x.value === '') {
        x.value = '-';
    } else if (this.textContent === '(-)') {
        return;
    } else {
        x.value += this.textContent;
    }
    lastPressedBtn = this.classList.value;
}

function operators() {
    // console.log(btn.textContent);

    if (y === '') {
        y = +x.value;
    } else {
        x.value = operate(op, y, +x.value);
        y = +x.value;
    }

    switch (this.textContent) {
        case '+':    op = add; break;
        case '-':    op = sub; break;
        case '×':    op = mul; break;
        case '÷':    op = div; break;
        case 'x²':   op = pow; 
                     equals(); 
                     break;
        case '√': op = sqrt;
                     equals();    
                     break;
        case '±':    op = sign;
                     equals();    
                     break;
        case '%':    op = percent;
                     equals();    
                     break;
        default: 
            console.log('Error button: ' + this.textContent);
    }

    lastPressedBtn = this.classList.value;
}

// Event Listeners
nums.forEach(btn => btn.addEventListener('click', numbers));
ops.forEach(btn => btn.addEventListener('click', operators));
eq.addEventListener('click', equals);
ac.addEventListener('click', allClear);

neg.addEventListener('click', numbers);
