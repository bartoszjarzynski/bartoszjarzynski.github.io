// Get the canvas element
var ctx = document.getElementById("pieChart").getContext("2d");

// Define data
var data = {
  labels: ["Money Deposit", "Money Spent"],
  datasets: [
    {
      data: [0, 0], // Updated initial data for money deposit and money spent
      backgroundColor: ["#36A2EB", "#FF6384"], // Colors for each segment
    },
  ],
};

// Configure options
var options = {
  responsive: false,
  maintainAspectRatio: false,
};

// Create pie chart
var myPieChart = new Chart(ctx, {
  type: "pie",
  data: data,
  options: options,
});

// Initialize spending limit
var spendingsLimit = 1000;

// Deposit and spendings alert creation
function showAmountPrompt(type) {
  var action =
    type === "deposit"
      ? "deposit"
      : type === "spendings"
      ? "spendings"
      : "limit";
  var amount = prompt("Enter the amount for " + action + ":");

  if (amount !== null && amount !== "") {
    var parsedAmount = parseInt(amount); // Parse the amount to integer
    
    if (type === "deposit") {
      // Update deposit amount
      var currentDeposit = parseInt(
        document.getElementById("depositAmount").textContent
      );

      var newDeposit = currentDeposit + parsedAmount;
      document.getElementById("depositAmount").textContent = newDeposit + "$";
      // Update wallet amount
      
      var currentWallet = parseInt(
        document.getElementById("walletAmount").textContent
      );

      var newWallet = currentWallet + parsedAmount;
      document.getElementById("walletAmount").textContent = newWallet + "$";
      
      // Update pie chart's money deposit segment
      data.datasets[0].data[0] = newWallet;
      
      // Update deposit history
      var depositHistory = document.getElementById("depositHistory");
      var newDepositEntry = document.createElement("h4");
      newDepositEntry.textContent = "Deposit: " + parsedAmount + "$";
      depositHistory.appendChild(newDepositEntry);
    } else if (type === "spendings") {
      // Check if spending exceeds the limit
      if (parsedAmount > spendingsLimit) {
        alert("Spending amount exceeds the set limit!");
        return;
      }

      // Update spendings amount
      var currentSpendings = parseInt(
        document.getElementById("spendingsAmount").textContent
      );

      var newSpendings = currentSpendings + parsedAmount;
      document.getElementById("spendingsAmount").textContent =
        newSpendings + "$";

      // Update wallet amount
      var currentWallet = parseInt(
        document.getElementById("walletAmount").textContent
      );

      var newWallet = currentWallet - parsedAmount;
      document.getElementById("walletAmount").textContent = newWallet + "$";
      
      // Update pie chart's money spent segment
      data.datasets[0].data[1] = newSpendings;
      
      // Update spendings history
      var spendingsHistory = document.getElementById("spendingsHistory");
      var newSpendingsEntry = document.createElement("h4");
      newSpendingsEntry.textContent = "Spent: " + parsedAmount + "$";
      spendingsHistory.appendChild(newSpendingsEntry);
    } else if (type === "limit") {
      
        // Set spending limit
      spendingsLimit = parsedAmount;
      document.getElementById("spendingsLimitValue").textContent =
        "Set limit is " + spendingsLimit + "$";
    }

    var message = "You have added to " + action + " " + parsedAmount + "$";
    alert(message);
    myPieChart.update(); // Update the pie chart
  }
}



function signOut() {
    // Sign out cleaning cookies and entire logic here.
    window.location.href = '/';
}
