import React, { useState } from 'react';
import './CurrencyConverter.css';
import axios from 'axios';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [destinationCurrency, setDestinationCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  const userId = sessionStorage.getItem('id')

  const handleConversion = () => {
    if (amount && destinationCurrency) {
      const apiKey = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
      axios
        .get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${sourceCurrency}`)
        .then((response) => {
          if (response.data.result === 'success') {
            const rate = response.data.conversion_rates[destinationCurrency];
            if (rate) {
              const result = amount * rate;
              setConvertedAmount(result);
              setExchangeRate(rate);


              axios
                .post('http://localhost:5265/api/transaction', {
                  userId,
                  sourceCurrency,
                  destinationCurrency,
                  exchangeRateUsed: rate,
                })
                .then(() => {
                  console.log('Transaction recorded successfully');
                })
                .catch((error) => {
                  console.error('Error recording transaction:', error);
                });
            } else {
              setError('Destination currency is not available.');
            }
          } else {
            setError('Failed to fetch exchange rates.');
          }
        })
        .catch((error) => {
          console.error('Error fetching exchange rate:', error);
          setError('Error fetching exchange rate.');
        });
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div>
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div>
        <label>From: </label>
        <select
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>

        </select>
      </div>
      <div>
        <label>To: </label>
        <input
          type="text"
          value={destinationCurrency}
          onChange={(e) => setDestinationCurrency(e.target.value)}
          placeholder="Enter destination currency"
        />
      </div>
      <button onClick={handleConversion}>Convert</button>
      {error && <p className="error">{error}</p>}
        {convertedAmount !== null && (
        <div className="result">
            <p>
            {amount} {sourceCurrency} = {convertedAmount.toFixed(2)} {destinationCurrency}
            </p>
            <p>Exchange Rate: {exchangeRate}</p>
        </div>
        )}
    </div>
  );
};

