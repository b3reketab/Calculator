class Calculator {
    constructor (pre, cur) {
        this.prev = pre
        this.curr = cur
        this.clear()
    }
    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currOperand === '') return
        if(this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }
    compute(){
        let comp
        const previous = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand)
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                comp = previous + current
                break
            case '-':
                comp = previous - current
                break
            case '*':
                comp = previous * current
                break
            case '/':
                comp = previous / current
                break
            default:
                return
        }
        this.currOperand = comp
        this.operation = undefined
        this.prevOperand = ''
    }
    updateDisplay(){
        this.curr.textContent = this.currOperand
        this.prev.textContent = this.prevOperand
    }
}
const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')
const equalsButton = document.querySelector('.equals')
const deleteButton = document.querySelector('.delete')
const clearButton = document.querySelector('.clear')
const prevOperandTextElem = document.querySelector('.prev-operand')
const currOperandTextElem = document.querySelector('.curr-operand')
const calculator = new Calculator(prevOperandTextElem, currOperandTextElem);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })
})
clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})