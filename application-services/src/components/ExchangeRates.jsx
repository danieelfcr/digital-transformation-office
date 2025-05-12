import React, { useEffect, useState } from 'react';
import './ExchangeRates.css';

const currencyNames = {
  USD: 'United States Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',

};

export const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
    const apiKey = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
      .then(res => res.json())
      .then(data => {
        const entries = Object.entries(data.conversion_rates).map(([code, rate]) => ({
          code,
          rate,
        }));
        setRates(entries);
        setLastUpdate(data.time_last_update_utc);
      });
  }, []);

  const filteredRates = rates.filter(r =>
    r.code.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search currency code..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      {filteredRates.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="rates-grid">
          {filteredRates.map(r => (
            <div key={r.code} className="rate-card">
              <strong>USD/{r.code}:</strong> {r.rate.toFixed(2)}
              <div className="rate-name">({currencyNames[r.code] || r.code})</div>
              <div className="rate-date">Last updated: {lastUpdate}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
