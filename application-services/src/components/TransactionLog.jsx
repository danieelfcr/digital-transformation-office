import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TransactionLog = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5265/api/transaction/recent/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTransactions(response.data);
          } else {
            setTransactions([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching transaction log:', error);
        });
    }
  }, [userId]);

  return (
    <div className="transaction-log">
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <p>{transaction.Username} converted {transaction.SourceCurrency} to {transaction.DestinationCurrency} at a rate of {transaction.ExchangeRate} on {new Date(transaction.DateTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent transactions.</p>
      )}
    </div>
  );
};

