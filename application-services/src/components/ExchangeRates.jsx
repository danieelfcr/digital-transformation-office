import React, { useEffect, useState } from 'react';
import currencyData from '../data/codes-all.json';
import './ExchangeRates.css';

export const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ratesPerPage = 9;

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

  const currencyNames = Object.fromEntries(
    currencyData.map(item => [item.AlphabeticCode, item.Currency])
  );

  const filteredRates = rates.filter(r =>
    r.code.toUpperCase().includes(search.toUpperCase())
  );

  //Pagination
  const totalPages = Math.ceil(filteredRates.length / ratesPerPage);
  const startIndex = (currentPage - 1) * ratesPerPage;
  const currentRates = filteredRates.slice(startIndex, startIndex + ratesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //Restart if user searches smth
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
        <>
          <div className="rates-grid">
            {currentRates.map(r => (
              <div key={r.code} className="rate-card">
                <strong>US Dollar/{currencyNames[r.code] || r.code}:</strong> {r.rate.toFixed(2)}
                <div className="rate-date">Last updated: {lastUpdate}</div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
