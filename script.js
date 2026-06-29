/*====================================
        NeoCalc JavaScript
    CodeAlpha Task 2
=====================================*/

const screen = document.getElementById("screen");

const buttons = document.querySelectorAll(".buttons button");

// Add button values to display
buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        switch (value) {

            case "C":
                clearScreen();
                break;

            case "=":
                calculate();
                break;

            case "⌫":
                deleteLast();
                break;

            case "%":
                percentage();
                break;

            default:

                // Ignore icon text from delete button
                if (button.classList.contains("delete")) {
                    deleteLast();
                } else {
                    appendValue(value);
                }

        }

    });

});

// ===============================
// Add Value
// ===============================

function appendValue(value) {

    if (screen.value === "Error") {

        screen.value = "";

    }

    screen.value += value;

}

// ===============================
// Clear Screen
// ===============================

function clearScreen() {

    screen.value = "";

}

// ===============================
// Delete Last Character
// ===============================

function deleteLast() {

    screen.value = screen.value.slice(0, -1);

}

// ===============================
// Percentage
// ===============================

function percentage() {

    if (screen.value !== "") {

        screen.value = eval(screen.value) / 100;

    }

}

// ===============================
// Calculate
// ===============================

function calculate() {

    try {

        if (screen.value === "") return;

        let result = eval(screen.value);

        if (!isFinite(result)) {

            screen.value = "Error";

        } else {

            screen.value = result;

        }

    }

    catch {

        screen.value = "Error";

    }

}

// ===============================
// Keyboard Support
// ===============================

document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers

    if (!isNaN(key)) {

        appendValue(key);

    }

    // Operators

    if (["+", "-", "*", "/", "."].includes(key)) {

        appendValue(key);

    }

    // Enter

    if (key === "Enter") {

        e.preventDefault();

        calculate();

    }

    // Backspace

    if (key === "Backspace") {

        deleteLast();

    }

    // Escape

    if (key === "Escape") {

        clearScreen();

    }

    // Percentage

    if (key === "%") {

        percentage();

    }

});

// ===============================
// Prevent Multiple Operators
// ===============================

screen.addEventListener("input", () => {

    screen.value = screen.value.replace(/[^0-9+\-*/%.]/g, "");

});

console.log("NeoCalc Loaded Successfully");