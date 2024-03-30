//setting name game 
let nameGame = "guess The Word";
document.title = nameGame;
document.querySelector("h1").innerHTML = nameGame;
document.querySelector("footer").innerHTML = `${nameGame} Game created by Mohamed Sabry`

// setting Game options

const numbersOfTries = 6;
// let currentTry = 1;

// let numberOfHint = 2;
// mange words 

let words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
// let wordGuess = randomWord();
function randomWord() {
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
}
const gameContext = {
    word: randomWord(),
    currentWord() { return this.word },
    // For new game
    reset() { this.word = randomWord() },
    wordLength() { return this.word.length },
    numberOfHint: 2,
    restHint() { this.numberOfHint = 2 },
    nextHint() { this.numberOfHint-- },
    hintIndex: [],
    currentTry: 1,
    curentTryF() { return this.currentTry },
    nextCurrentTry() { this.currentTry++ },
    restCurrentTry() { this.currentTry = 1 }
}
let massageArea = document.querySelector(".massage")

function addUpperCaseAndFoucinInput(input) {
    // input -> value
    // input.addEventListener("input", function (event) {
    //     event.preventDefault();
    // })
    input.addEventListener("keydown", function (event) {
        // console.log({ event })
        const key = event.key;
        if (key.match(/^[a-z]{1}$/i) && !(event.altKey || event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.value = key.toUpperCase();
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();

            }
        }

    })
}
function addarrwInput(input) {
    input.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();
            } else {
                input.parentElement.children[1].focus()
            }


        }

        if (event.key === "ArrowLeft") {
            const prevInput = input.previousElementSibling;
            if (isInputElement(prevInput)) {

                if (prevInput.classList.contains("hintInput")) {
                    const prevPrevInput = prevInput.previousElementSibling;
                    if (isInputElement(prevPrevInput)) {
                        if (prevPrevInput.classList.contains("hintInput")) {
                            const prevPrevPrevInput = prevPrevInput.previousElementSibling;
                            if (isInputElement(prevPrevPrevInput)) {
                                prevPrevPrevInput.focus();
                            } else {
                                input.parentElement.lastElementChild.focus()
                            }
                        } else {
                            prevPrevInput.focus();
                        }
                    } else {
                        input.parentElement.lastElementChild.focus()
                    }
                } else {
                    prevInput.focus();
                }


            } else {

                input.parentElement.lastElementChild.focus()

            }

        }
    })
}
function isInputElement(element) {
    return element && element.tagName === 'INPUT';
}

function inputLisner(input) {
    input.addEventListener("focus", () => {
        if (input.classList.contains("hintInput")) {
            if (input.nextElementSibling) {
                input.nextElementSibling.focus()
            } else {
                input.parentElement.children[1].focus()
            }
        }

    })
}
function deleteLetterinInput(input) {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            if (input.value) {
                if (input.classList.contains("hintInput")) {
                    event.preventDefault();
                } else {
                    input.value = ""
                }
            } else if (input.previousElementSibling) {
                if (!input.previousElementSibling.classList.contains("hintInput")) {

                    input.previousElementSibling.value = ""
                    input.previousElementSibling.focus();
                } else {
                    input.previousElementSibling.previousElementSibling.value = ""
                    input.previousElementSibling.previousElementSibling.focus();
                }
            }


        }
    })
}
function genrateInput(context) {
    const numbersOfInputs = context.wordLength();
    const inputsContainer = document.querySelector(".inputs")
    //creat main tryDiv or parent div
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div")
        tryDiv.classList.add(`try-${i}`, 'try')
        const span = document.createElement("span")
        span.innerHTML = `Try ${i}`
        tryDiv.append(span)



        //creat inputs
        for (let j = 1; j <= numbersOfInputs; j++) {
            const input = document.createElement("input")
            input.type = "Text";
            input.id = `guess-${i}-input-${j}`
            input.setAttribute("maxLength", "1")
            tryDiv.appendChild(input)

            if (i !== 1) {
                tryDiv.classList.add("disabled-inputs") //!
                input.disabled = true


            }
            addUpperCaseAndFoucinInput(input)
            addarrwInput(input)
            deleteLetterinInput(input)
            inputLisner(input)
        }

        inputsContainer.appendChild(tryDiv)

    }
    inputsContainer.children[0].children[1].focus();
}
const checkButton = document.querySelector(".check")


// console.log(wordGuess)
function guessCheck(context) {
    const numbersOfInputs = context.wordLength();
    const wordGuess = context.currentWord();

    // const curentTry = context.curentTryF();
    const curentTry = context.curentTry;
    let successguess = true;
    for (let i = 1; i <= numbersOfInputs; i++) {
        const inputField = document.querySelector(`#guess-${context.currentTry}-input-${i}`)

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
        let text2 = document.createTextNode("you win the word is")
        span.append(text)
        massageArea.append(text2, span)
        const a = document.querySelector(".key-colors")
        a.style.display = "none"
        //////add disabled class on ALL try Divs 
        let allTries = document.querySelectorAll('.try');
        allTries.forEach((tryDiv) => {
            tryDiv.classList.add("disabled-inputs")
        })
        // disabled check button and hint button
        checkButton.disabled = true;
        hintButton.disabled = true;

    } else {
        // disabled curentTry 
        document.querySelector(`.try-${context.currentTry}`).classList.add("disabled-inputs")
        // disabled curentTry input
        const currentTryInputs = document.querySelectorAll(`.try-${context.currentTry} > input`)
        currentTryInputs.forEach((input => {
            input.disabled = true;
        }))

        context.nextCurrentTry()

        const el = document.querySelector(`.try-${context.currentTry}`)
        if (el) {
            // Undisabled next curentTry 
            el.classList.remove("disabled-inputs")
            // Undisabled  next curentTry  input
            const nextTryInputs = document.querySelectorAll(`.try-${context.currentTry} > input`)

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
            const a = document.querySelector(".key-colors")
            a.style.display = "none"
        }
    }
}

// mange hintButton 

document.querySelector(".hint span").innerHTML = gameContext.numberOfHint
const hintButton = document.querySelector(".hint")

function hint(context) {
    // get enabled input from input 
    let enabledInput = document.querySelectorAll("input:not([disabled])")
    const wordGuess = context.currentWord();

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
            if (randomInput.nextElementSibling) {
                randomInput.nextElementSibling.focus()

            }
            if (context.numberOfHint > 0) {
                context.nextHint();
                document.querySelector(".hint span").innerHTML = context.numberOfHint

                if (context.numberOfHint === 0) {
                    hintButton.disabled = true;

                }
            }
        }

    }
    // input try number of hint on span
}

function ent(e) {
    if (e.key === "Enter") {
        checkButton.click()
    }
}

// setting rest button 
const rest = document.querySelector(".rest")


function removeInputs(context) {
    const tryDiv = document.querySelector(".inputs")
    const tryDivs = document.querySelectorAll(".inputs > div")
    tryDivs.forEach((li) => {
        if (li.parentElement) {
            li.remove()
        }
    })
    context.reset();
    genrateInput(context)
    hintButton.disabled = false
    checkButton.disabled = false
    document.querySelector(".massage").innerHTML = " "
    document.querySelector(".key-colors").style.display = "block"
    context.restHint()
    context.restCurrentTry();
    document.querySelector(".hint span").innerHTML = context.numberOfHint;
}


rest.addEventListener("click", () => { removeInputs(gameContext) })
// rest.addEventListener("click", () => {
//     window.location.reload()
// })
document.addEventListener("keydown", ent)
hintButton.addEventListener("click", () => { hint(gameContext) })

checkButton.addEventListener("click", () => { guessCheck(gameContext) })

window.onload = genrateInput(gameContext);

