const nameProductInput = document.querySelector('.app__input-name-product');
const costProductInput = document.querySelector('.app__input-cost-product');
const productButton = document.querySelector('.app__button-product');
const expensesError = document.querySelector('.expenses-name-error');
const budgetInput = document.querySelector('.app__input-budget');
const budgetButton = document.querySelector('.app__button-budget');
const budgetError = document.querySelector('.budget-error');
const amountTotalOut = document.querySelector('.app__amount-total-out');
const amountExpensesOut = document.querySelector('.app__amount-expenses-out');
const amountBalanceOut = document.querySelector('.app__amount-balance-out');
const productListOut = document.querySelector('.product__list');

let tempAmount = 0;

const disableButton = boolean => {
    const editButtons = document.querySelectorAll('.product__edit');
    editButtons.forEach(element => {
        element.disabled = boolean;
    });
};

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = amountBalanceOut.innerText;
    let currentExpenses = amountExpensesOut.innerText;
    let parentAmount = parentDiv.querySelector('.product__cost').innerText;

    if (edit) {
        let parentText = parentDiv.querySelector('.product__name').innerText;
        nameProductInput.value = parentText;
        costProductInput.value = parentAmount;
        disableButton(true);
    }

    amountBalanceOut.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    amountExpensesOut.innerText = parseInt(currentExpenses) - parseInt(parentAmount);
    parentDiv.remove('');
};

const addProductToList = (productName, productCost) => {
    let productItem = document.createElement('li');
    productItem.classList.add('product__item');

    productItem.innerHTML = `<p class="product__name">${productName}</p><p class="product__cost">${productCost}</p>`;

    let editButton = document.createElement('span');
    editButton.classList.add('material-symbols-sharp', 'product__edit');
    editButton.innerText = 'edit';
    editButton.addEventListener('click', () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement('span');
    deleteButton.classList.add('material-symbols-sharp', 'product__delete');
    deleteButton.innerText = 'delete_forever';
    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton);
    });

    productItem.appendChild(editButton);
    productItem.appendChild(deleteButton);

    productListOut.appendChild(productItem);
};

budgetButton.addEventListener('click', () => {
    tempAmount = budgetInput.value;

    if (tempAmount === '' || tempAmount <= 0) {
        budgetError.classList.remove('hidden');
    } else {
        budgetError.classList.add('hidden');

        amountTotalOut.innerText = tempAmount;
        amountBalanceOut.innerText = tempAmount - amountExpensesOut.innerText;
        budgetInput.value = '';
    }
});

productButton.addEventListener('click', () => {
    if (!nameProductInput.value || !costProductInput.value) {
        expensesError.classList.remove('hidden');
        return false;
    } else {
        expensesError.classList.add('hidden');
    }

    disableButton(false);

    let expenditure = parseInt(costProductInput.value);
    let sum = parseInt(amountExpensesOut.innerText) + expenditure;
    amountExpensesOut.innerText = sum;
    const totalBalance = tempAmount - sum;
    amountBalanceOut.innerText = totalBalance;

    addProductToList(nameProductInput.value, costProductInput.value);

    nameProductInput.value = '';
    costProductInput.value = '';
});
