var chart;
window.onload = function () {
  chart = new CanvasJS.Chart("chartContainer", {
    backgroundColor: "transparent",
    animationEnabled: true,
    data: [
      {
        type: "pie",
        startAngle: 240,
        yValueFormatString: '##0.00"%"',
        indexLabel: "{label} {y}",
        indexLabelFontColor: "#ccc",
        indexLabelFontSize: 18,
        dataPoints: [
          { y: 0, label: "Incomes", color: "#16dd16" },
          { y: 0, label: "Expenses", color: "#ff0000" },
        ],
      },
    ],
  });
  chart.render();
};

async function exchangeButton() {
  var amountSell = parseFloat(
    document.getElementById("amountInputSell").value.replace(",", ".")
  );
  var amountBuy = parseFloat(
    document.getElementById("amountInputBuy").value.replace(",", ".")
  );
  var balanceText = document.getElementById("balance").innerText;
  // Replace commas with dots in the balance text
  balanceText = balanceText.replace("$", "").replace(/,/g, ".");
  // Convert balanceText to a float
  var oldBalance = parseFloat(balanceText);
  // Calculate the new balance
  var newBalance = oldBalance;
  // Update balance after selling
  if (!isNaN(amountSell)) {
    newBalance -= amountSell;
    // Update recent sell transaction and expenses value
    var amountSellFormatted = amountSell.toFixed(2);
    document.getElementById(
      "transaction-amount-1"
    ).innerText = `- $${amountSellFormatted}`;
    // Decrease expenses value
    var expensesValue = parseFloat(
      document.getElementById("expenses-value").innerText.replace("$", "")
    );
    expensesValue += amountSell;
    document.getElementById(
      "expenses-value"
    ).innerText = `$${expensesValue.toFixed(2)}`;
  }

  // Update balance after buying
  if (!isNaN(amountBuy)) {
    newBalance += amountBuy;
    // Update recent buy transaction
    document.getElementById(
      "transaction-amount-2"
    ).innerText = `+ $${amountBuy.toFixed(2)}`;
    // Increase income value
    var incomeValue = parseFloat(
      document.getElementById("income-value").innerText.replace("$", "")
    );
    incomeValue += amountBuy;
    document.getElementById("income-value").innerText = `$${incomeValue.toFixed(
      2
    )}`;
  }

  // Update the balance display in both sections
  document.getElementById("balance").innerText = "$" + newBalance.toFixed(2);
  document.getElementById("balance-account").innerText =
    "$" + newBalance.toFixed(2);

  // Update the chart data points
  var incomeValue = parseFloat(
    document.getElementById("income-value").innerText.replace("$", "")
  );
  var expensesValue = parseFloat(
    document.getElementById("expenses-value").innerText.replace("$", "")
  );
  var total = incomeValue + expensesValue;
  var incomePercentage = (incomeValue / total) * 100;
  var expensesPercentage = (expensesValue / total) * 100;
  // Updating chart values based on the balance and variables
  chart.options.data[0].dataPoints[0].y = incomePercentage;
  chart.options.data[0].dataPoints[1].y = expensesPercentage;
  chart.render();
  // If balance is less than 0, then show the notification
  if (newBalance < 0) {
    displayPopup();
  }

  // Update transactions in the pop-up
  updateTransactions(amountSell, amountBuy);
}

// Notification when balance is less than 0
function displayPopup() {
  var popup = document.getElementById("popup");
  //Change display and opacity to flex and 0, then start an animation
  popup.style.display = "flex";
  popup.style.opacity = "0";
  // Animation for appearing in 1s
  setTimeout(function () {
    popup.style.opacity = "1";
  }, 0);
  //Dismiss the notification, when the button is clicked
  document
    .getElementById("dismissButton")
    .addEventListener("click", dismissPopup);
}
//Clicking button to dismiss the notification
function dismissPopup() {
  var popup = document.getElementById("popup");
  //Chaning display to 'none', it is not visible anymore
  popup.style.display = "none";
}

// Updating transactions in All transactions div
async function updateTransactions(amountSell, amountBuy) {
  // Get reference to the containers
  var incomesContainer = document.querySelector(".pop-incomes");
  var expensesContainer = document.querySelector(".pop-expenses");

  // Create new paragraph elements for incomes and expenses
  var incomeParagraph = document.createElement("p");
  var expenseParagraph = document.createElement("p");

  // Set the class for styling
  incomeParagraph.className = "transaction-item";
  expenseParagraph.className = "transaction-item";

  // Style for the paragraphs
  (incomeParagraph.style.color = "#ccc"),
    (expenseParagraph.style.color = "#ccc");

  // Set the text content based on the transaction amount
  if (!isNaN(amountSell)) {
    incomeParagraph.textContent = `- $${amountSell.toFixed(2)}`;
    expensesContainer.appendChild(incomeParagraph);
  }

  if (!isNaN(amountBuy)) {
    expenseParagraph.textContent = `+ $${amountBuy.toFixed(2)}`;
    incomesContainer.appendChild(expenseParagraph);
  }
}

// All transactions display changing from none to flex
document
  .querySelector(".text-transactions-all")
  .addEventListener("click", function () {
    var popup = document.getElementById("all-transactions-pop");
    if (popup.style.display === "none" || popup.style.display === "") {
      popup.style.display = "flex";
    } else {
      popup.style.display = "none";
    }
  });

document
  .getElementById("transaction-pop-close")
  .addEventListener("click", function () {
    var popup = document.getElementById("all-transactions-pop");
    popup.style.display = "none";
  });