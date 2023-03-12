const container = document.querySelector('.container');
const input = document.createElement('input');
input.classList = 'input';
input.setAttribute('placeholder', 'Type a command...');

window.addEventListener("load", function() {
    printOutput(commandList['hello']);
});

input.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        let keyValues = []
        for (const [key, value] of Object.entries(commandList)) {
            if (key.substring(0, input.value.length) == input.value) {
                keyValues.push(key);
            } 
        }
        if (keyValues.length == 1) {
            input.value = keyValues[0];
        } else {
            const options = document.createElement('p');
            options.classList.add('options');
            for (value in keyValues) {
                options.innerHTML += keyValues[value] + ' '
            }
            container.insertBefore(options, input);
        }
    }
});

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && input.value != '') {
        e.stopPropagation();
        e.preventDefault();
        if (input.value == 'clear') {
            clearScreen();
        } else if (input.value in commandList) {
            printOutput(commandList[this.value]);
        } else {
            printOutput('Command not found');
        }
    }
});

let inputColor = document.querySelector('.input-color');
let slider = document.querySelector('.slider');
function printOutput(content) {
    const oldInput = document.createElement('p');
    oldInput.textContent = input.value;
    oldInput.style.color = inputColor.value;
    oldInput.classList.add('old-input');
    container.appendChild(oldInput);
    input.classList.add('enter-pressed');
    const output = document.createElement('p');
    container.appendChild(output);
    let i = 0;
    let printChar = true;
    const print = setInterval(function () {
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                output.innerHTML = content;
                clearInterval(print);
                resetInput();
            }
        });
        if (content[i] == '<') {
            printChar = false;
        } else if (content[i] == '>') {
            printChar = true;
        }
        if (printChar) {
            output.innerHTML = content.substring(0, i);
        }
        i++;
        if (content.length == i - 1) {
            clearInterval(print);
            resetInput();
        }
    }, slider.valueAsNumber);
};

function resetInput() {
    container.appendChild(input);
    input.value = '';
    input.classList.remove('enter-pressed');
    input.focus();
};

function clearScreen() {
    container.innerHTML = '';
    resetInput();
}


//          ----------  MENU OPTION VISIBILITY  ------------

let menuTitle = document.querySelectorAll('.item-title');
menuTitle.forEach(element => {
    element.addEventListener('click', expandMenu);
});
function expandMenu () {
    let menu = this.parentNode.childNodes[3];
    menu.classList.toggle('item-content-visible');
}


//                 ---------  SLIDER  --------------

let sliderOutput = document.querySelector('.slider-output');
sliderOutput.textContent = slider.value + 'ms';
slider.oninput = function() {
    sliderOutput.textContent = slider.value + 'ms';
}


//          ---------- COLOR PICKER -----------------

inputColor.oninput = function() {
    let oldInput = document.querySelectorAll('.old-input');
    console.log(oldInput);
    input.style.color = inputColor.value;
    if (oldInput != null){
        oldInput.forEach(element => {
            element.style.color = inputColor.value;
        });
    }
}
let outputColor = document.querySelector('.output-color');
outputColor.oninput = function() {
    container.style.color = outputColor.value;
}
let screenColor = document.querySelector('.screen-color');
screenColor.oninput = function() {
    container.style.backgroundColor = screenColor.value;
    input.style.backgroundColor = screenColor.value;
}


//         ----------- MOBILE MENU -------------

let menuOpen = false;
let menuButton = document.querySelector('button');
let menu = document.querySelector('.menu');
let title = document.querySelector('h1');
menuButton.addEventListener('click', openMenu);
function openMenu() {
    let menuParent = menu.parentNode;
    menuParent.removeChild(menu);
    this.parentNode.parentNode.insertBefore(menu, menuButton.parentNode);
    menu.classList.toggle('menu-visible');
    if (!menuOpen) {
        title.textContent = '';
        menuButton.textContent = 'Close';
    } else {
        title.textContent = 'Command line bio';
        menuButton.textContent = 'Menu';
    }
    menuOpen = !menuOpen;
}