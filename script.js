// script.js
document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("inputBox");
    const buttons = document.querySelectorAll(".button");

    let currentInput = "";
    let resultDisplayed = false;

    const updateInputBox = () => {
        inputBox.value = currentInput;
    };

    const calculateResult = () => {
        try {
            currentInput = eval(currentInput).toString();
        } catch (error) {
            currentInput = "Error";
        }
        updateInputBox();
        resultDisplayed = true;
    };

    const handleButtonPress = (key) => {
        if (key === "Ac") {
            currentInput = "";
        } else if (key === "DEL") {
            currentInput = currentInput.slice(0, -1);
        } else if (key === "=") {
            calculateResult();
            return;
        } else if (key === "√") {
            try {
                currentInput = Math.sqrt(eval(currentInput)).toString();
            } catch (error) {
                currentInput = "Error";
            }
            resultDisplayed = true;
        } else if (key === "^2") {
            try {
                currentInput = Math.pow(eval(currentInput), 2).toString();
            } catch (error) {
                currentInput = "Error";
            }
            resultDisplayed = true;
        } else {
            if (resultDisplayed && !isNaN(key)) {
                currentInput = key;
                resultDisplayed = false;
            } else {
                currentInput += key;
            }
        }
        updateInputBox();
    };

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.dataset.key;
            handleButtonPress(buttonText);
        });
    });

    document.addEventListener("keydown", (e) => {
        let key = e.key;
        if (key === "Enter") key = "=";
        if (key === "Backspace") key = "DEL";
        if (key === "Escape") key = "Ac";
        if (key === "r") key = "√";
        if (key === "s") key = "^2";
        if (/[0-9%\/*\-+().]/.test(key) || ["=", "DEL", "Ac", "√", "^2"].includes(key)) {
            handleButtonPress(key);
        }
    });

    updateInputBox();
});