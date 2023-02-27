let container = document.querySelector('.container');
let gridWidth = document.getElementById('width-range');
let gridHeight = document.getElementById('height-range');
let gridButton = document.getElementById('submit-grid');
let clearGridButton = document.getElementById('clear-grid');
let coloriIput = document.getElementById('color-input');
let eraseButton = document.getElementById('erase-button');
let paintButton = document.getElementById('paint-button');
let heightValue = document.getElementById('height-value');
let widthValue = document.getElementById('width-value');

const events = {
    mouse: {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup',
    },
    touch: {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend',
    },
};

let deviceType = '';

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    } catch (e) {
        deviceType = 'mouse';
        return false;
    }
};

isTouchDevice();

const buttonActive = () => {
    paintButton.classList.remove('active');
    eraseButton.classList.remove('active');
    if (erase) {
        paintButton.classList.add('active');
    } else {
        eraseButton.classList.add('active');
    }
};

buttonActive();

gridButton.addEventListener('click', () => {
    container.innerHTML = '';
    let count = 0;

    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement('div');
        div.classList.add('grid__row');

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement('div');
            col.classList.add('grid__column');
            col.setAttribute('id', `grid__column${count}`);

            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = 'transparent';
                } else {
                    col.style.backgroundColor = coloriIput.value;
                }
            });

            col.addEventListener(events[deviceType].move, (event) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? event.clientX : event.touches[0].clientX,
                    !isTouchDevice() ? event.clientY : event.touches[0].clientY
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll('.grid__column');

    gridColumns.forEach((element) => {
        if (elementId === element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = coloriIput.value;
            } else if (draw && erase) {
                element.style.backgroundColor = 'transparent';
            }
        }
    });
}

clearGridButton.addEventListener('click', () => {
    container.innerHTML = '';
});

eraseButton.addEventListener('click', () => {
    erase = true;
    buttonActive();
});

paintButton.addEventListener('click', () => {
    erase = false;
    buttonActive();
});

gridWidth.addEventListener('input', () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener('input', () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridWidth.value = 0;
    gridHeight.value = 0;
};
