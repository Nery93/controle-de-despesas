const transactionsUl =          document.querySelector('#transactions')
const incomeDisplay =           document.querySelector('#money-plus')
const expanseDisplay =          document.querySelector('#money-minus')
const balanceDisplay =          document.querySelector('#balance')
const form =                    document.querySelector('#form')
const inputTransactionName =    document.querySelector('#text')
const inputTransactionAmount =  document.querySelector('#amount')


const localStorageTransactions = JSON
    .parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transacations') !== null ? localStorageTransactions : []

const removeTransaction = ID =>{
    transactions = transactions
    .filter(transaction => transaction.id !== ID)
    updateLocalStorage
    init()
}

const addTransatcionDOM = transaction => {
    const operator = transaction.amount <0 ? '-' : '+'
    const CSSClass = transaction.amount <0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')


    li.classList.add(CSSClass)
    li.innerHTML = `
      ${transaction.name} 
      <span>${operator} R$${amountWithoutOperator}</span>
      <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
         x
      </button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)

    const total = transactionsAmounts
        .reduce((acc,transaction) => acc + transaction, 0)
        .toFixed(2)

    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((acc,value)=> acc + value,0)
        .toFixed(2)

    const expanse = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((acc,value) => acc + value, 0))
        .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expanseDisplay.textContent = `R$ ${expanse}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransatcionDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions',JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const handleFormSubmit = event => {
    event.preventDefault()
    const transactionName = inputTransactionAmount.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()


    if(transactionName === '' || transactionAmount === '') {
        alert('Por favor, preencha tanto o nome quanto o valor da transa????o!')
        return
    }

    const transaction = {
        id: generateID(),  
        name: transactionName,
        amount: Number(transactionAmount)
    }

    transactions.push(transaction)
    init()
    updateLocalStorage()


   inputTransactionName.value = '' 
   inputTransactionAmount.value = '' 
}


form.addEventListener('submit',handleFormSubmit )
