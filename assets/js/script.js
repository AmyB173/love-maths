document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    runGame("add");
});
/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed.
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random()*25)+1;
    let num2 = Math.floor(Math.random()*25)+1;
    let num3 = Math.floor(Math.random()*12)+1;
    let num4 = Math.floor(Math.random()*12)+1;

    if (gameType === "add") {
        displayAddQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(Math.max(num1, num2), Math.min(num1, num2));
    } else if (gameType === "multiply") { 
        displayMultiplyQuestion(num3, num4);
    } else if (gameType === "divide") {
        displayDivideQuestion(num3*num4, num4)
    } else {
        alert(`Unknown game type, ${gameType}`);
        throw `Unknown ${gameType}. Aborting!`;
    }
}
/**
 * Checks the answers of the first element in the 
 * calculateCorrectAnswer array
 */
function checkAnswer(){
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    if (isCorrect) {
        alert("Hey! You got it right! :D")
        incrementScore();
    } else {
        alert(`Awww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}.`)
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}

/**
 * Get the operands and the operator 
 * directly from the DOM and returns the correct answer
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return[operand1 + operand2, "add"];
    } else if (operator === "-") {
        return[operand1 - operand2, "subtract"];
    } else if (operator === "x") {
        return[operand1 * operand2, "multiply"]
    } else if (operator === "÷") {
        return [operand1 / operand2, "divide"]
    } 
    {
        alert(`Unimplemented ${operator}`);
        throw `Unimplemented ${operator}. Aborting!`;
    }
}

/**
 * Increments the score after getting a correct answer
 */
function incrementScore() {
    let currentScore = parseInt(document.getElementById("score").innerText);
    currentScore ++;
    document.getElementById("score").innerText = currentScore;
}

/**
 * Increments the incorrect answers after getting a wrong answer
 */
function incrementWrongAnswer() {
    let currentIncorrect = parseInt(document.getElementById("incorrect").innerText);
    currentIncorrect ++;
    document.getElementById("incorrect").innerText = currentIncorrect;
}

/**
 * Displays addition question
 */
function displayAddQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

/**
 * Displays subtraction question
 */
function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

/**
 * Displays multiplication question
 */
function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

/**
 * Displays division question
 */
function displayDivideQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "÷";
}