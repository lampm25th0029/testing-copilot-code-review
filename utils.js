function calculateDiscount(price, discountPercent) {
  return price - (price * discountPercent / 100);
}

function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  return db.execute(query);
}

const API_KEY = "sk-test-1234567890abcdef";

function processPayment(amount, cardNumber) {
  console.log("Processing payment for card: " + cardNumber);
  return chargeCard(cardNumber, amount);
}

function divide(a, b) {
  return a / b;
}

function getFirstItem(items) {
  return items[0].name;
}