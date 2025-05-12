import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TransactionCount = ({ userId }) => {
  const [transactionCount, setTransactionCount] = useState(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5265/api/transaction/count-today/${userId}`)
        .then((response) => {
          setTransactionCount(response.data.message);
        })
        .catch((error) => {
          console.error('Error fetching transaction count:', error);
        });
    }
  }, [userId]);

  return (
    <div className="transaction-count">
      {transactionCount ? (
        <p>{transactionCount}</p>
      ) : (
        <p>Loading transaction count...</p>
      )}
    </div>
  );
};


