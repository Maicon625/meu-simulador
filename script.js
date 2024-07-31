

let balance = 10000;
let holdings = {};

async function updatePriceInfo(ticker) {
    const price = await getStockPrice(ticker);
    document.getElementById('current-price').innerText = price ? `$${price}` : 'N/A';
}

function updatePortfolio() {
    document.getElementById('balance').innerText = balance.toFixed(2);
    const holdingsList = document.getElementById('holdings');
    holdingsList.innerHTML = '';
    for (const ticker in holdings) {
        const li = document.createElement('li');
        li.innerText = `${ticker}: ${holdings[ticker]}`;
        holdingsList.appendChild(li);
    }
}

async function buyStock() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const amount = parseInt(document.getElementById('amount').value);
    if (ticker && amount > 0) {
        const price = await getStockPrice(ticker);
        if (price && balance >= price * amount) {
            balance -= price * amount;
            if (holdings[ticker]) {
                holdings[ticker] += amount;
            } else {
                holdings[ticker] = amount;
            }
            updatePortfolio();
        } else {
            alert('Saldo insuficiente ou cotação indisponível.');
        }
    } else {
        alert('Por favor, insira um ticker válido e uma quantidade maior que zero.');
    }
}

async function sellStock() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const amount = parseInt(document.getElementById('amount').value);
    if (ticker && amount > 0 && holdings[ticker] >= amount) {
        const price = await getStockPrice(ticker);
        if (price) {
            balance += price * amount;
            holdings[ticker] -= amount;
            if (holdings[ticker] === 0) {
                delete holdings[ticker];
            }
            updatePortfolio();
        } else {
            alert('Cotação indisponível.');
        }
    } else {
        alert('Quantidade insuficiente de ações ou ticker inválido.');
    }
}

document.getElementById('ticker').addEventListener('input', (e) => {
    updatePriceInfo(e.target.value.toUpperCase());
});

updatePortfolio();

function selectTicker() {
    const ticker = document.getElementById('ticker-select').value;
    if (ticker) {
        document.getElementById('ticker').value = ticker;
        updatePriceInfo(ticker);
    }
}