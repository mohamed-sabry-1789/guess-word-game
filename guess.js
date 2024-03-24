//setting name game 
let nameGame = "guess The Word";
document.title = nameGame;
document.querySelector("h1").innerHTML = nameGame;
document.querySelector("footer").innerHTML = `${nameGame} Game created by Mohamed Sabry`

// setting Game options

const numbersOfTries = 6;
let currentTry = 1;
let numberOfHint = 2;
// mange words 

let words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
let wordGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let massageArea = document.querySelector(".massage")

function addUpperCaseAndFoucinInput(input) {
    input.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
        if (input.nextElementSibling) {
            input.nextElementSibling.focus();
        }
    })
}
function addarrwInput(input) {
    input.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();
            }

        }

        if (event.key === "ArrowLeft") {
            if (input.previousElementSibling) {
                input.previousElementSibling.focus();
            }

        }
    })
}
function deleteLetterinInput(input) {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {

            if (input.previousElementSibling) {
                input.value = ""
                input.previousElementSibling.value = ""
                input.previousElementSibling.focus();
            }

        }
    })
}
function genrateInput() {
    const inputsContainer = document.querySelector(".inputs")
    //creat main tryDiv or parent div
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div")
        tryDiv.classList.add(`try-${i}`)
        // tryDiv.innerHTML = `<span>Try ${i} </span>`
        // OR
        const span = document.createElement("span")
        span.innerHTML = `Try ${i}`
        tryDiv.append(span)



        //creat inputs
        for (let j = 1; j <= wordGuess.length; j++) {
            const input = document.createElement("input")
            input.type = "Text";
            input.id = `guess-${i}-input-${j}`
            input.setAttribute("maxLength", "1")
            tryDiv.appendChild(input)

            if (i !== 1) {
                tryDiv.classList.add("disabled-inputs")

                input.disabled = true
            }
            addUpperCaseAndFoucinInput(input)
            addarrwInput(input)
            deleteLetterinInput(input)
        }

        inputsContainer.appendChild(tryDiv)

    }
    inputsContainer.children[0].children[1].focus();
}
const checkButton = document.querySelector(".check")


// console.log(wordGuess)
function guessCheck() {

    let successguess = true;
    for (let i = 1; i <= wordGuess.length; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-input-${i}`)

        const Letter = inputField.value.toLowerCase();

        const atctualLetter = wordGuess[i - 1]

        if (Letter === atctualLetter) {
            //letter is correct and in place
            inputField.classList.add("yes-in-place")
            //letter is correct and not in place
        } else if (wordGuess.includes(Letter) && Letter !== "") {
            inputField.classList.add("not-in-place")
            successguess = false;
            //if you miss write letter 
        } else if (Letter === "") {
            inputField.setAttribute("placeholder", "miss")
            inputField.style.backgroundColor = "red"
            successguess = false;
        }
        // letter is wrong
        else {
            inputField.classList.add("no")
            successguess = false;
        }
    }
    //check if user win or lose
    if (successguess) {
        let span = document.createElement("span")
        let text = document.createTextNode(`${wordGuess}`)
        let text2 = document.createTextNode("you win  the word is")
        span.append(text)
        massageArea.append(text2, span)

        //////add disabled class on ALL try Divs 
        let allTries = document.querySelectorAll(".inputs > div")
        // OR hi
        allTries.forEach((tryDiv) => {
            tryDiv.classList.add("disabled-inputs")
        })
        // disabled check button and hint button
        checkButton.disabled = true;
        hintButton.disabled = true;

    } else {
        // disabled curentTry 
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs")
        // disabled curentTry input
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} > input`)
        currentTryInputs.forEach((input => {
            input.disabled = true;
        }))

        currentTry++;

        const el = document.querySelector(`.try-${currentTry}`)
        if (el) {
            // Undisabled next curentTry 
            el.classList.remove("disabled-inputs")
            // Undisabled  next curentTry  input
            const nextTryInputs = document.querySelectorAll(`.try-${currentTry} > input`)

            nextTryInputs.forEach((input) => {
                input.disabled = false;
            })
            el.children[1].focus();
        } else {
            massageArea.classList.add("gameOver")
            const span = document.createElement("span")
            const text = document.createTextNode(`${wordGuess}`)
            span.appendChild(text)
            const text2 = document.createTextNode(`game over the word is`)
            massageArea.append(text2, span)
            //disabled check button  and hint button
            checkButton.disabled = true;
            hintButton.disabled = true;
        }
    }
}

// mange hintButton 

document.querySelector(".hint span").innerHTML = numberOfHint
const hintButton = document.querySelector(".hint")

function hint() {
    // get enabled input from input 
    let enabledInput = document.querySelectorAll("input:not([disabled])")

    // get emptyInput

    // console.log(emptyInput)
    let emptyinput = Array.from(enabledInput).filter((input) => {
        return input.value === ""
    })

    // if user not input full emptyinput
    if (emptyinput.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyinput.length)//!! i cant use randoIndex with wordGuess to get random letter buecous randomIndex value change bettwen to var
        let randomInput = emptyinput[randomIndex]

        let indxRandomInputToFill = Array.from(enabledInput).indexOf(randomInput)
        // if randomInput in enabledInput  
        if (indxRandomInputToFill !== -1) {

            randomInput.value = wordGuess[indxRandomInputToFill].toUpperCase()
            randomInput.classList.add("hintInput")
        }
        // input try number of hint on span 
        if (numberOfHint > 0) {
            numberOfHint--
            document.querySelector(".hint span").innerHTML = numberOfHint
            if (numberOfHint === 0) {
                hintButton.disabled = true;

            }

        }

        randomInput.focus();


    }

}

hintButton.addEventListener("click", hint)

checkButton.addEventListener("click", guessCheck)

window.onload = genrateInput();

