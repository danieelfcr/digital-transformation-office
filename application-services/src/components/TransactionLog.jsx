import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem('id')

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:5265/api/transaction/recent/${userId}`);
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  if (loading) return <p>Loading recent transactions...</p>;
  if (error) return <p>Error: {error}</p>;
  if (transactions.length === 0) return <p>No recent transactions found.</p>;

  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index} className="transaction-item">
            <strong>{tx.username}</strong> exchanged <strong>{tx.sourceCurrency}</strong> to <strong>{tx.destinationCurrency}</strong> at rate <strong>{tx.exchangeRate}</strong> on{' '}
            <em>{new Date(tx.dateTime).toLocaleString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

