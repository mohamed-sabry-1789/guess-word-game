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
    currentTry: 1,
    curentTryF() { return this.currentTry },
    nextCurrentTry() { this.currentTry++ },
    restCurrentTry() { this.currentTry = 1 }
}
// let massageArea = document.querySelector(".massage")
function isLetter(letter) {
    return letter.match(/^[a-z]{1}$/i)
}
const gameUi = {
    // Controls
    keyColor: document.querySelector(".key-colors"),
    messageArea: document.querySelector(".massage"),
    checkButton: document.querySelector(".check"),
    hintButton: document.querySelector(".hint"),
    hintSpan: document.querySelector(".hint span"),

    // toggleKeyColor(true) -> show -> "block"
    // toggleKeyColor(false) -> hide -> "none"

    // toggleKeyColor("none")
    // toggleKeyColor("block")

    // Functions
    toggleKeyColor(show) { this.keyColor.style.display = show ? "block" : "none" },
    toggleCheckButton(enable) { this.checkButton.disabled = enable },
    toggleHintButton(enable) { this.hintButton.disabled = enable },
    setHint(count) { this.hintSpan.innerHTML = count },
    setMessage(word, messageBody) {
        if (word && messageBody) {
            const wordWrapper = document.createElement("span")
            const wordNode = document.createTextNode(word)
            wordWrapper.appendChild(wordNode)
            const bodyText = document.createTextNode(messageBody)
            this.messageArea.append(bodyText, wordWrapper)
        } else {
            this.messageArea.innerHTML = " "
        }
    },
    win(word) {
        this.toggleKeyColor(false)
        this.toggleCheckButton(true);
        this.toggleHintButton(true);
        this.setMessage(word, "you win the word is")
        // let span = document.createElement("span")
        // let text = document.createTextNode(`${word}`)
        // let text2 = document.createTextNode("you win the word is")
        // span.append(text)
        // this.messageArea.append(text2, span)
    },
    gameOver(word) {
        this.toggleKeyColor()
        this.messageArea.classList.add("gameOver")
        // const span = document.createElement("span")
        // const text = document.createTextNode(`${word}`)
        // span.appendChild(text)
        // const text2 = document.createTextNode(`game over the word is`)
        // this.messageArea.append(text2, span)
        this.setMessage(word, "game over the word is")
        this.toggleCheckButton(true);
        this.toggleHintButton(true);
    }
}

// this.hintButton.innerHTML = --
// gameUi.toggleCheckButton(true)
// document.querySelector(".check-btn").disabled = true    !!same result

function addUpperCaseAndFoucinInput(input) {
    // input -> value
    // input.addEventListener("input", function (event) {
    //     event.preventDefault();
    // })
    input.addEventListener("keydown", function (event) {
        // console.log({ event })
        const key = event.key;

        if (key === " ") {
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();
            } else {
                input.parentElement.children[1].focus()
            }


        }
        if (isLetter(key) && !(event.altKey || event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.value = key.toUpperCase();
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();

            }
        }

    })
}
const logic = {
    logic(input) {
        if (input.nextElementSibling) {
            input.nextElementSibling.focus();
        } else {
            input.parentElement.children[1].focus()
        }
    },
    btn() {
        return document.querySelector("button")
    }
}

function addarrwInput(input) {
    input.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            logic.logic(input)
        }

        if (event.key === "ArrowLeft") {
            const prevInput = input.previousElementSibling;
            // if (prevInput && prevInput.tagName === 'INPUT')
            if (isInputElement(prevInput)) {

                if (checkInput(prevInput)) {
                    const prevPrevInput = prevInput.previousElementSibling;
                    if (isInputElement(prevPrevInput)) {
                        if (checkInput(prevPrevInput)) {
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
        if (checkInput(input)) {
            if (input.nextElementSibling) {
                input.nextElementSibling.focus()
            } else {
                input.parentElement.children[1].focus()
            }
        }

    })
}
function checkInput(input) {
    return input.classList.contains("hintInput") || input.classList.contains("yes-in-place")

}
function deleteLetterinInput(input) {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            if (input.value) {
                if (checkInput(input)) {
                    event.preventDefault();
                } else {
                    input.value = ""
                }
            } else if (input.previousElementSibling) {
                if (!checkInput(input.previousElementSibling)) {
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
function guessCheck({ context, ui }) {
    const numbersOfInputs = context.wordLength();
    const wordGuess = context.currentWord();
    // const curentTry = context.curentTryF();
    // const curentTry = context.curentTry;
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
        ui.win(wordGuess);
        // let span = document.createElement("span")
        // let text = document.createTextNode(`${wordGuess}`)
        // let text2 = document.createTextNode("you win the word is")
        // span.append(text)
        // massageArea.append(text2, span)
        // const a = document.querySelector(".key-colors")
        // a.style.display = "none"
        //////add disabled class on ALL try Divs 
        let allTries = document.querySelectorAll('.try');
        allTries.forEach((tryDiv) => {
            tryDiv.classList.add("disabled-inputs")
        })
        // disabled check button and hint button
        // checkButton.disabled = true;
        // hintButton.disabled = true;
        // ui.toggleCheckButton(true);
        // ui.toggleHintButton(true);

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
            for (let i = 0; i < nextTryInputs.length; i++) {
                let input = nextTryInputs[i];
                input.disabled = false;
                const prevInputField = document.querySelector(`#guess-${context.currentTry - 1}-input-${i + 1}`)

                console.log(prevInputField, i, context.currentTry)

                const prevLetter = prevInputField.value.toLowerCase();
                const atctualLetter = wordGuess[i]
                console.log(wordGuess)
                if (prevLetter === atctualLetter) {
                    //letter is correct and in place
                    input.classList.add("yes-in-place")
                    input.value = atctualLetter.toUpperCase()
                    //letter is correct and not in place

                }
            }

            el.children[1].focus();
        } else {
            ui.gameOver(wordGuess);
            // massageArea.classList.add("gameOver")
            // const span = document.createElement("span")
            // const text = document.createTextNode(`${wordGuess}`)
            // span.appendChild(text)
            // const text2 = document.createTextNode(`game over the word is`)
            // massageArea.append(text2, span)
            //disabled check button  and hint button
            // checkButton.disabled = true;
            // hintButton.disabled = true;
            // ui.toggleCheckButton(true);
            // ui.toggleHintButton(true);
            // const a = document.querySelector(".key-colors")
            // a.style.display = "none"
        }

    }
}

// mange hintButton 

document.querySelector(".hint span").innerHTML = gameContext.numberOfHint
const hintButton = document.querySelector(".hint")

function hint({ context, ui }) {
    // const {context , ui} = args ?? {}
    if (!context || !ui) return
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
                // document.querySelector(".hint span").innerHTML = context.numberOfHint
                ui.setHint(context.numberOfHint)
                if (context.numberOfHint === 0) {
                    // hintButton.disabled = true;
                    ui.toggleHintButton(true)

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


// gameUi = {
//     inputs: document.querySelecotr(".inputs"),
//     // functions
// }
function removeInputs({ context, ui }) {
    const tryDiv = document.querySelector(".inputs")
    const tryDivs = document.querySelectorAll(".inputs > div")
    tryDivs.forEach((el) => {
        if (el.parentElement) {
            el.remove()
        }
    })
    context.reset();
    genrateInput(context)
    hintButton.disabled = false
    checkButton.disabled = false
    // document.querySelector(".massage").innerHTML = " "
    // ui.messageArea.innerHTML = " "
    ui.setMessage()
    // document.querySelector(".key-colors").style.display = "block"
    ui.toggleKeyColor(true)
    context.restHint()
    context.restCurrentTry();
    // document.querySelector(".hint span").innerHTML = context.numberOfHint;
    ui.setHint(context.numberOfHint);
}

rest.addEventListener("click", () => { removeInputs({ context: gameContext, ui: gameUi }) })
// rest.addEventListener("click", () => {
//     window.location.reload()
// })
document.addEventListener("keydown", ent)
hintButton.addEventListener("click", () => { hint({ context: gameContext, ui: gameUi }) })

checkButton.addEventListener("click", () => { guessCheck({ context: gameContext, ui: gameUi }) })

window.onload = genrateInput(gameContext);


