const passOutput = document.querySelector("#passOutput");
const copyBtn = document.querySelector("#copyBtn");
const copyMsg = document.querySelector("#copyMsg");
const passwordLenNumber = document.querySelector("#passwordLenNumber");
const lenSlider = document.querySelector("#lenSlider");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const indicator = document.querySelector("#strengthIndicator");
const generateBtn = document.querySelector("#generateBtn");
const symbols = "~!@#$%^&*()[]{};./<>?"

var passLen = lenSlider.value;
function handleSlider() {
    passLen = lenSlider.value;
    passwordLenNumber.textContent = passLen;
}

let checkCount;
function checkboxCount() {
    checkCount = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });

    if (passLen < checkCount) {
        lenSlider.value = checkCount;
        handleSlider();
    }
}

function calcStrength() {
    if (uppercase.checked && lowercase.checked && number.checked && symbol.checked && passLen >= 10) {
        indicator.style.background = "green";
        indicator.style.boxShadow = "1px 1px 20px green";
    }
    else if (uppercase.checked && lowercase.checked && (number.checked || symbol.checked) && passLen >= 6) {
        indicator.style.background = "yellow";
        indicator.style.boxShadow = "1px 1px 20px yellow";
    }
    else {
        indicator.style.background = "red";
        indicator.style.boxShadow = "1px 1px 20px red";
    }
}
calcStrength();


async function copyPassword() {
    if (passOutput.value) {
        try {
            await navigator.clipboard.writeText(passOutput.value);
            copyMsg.textContent = "Copied";
        }
        catch {
            copyMsg.textContent = "Error";
        }
        setTimeout(function () {
            copyMsg.textContent = "";
        }, 1300);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber() {
    return getRandomInt(0, 9);
}

function getUpperCase() {
    return String.fromCharCode(getRandomInt(65, 91));
}

function getLowerCase() {
    return String.fromCharCode(getRandomInt(97, 123));
}

function getSymbol() {
    let num = getRandomInt(0, symbols.length);
    return symbols.charAt(num);
}

function generatePassword() {
    if (checkCount <= 0) passOutput.value = "";

    let password = "";

    let funcArr = [];

    if (uppercase.checked) {
        funcArr.push(getUpperCase);
    }
    if (lowercase.checked) {
        funcArr.push(getLowerCase);
    }
    if (number.checked) {
        funcArr.push(getRandomNumber);
    }
    if (symbol.checked) {
        funcArr.push(getSymbol);
    }

    //compulsory addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    //remaining addition
    for (let i = 0; i < (passLen - funcArr.length); i++) {
        let randomIndex = getRandomInt(0, funcArr.length);
        password += funcArr[randomIndex]();
    }

    //shuffle the password
    let points = Array.from(password);
    for (let i = points.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = points[i];
        points[i] = points[j];
        points[j] = k;
    }
    password = "";
    points.forEach((element) => { password += element });

    //add the password to input
    passOutput.value = password;
}
