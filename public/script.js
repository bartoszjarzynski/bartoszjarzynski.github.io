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

// Moving to the GitHub page from the logo on the home page
document.addEventListener("DOMContentLoaded", function () {
  var githubLink = document.getElementById("github-link");
  githubLink.addEventListener("click", function () {
    window.open(
      "https://github.com/bartoszjarzynski/finance_monitoring",
      "_blank"
    );
  });
});

// Username displays at home page
document.addEventListener("DOMContentLoaded", function () {
  var span = document.getElementById("username-display");
  span.textContent = username;
});

// Firstname and surname display at the card
document.addEventListener("DOMContentLoaded", function () {
  var span = document.getElementById("card-member-display");
  var capitalizedFirstName = firstname.toUpperCase();
  var capitalizedSurname = surname.toUpperCase();
  span.textContent = `${capitalizedFirstName} ${capitalizedSurname}`;
  span.style.fontFamily = "Credit Card";
  span.style.fontWeight = "400";
});

// Links for left menu clicking

document.addEventListener("DOMContentLoaded", function () {
  // Event listener for Market button
  document
    .querySelector(".market-shortcut")
    .addEventListener("click", function () {
      window.open("https://coinmarketcap.com", "_blank"); // Replace with the actual URL
    });

  // Event listener for News button
  document
    .querySelector(".news-shortcut")
    .addEventListener("click", function () {
      window.open("https://crypto.news", "_blank"); // Replace with the actual URL
    });

  // Event listener for Binance button
  document
    .querySelector(".binance-shortcut")
    .addEventListener("click", function () {
      window.open("https://binance.com", "_blank"); // Replace with the actual URL
    });

  // Event listener for Twitter button
  document
    .querySelector(".twitter-shortcut")
    .addEventListener("click", function () {
      window.open("https://x.com", "_blank"); // Replace with the actual URL
    });
});

// Buy me a coffee link
document.addEventListener("DOMContentLoaded", function () {
  var githubLink = document.getElementById("coffee-link");
  githubLink.addEventListener("click", function () {
    window.open("https://buymeacoffee.com/bjarzynski", "_blank");
  });
});





// Balance script
// const mongoose = require('mongoose');
// const collection = require("./config");

// // Function to update user balance
// async function updateUserBalance(username, amount) {
//     try {
//         // Find the user by username and update their balance
//         await collection.updateOne({ name: username }, { $inc: { balance: amount } });
//     } catch (error) {
//         console.error('Error updating user balance:', error);
//     }
// }

// // Function to fetch user balance
// async function getUserBalance(username) {
//     try {
//         // Find the user by username and fetch their balance
//         const user = await collection.findOne({ name: username });
//         return user ? user.balance : 0;
//     } catch (error) {
//         console.error('Error fetching user balance:', error);
//         return 0;
//     }
// }

// // Function to increase user balance by 25
// async function increaseBalanceByUsername(username) {
//     try {
//         // Increase user balance by 25
//         await updateUserBalance(username, -25);
//         console.log('User balance increased by 25');
//     } catch (error) {
//         console.error('Error increasing user balance:', error);
//     }
// }

// // Example usage
// async function exampleUsage() {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect('mongodb://localhost:27017/Login', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         // Increase user balance by 25
//         await increaseBalanceByUsername('TestUser123');

//         // Fetch user balance and log it
//         const balance = await getUserBalance('TestUser123');
//         console.log('User balance:', balance); // Should print 25
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         // Close the database connection
//         await mongoose.disconnect();
//     }
// }

// exampleUsage();