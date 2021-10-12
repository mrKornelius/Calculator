
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;

    const operate = (op, a, b) => op(a,b);


    const x = document.querySelector('input');
    const eq = document.querySelector('.eq');
    const pl = document.querySelector('.add');
    const mi = document.querySelector('.sub');
    const mu = document.querySelector('.mul');
    const di = document.querySelector('.div');
    
    let y = '';
    let op;

    pl.addEventListener('click', e => {
        if (y === '') {
            y = +x.value;
            x.value = '';
            op = add;
        } else {
            x.value = operate(op, y, +x.value);
            y = +x.value;
            op = add;
        }
    });
    mi.addEventListener('click', e => {
        if (y === '') {
            y = +x.value;
            x.value = '';
            op = sub;
        } else {
            x.value = operate(op, y, +x.value);
            y = +x.value;
            op = sub;
        }
    });
    mu.addEventListener('click', e => {
        if (y === '') {
            y = +x.value;
            x.value = '';
            op = mul;
        } else {
            x.value = operate(op, y, +x.value);
            y = +x.value;
            op = mul;
        }
    });
    di.addEventListener('click', e => {
        if (y === '') {
            y = +x.value;
            x.value = '';
            op = div;
        } else {
            x.value = operate(op, y, +x.value);
            y = +x.value;
            op = div;
        }
    });

    eq.addEventListener('click', e => {
        x.value = operate(op,y,+x.value);
        y = '';
    });