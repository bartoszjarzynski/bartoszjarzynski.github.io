// Balance script

function exchangeButton() {
  var amountSell = parseFloat(document.getElementById("amountInputSell").value);
  var amountBuy = parseFloat(document.getElementById("amountInputBuy").value);
  var balance = parseFloat(document.getElementById("balance").innerText.replace('$', '').replace(',', ''));

  // Update balance after selling
  if (!isNaN(amountSell)) {
      balance -= amountSell;
  }

  // Update balance after buying
  if (!isNaN(amountBuy)) {
      balance += amountBuy;
  }

  // Update the balance display
  document.getElementById("balance").innerText = "$" + balance.toFixed(2);

  // Reset the input fields
  document.getElementById("amountInputSell").value = "";
  document.getElementById("amountInputBuy").value = "";
}







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