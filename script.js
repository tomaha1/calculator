let keysList = document.querySelectorAll(".num,.func,.operation");
let display = document.querySelector(".calcDisplay");
display.innerText = 0;
let previousNumber = 0;
let operation = 0;
let result = 0;
let next = 0;
let displaySliced = 0;
let displayNotSliced = 0;
//changeLight();
detectKey();

window.addEventListener('keydown', (e) => {
    if ((e.shiftKey) && (e.code === "Digit5")) {
        operate("percent");
    } else if ((e.shiftKey) && (e.code === "Equal")) {
        operate("addition");
    } else if ((e.shiftKey) && (e.code === "Digit8")) {
        operate("multiplication");
    } else {
        operate(e.code);
    }
});

/*function changeLight() {
keysList.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.width = '108px';
        item.style.border = 'solid 1px yellow';
    })
    item.addEventListener('mouseleave', () => {
        item.style.width = '110px';
        item.style.border = "none";
    })
})};*/

function detectKey() {
    keysList.forEach(item => {
        item.addEventListener('click', () => {
            operate(item.id);
        })
    })
};

function operate(x) {
    if (display.innerText === "0") {
        display.innerText = "";
    }
    switch (x) {
        case "AC":
        case "Escape":
            display.innerText = 0;
            previousNumber = 0;
            break;
        case "plus_minus":
            if ((display.innerText.length < 9) || ((display.innerText.length >= 9) && (display.innerText.includes("-") && (displayNotSliced === 0)))) {
                display.innerText = -1 * display.innerText;
            } else if ((display.innerText.length >= 9) && (displayNotSliced != 0)) {
                display.innerText = displayNotSliced;
                displayNotSliced = 0;
            } else if (display.innerText.length >= 9) {
                displayNotSliced = display.innerText;
                displaySliced = display.innerText.substring(0, 8);
                display.innerText = -1 * displaySliced;
            };
            break;
        case "percent":
            display.innerText = display.innerText / 100;
            break;
        case "zero":
        case "Digit0":
        case "Numpad0":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "0";
            }
            next = 0;
            break;
        case "one":
        case "Digit1":
        case "Numpad1":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "1";
            }
            next = 0;
            break;
        case "two":
        case "Digit2":
        case "Numpad2":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "2";
            }
            next = 0;
            break;
        case "three":
        case "Digit3":
        case "Numpad3":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "3";
            }
            next = 0;
            break;
        case "four":
        case "Digit4":
        case "Numpad4":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "4";
            }
            next = 0;
            break;
        case "five":
        case "Digit5":
        case "Numpad5":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "5";
            }
            next = 0;
            break;
        case "six":
        case "Digit6":
        case "Numpad6":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "6";
            }
            next = 0;
            break;
        case "seven":
        case "Digit7":
        case "Numpad7":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "7";
            }
            next = 0;
            break;
        case "eight":
        case "Digit8":
        case "Numpad8":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "8";
            }
            next = 0;
            break;
        case "nine":
        case "Digit9":
        case "Numpad9":
            if (next === 1) {
                display.innerText = "";
            }
            if (display.innerText.length <= 8) {
            display.innerText += "9";
            }
            next = 0;
            break;
        case "dot":
        case "Period":
        case "NumpadDecimal":
            if ((display.innerText.length <= 8) && (display.innerText.includes(".") === false)) {
            display.innerText = 0;
            display.innerText += ".";
            }
            break;
        case "addition":
        case "NumpadAdd":
            if (operation != 0) {
                calculating(previousNumber, operation, display.innerText);
            }
            previousNumber = display.innerText;
            operation = 1;
            next = 1;
            break;
        case "subtraction":
        case "Minus":
        case "NumpadSubtract":
            if (operation != 0) {
                calculating(previousNumber, operation, display.innerText);
            }
            previousNumber = display.innerText;
            operation = 2;
            next = 1;
            break;
        case "multiplication":
        case "NumpadMultiply":
            if (operation != 0) {
                calculating(previousNumber, operation, display.innerText);
            }
            previousNumber = display.innerText;
            operation = 3;
            next = 1;
            break;
        case "division":
        case "Slash":
        case "NumpadDivide":
            if (operation != 0) {
                calculating(previousNumber, operation, display.innerText);
            }
            previousNumber = display.innerText;
            operation = 4;
            next = 1;
            break;
        case "equal":
        case "Enter":
        case "Equal":
        case "NumpadEnter":
            calculating(previousNumber, operation, display.innerText);
            break;
        case "Backspace":
            if (display.innerText.length > 1) {
            display.innerText = display.innerText.substring(0, display.innerText.length - 1);
            } else if (display.innerText.length === 1) {
                display.innerText = "0";
            }
            break;
    }
};

function calculating(x, y, z) {
    x = Number(x);
    z = Number(z);
    if ((y===4) && (z===0)) {
        display.innerText = "DIV BY 0!";
    } else {
    switch (y) {
        case 1:
            console.log(x);
            console.log(z);
            let resultAdd = (((x*10) + (z*10))/10);
            console.log(resultAdd);
            stringTreatment(resultAdd);
            break;
        case 2:
            let resultSub = (((x*10) - (z*10))/10);
            stringTreatment(resultSub);
            break;
        case 3:
            let resultMul = (((x*10) * (z*10))/100);
            stringTreatment(resultMul);
            break;
        case 4:
            let resultDiv = (x*10) / (z*10);
            stringTreatment(resultDiv);
            break;
    }
    operation = 0;
}
};

function stringTreatment(x) {
    console.log(x);
    console.log(x.toString(10));
    if ((x.toString(10).length > 9) && (x.toString(10).length <= 10) && (x >= 1)) {
        x = x.toExponential(4);
        console.log(1);
    } else if ((x.toString(10).length > 10) && (x >= 1)) {
        x = x.toExponential(3);
        console.log(2);
    } else if ((x.toString(10).length > 9) && (x.toString(10).length <= 10) && (x >= 1)) {
        x = x.toExponential(5);
        console.log(3);
    } else if ((x.toString(10).length > 10) && (x < 1) && (x > 0)) {
        x = x.toExponential(4);
        console.log(4);
    } else if ((x.toString(10).length > 9) && (x.toString(10).length <= 10) && (x <= -1)) {
            x = x.toExponential(3);
            console.log(1);
    } else if ((x.toString(10).length > 10) && (x >= 1)) {
            x = x.toExponential(2);
            console.log(2);
    } else if ((x.toString(10).length > 9) && (x.toString(10).length <= 10) && (x <= -1)) {
            x = x.toExponential(4);
            console.log(3);
    } else if ((x.toString(10).length > 10) && (x > -1) && (x < 0)) {
            x = x.toExponential(3);
            console.log(4);
    } else if (x.toString(10).length <= 9) {
        x.toString(10);
       console.log(5);
    }
    display.innerText = x;
};
