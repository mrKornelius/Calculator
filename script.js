let y = '';
let op = null;
let lastPressedBtn = null;

/*  TODO: Extra functions
 *      1/x, '.'(floating point), backspace, PI, x^y, x!( max 18!), floor/ceil?, overflow
 *      light theme, keyboard support
 */

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => {
    if (b === 0) return NaN;
    return a / b
};
const inv = a => div(1, a); 
const pow = a => a * a;
const sqrt = a => Math.sqrt(a);
const sign = a => -a;
const factorial = a => fact(a);
const percent = a => a / 100;
const operate = (op, a, b) => op(a,b);

const x = document.querySelector('input');
const eq = document.querySelector('.eq');
const ac = document.querySelector('.allclear');
const neg = document.querySelector('.neg');

const nums = Array.from(document.querySelectorAll('.num'));
const ops = Array.from(document.querySelectorAll('.operator'));

// Functions
function equals() {
    if (op === null) return;
    x.value = operate(op,y,+x.value);
    op = null;
    y = '';
    clearOperatorHighlight()
}

function fact(n) {
    if (n <= 0) return 1;
    return n * fact(n-1);
}

function allClear() {
    x.value = '0';
    op = null;
    y = '';
    lastPressedBtn = null;
    clearOperatorHighlight()
}

function clearOperatorHighlight() {
    ops.forEach(btn => btn.classList.remove('highlight'));
}

// TODO: bug ex '3' '+' '3' '=' then press a number ex '2' --> '62' but should be just '2'
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
    clearOperatorHighlight();

    if (!lastPressedBtn.includes('operator')) {
        if (y === '') {
            y = +x.value;
        } else {
            x.value = operate(op, y, +x.value);
            y = +x.value;
        }
    }

    // switch on id instead??
    switch (this.textContent) {
        case '+':    op = add; break;
        case '-':    op = sub; break;
        case '×':    op = mul; break;
        case '÷':    op = div; break;
        case 'x²':   op = pow; 
                     equals(); 
                     break;
        case '√':    op = sqrt;
                     equals();    
                     break;
        case '±':    op = sign;
                     equals();    
                     break;
        case '%':    op = percent;
                     equals();    
                     break; 
        case 'x!':   op = factorial;
                     equals();    
                     break;
        case 'inv':  op = inv;
                     equals();    
                     break;
        default: 
            console.log('Error on button: ' + this.textContent);
    }

    lastPressedBtn = this.classList.value;
    if (!this.classList.value.includes('unary'))
        this.classList.add('highlight');
}

// Event Listeners
nums.forEach(btn => btn.addEventListener('click', numbers));
ops.forEach(btn => btn.addEventListener('click', operators));
eq.addEventListener('click', equals);
ac.addEventListener('click', allClear);
neg.addEventListener('click', numbers);
