//setting name game 
let nameGame = "guess The Word";
document.title = nameGame;
document.querySelector("h1").innerHTML = nameGame;
document.querySelector("footer").innerHTML = `${nameGame} Game created by Mohamed Sabry`

// setting Game options

const numbersOfTries = 6;
const numbersOfLeters = 6;
let currentTry = 1;
let numberOfHint = 2;


function addUpperCaseLisener (input) {
    input.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
    })
}

function addFocusNextLetterListener(input) {
    input.addEventListener("input", function () {
        if (input.nextElementSibling) {
            input.nextElementSibling.focus();
        }
    })
}

function addArrowsLisener(input) {
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

function addDeleteLisener(input) {
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
        tryDiv.classList.add(`try-${i}`, "try")
        tryDiv.innerHTML = `<span>Try ${i} </span>`

        //creat inputs
        for (let j = 1; j <= numbersOfLeters; j++) {
            const input = document.createElement("input")
            if (i !== 1) {
                tryDiv.classList.add("disabled-inputs")
                input.disabled = true
            }
            input.type = "Text";
            // input.placeholder = "miss"
            input.id = `guess-${i}-input-${j}`
            input.setAttribute("maxLength", "1")

            addUpperCaseLisener(input)
            addArrowsLisener(input)
            addDeleteLisener(input)

            tryDiv.appendChild(input)

            const prevInput = tryDiv.children[j]
            addFocusNextLetterListener(prevInput)
        }
        inputsContainer.appendChild(tryDiv)
    }
    inputsContainer.children[0].children[1].focus();
}
const checkButton = document.querySelector(".check")

// mange words 

let words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
let wordGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let massageArea = document.querySelector(".massage")
// console.log(wordGuess)
function guessCheck() {

    let successguess = true;
    for (let i = 1; i <= numbersOfLeters; i++) {
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
        // let span = document.createElement("span")
        // let text = document.createTextNode(`${wordGuess}`)
        // let text2 = document.createTextNode("you win  the word is")
        // span.append(text)
        // massageArea.append(text2, span)
        //// OR esily///
        massageArea.innerHTML = `you win the word is <span>${wordGuess}</span>`
        if (numberOfHint === 2) {
            massageArea.innerHTML = `<p>congrantz you didn't us hints</p>`
        }

        //////add disabled class on ALL try Divs 
        let allTries = document.querySelectorAll(".inputs > div")
        // OR
        // let allTries = document.querySelectorAll(".try ")
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
            massageArea.innerHTML = `game over the word is <span>${wordGuess}</span>`
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
    //OR
    // let currentTryInputs = document.querySelectorAll(`.try-${currentTry} > input`)
    // console.log(enabledInput)
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
            // randomInput.style.cssText = "background-color : green; color :red"  //!!// perfer i do class  
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

