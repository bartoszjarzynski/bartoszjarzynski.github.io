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