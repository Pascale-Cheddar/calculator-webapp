// der constructor lässt unsere brerechnung in dem outputfeld  platzieren 
class Calculator { // "this" ist immer das  parent object
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()// wenn wir unseren Tachenrechener aufrufen,  wollen wir all unsere Eingaben  auf den Standard zurückstzen(prev u. current)
    }

    //Löscht alle Eingaben 
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    //löscht ein Zeichen 
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    // fügt eine Zahl hinzu 
    // wir Konvertieren .toString, weil sonst 1+1 =2 sind und nicht 11
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return //.includes() pfüft ob ein bestimmtes Element vorhanden ist
        this.currentOperand = this.currentOperand.toString() + number.toString() 
    }
    // fügt den Mathematischenoperator hinzu
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //Brerechnet 
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) //Die parseFloat()-Funktion parst ein Zeichenketten-Argument und gibt eine Fließkommazahl zurück.
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return // Wenn keine Nummer im Display steht, soll equal nichts auswerten (cancel this function) 
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    //Helper function
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('de', {
                maximumFractionDigits: 0 // keine Nachkommastellen  nach dem ersten Komma 
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}` // js string template 
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`//append the opration to the prevOperand
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}




/* Variablen um unsere Buttons anzusteuern, um sie einzubinden eine Funktion auszuführen*/
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// numberButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         calculator.appendNumber(button.innerText)
//         calculator.updateDisplay()
//     })
// })


for (const button of numberButtons) {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
}

for (const button of operationButtons) {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
}


equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})