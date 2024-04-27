// Fetching Cryptocurrency Prices
const apiKey = "4957b1fa-eef0-498b-a31e-3673622cd97a";
const proxyUrl = "https://api.allorigins.win/raw?url="; // Example CORS proxy service

fetch(
  `${proxyUrl}https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}`,
  {
    headers: {
      "X-Requested-With": "XMLHttpRequest", // Required header for some CORS proxy services
    },
  }
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("API request failed! Status:", response.status);
    }
    return response.json(); // Parse response JSON
  })
  .then((data) => {
    if (data && data.data && Array.isArray(data.data)) {
      data.data.forEach((currency) => {
        switch (currency.symbol) {
          case "BTC":
            document.getElementById("bitcoin-price-display").textContent =
              "$" + currency.quote.USD.price.toFixed(2);
            document.getElementById("bitcoin-change-display").textContent =
              currency.quote.USD.percent_change_24h.toFixed(2) + "%";
            document.getElementById("bitcoin-change-display").style.color =
              currency.quote.USD.percent_change_24h < 0 ? "red" : "green";
            break;
          case "ETH":
            document.getElementById("ethereum-price-display").textContent =
              "$" + currency.quote.USD.price.toFixed(2);
            document.getElementById("ethereum-change-display").textContent =
              currency.quote.USD.percent_change_24h.toFixed(2) + "%";
            document.getElementById("ethereum-change-display").style.color =
              currency.quote.USD.percent_change_24h < 0 ? "red" : "green";
            break;
          case "BNB":
            document.getElementById("binance-price-display").textContent =
              "$" + currency.quote.USD.price.toFixed(2);
            document.getElementById("binance-change-display").textContent =
              currency.quote.USD.percent_change_24h.toFixed(2) + "%";
            document.getElementById("binance-change-display").style.color =
              currency.quote.USD.percent_change_24h < 0 ? "red" : "green";
            break;
          default:
            break;
        }
      });
    } else {
      console.error("Invalid data format in API response");
    }
  })
  .catch((error) => {
    console.error("Error fetching API:", error);
  });