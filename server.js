const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve an HTML form for user input
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint to handle form submission and transaction detection
app.post('/detect-fraud', (req, res) => {
  const { transactionAmount, frequency } = req.body;

  // Convert input values to numbers
  const amount = parseFloat(transactionAmount);
  const freq = parseInt(frequency);

  // Validate input
  if (isNaN(amount) || isNaN(freq)) {
    return res.status(400).json({ error: 'Invalid input. Please enter valid numbers.' });
  }

  // Implement your simplified fraud detection logic here
  const isFraudulent = detectFraud(amount, freq);

  // Return JSON response
  res.json({
    amount,
    frequency: freq,
    isFraudulent,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Simplified function to detect fraud (adjust the logic as needed)
function detectFraud(amount, frequency) {
  // Check if the transaction amount is significantly higher than a threshold
  const isAmountFraudulent = amount > 1000; 
  // Check if the frequency of transactions is suspiciously high
  const isFrequencyFraudulent = frequency > 10;

  // Combine the fraud detection results
  return isAmountFraudulent || isFrequencyFraudulent;
}
