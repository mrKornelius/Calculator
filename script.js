let y = '';
let operator = null;
let lastBtn = null;
isResult = false;

/*  TODO: Extra functions
 *      '.'(floating point), backspace, PI, x^y, floor/ceil?
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
const operate = (op, a, b) => (a === '') ? op(+b) : op(+a, +b);

const x = document.querySelector('input');
const eq = document.querySelector('.eq');
const ac = document.querySelector('.allclear');
const neg = document.querySelector('.neg');
const dot = document.querySelector('.dot');

const nums = Array.from(document.querySelectorAll('.num'));
const ops = Array.from(document.querySelectorAll('.operator'));

// Functions
const appendDisplay = (s) => x.value += s;
const setDisplay    = (s) => x.value = s;
const getDisplay    = ()  => x.value;
const resetDisplay  = ()  => x.value = '';

function numbers() {
    if (getDisplay() === '0' || isResult) { 
        resetDisplay(); 
        isResult = false;
    }
    if (getDisplay() === '-' && this.textContent === '0') return;
    appendDisplay(this.textContent);
    // console.log(this.textContent);
}

function negate(e) {
    if (getDisplay() === '0') { setDisplay('-'); } 
    else { return; }
}

function floatingNumber() {
    if (getDisplay().includes('.')) { return; }
    appendDisplay('.');
}

function opUnary(op) {
    let q = +getDisplay();
    isResult = true;
    switch (op.id) {
        case 'sqrt':      setDisplay(sqrt(q)); break;
        case 'pow2':      setDisplay(pow(q)); break;
        case 'sign':      setDisplay(sign(q)); break;
        case 'percent':   setDisplay(percent(q)); break;
        case 'factorial': setDisplay(factorial(q)); break;
        case 'inverse':   setDisplay(inv(q)); break;
        default: console.log(op.id); break;
    }
}


function opBinary(op) {
    switch (op.id) {
        case 'add':
            y = getDisplay();
            operator = add;
            break;

        default:
            break;
    }
}

function operators() {
    // console.log(this);
    if (this.classList.contains("unary")) {
        opUnary(this);
        return;
    }
  
    if (operator !== null) {
        equals()
        y = getDisplay();
    }
    opBinary(this);
}

function equals() {
    if (operator === null) { return; }
    // console.log(`op: ${operator.name}, y: ${y}, x: ${getDisplay()} = ${operate(operator, y, getDisplay())}`);
    setDisplay(operate(operator, y, getDisplay()));
    operator = null;
    isResult = true;
}

// Event Listeners
nums.forEach(btn => btn.addEventListener('click', numbers));
ops.forEach(btn => btn.addEventListener('click', operators));
eq.addEventListener('click', equals);
// ac.addEventListener('click', allClear);
neg.addEventListener('click', negate);
dot.addEventListener('click', floatingNumber)



































/*

// Functions
function maxDisplayLength(n) {
    if (n.length > 16) {
        // console.log('Too long: ' + n.length + ' ' + n);
        let e = (+n).toExponential();
        if (e.length > 16) {
            const [r,s] = e.split('e');
            return r.slice(0, 16 - s.length - 1) + 'e' + s;
        }
        return e;
    }
    return n;
}

function display(n) {
    x.value = maxDisplayLength(x.value + n);
}

function resetDisplay() {
    x.value = '';
}

function fact(n) {
    if (n <= 0) return 1;
    return n * fact(n-1);
}

function allClear() {
    resetDisplay();
    display('0');
    operator = null;
    y = '';
    lastBtnPressed(null);
    clearOperatorHighlight()
}

function lastBtnPressed(btn) {
    lastBtn = btn;
}

function equals() {
    if (operator === null) return;
    const q = operate(operator, y, +x.value);
    resetDisplay();
    display(q);
    operator = null;
    y = '';
    clearOperatorHighlight();
}

function clearOperatorHighlight() {
    ops.forEach(btn => btn.classList.remove('highlight'));
}

// TODO: bug ex '3' '+' '3' '=' then press a number ex '2' --> '62' but should be just '2'
function numbers() {
    if (x.value === '0' || lastBtn.includes('operator') ){//|| op === null) {
        resetDisplay();
    }
    if (this.id === 'neg' && x.value === '') {
        display('-');
    } else if (this.id === 'neg') {
        return;
    } else {
        display(this.textContent);
    }
    lastBtnPressed(this.classList.value);
}

function operators() {
    clearOperatorHighlight();

    if (!lastBtn.includes('operator')) {
        if (y === '') {
            y = +x.value;
        } else {
            equals();
            y = +x.value;
        }
    } else {
        // console.log('op-func: operator-pressed again.');
    }

    setOperator(this.id);
    lastBtnPressed(this.classList.value);

    if (this.classList.value.includes('unary'))
        equals();    
    else
        this.classList.add('highlight');
     
}

function setOperator(op) {
    switch (op) {
        case 'add': operator = add; break;
        case 'sub': operator = sub; break;
        case 'mul': operator = mul; break;
        case 'div': operator = div; break;

        case 'pow2': 
            operator = pow;
            // equals();
            break;
        case 'sqrt': 
            operator = sqrt;
            // equals();
            break;
        case 'sign': 
            operator = sign;
            // equals();
            break;
        case 'percent': 
            operator = percent;
            // equals();
            break;
        case 'factorial': 
            operator = factorial;
            // equals();
            break;
        case 'inverse': 
            operator = inv;
            // equals();
            break;
        
        default:
            console.log('Error on button: ' + op);
    }
}




*/