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
        indexLabelFontSize: 13,
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
    document.getElementById("income-value").innerText = `$${incomeValue.toFixed(2)}`;
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

  if (newBalance < 0){
    displayPopup();
  }
}

function displayPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "flex";
  popup.style.opacity = "0";
  // Animation for appearing in 1s
  setTimeout(function() {
    popup.style.opacity = "1";
  }, 0);
  document.getElementById("dismissButton").addEventListener("click", dismissPopup);
}

function dismissPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}