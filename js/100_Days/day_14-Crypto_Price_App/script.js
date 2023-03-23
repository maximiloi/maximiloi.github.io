fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd&include_24hr_change=true'
)
    .then(response => response.json())
    .then(json => {
        const app = document.querySelector('.app');
        const coins = Object.getOwnPropertyNames(json);

        for (let coin of coins) {
            let coinInfo = json[coin];
            let price = coinInfo.usd;
            let change = coinInfo.usd_24h_change.toFixed(5);

            app.innerHTML += `
            <div class ="coin__item ${change < 0 ? 'falling' : 'rising'}">
                <div class="coin__logo">
                    <img src="img/${coin}.png" height="32px">
                </div>
                <div class="coin__wrapper">
                    <div class="coin__name">
                        <h3>${coin}<span>/USD</span></h3>
                    </div>
                    <div class="coin__price-wrapper">
                        <span class="coin__price">$${price}</span>
                        <span class="coin__change">$${change}</span>
                    </div>
                </div>
            </div>
            `;
        }
    });
