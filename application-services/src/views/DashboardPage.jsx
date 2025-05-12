import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { ExchangeRates, CurrencyConverter, FeedbackForm, TransactionLog, TransactionCount } from '../components'

export const DashboardPage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const storedMessage = sessionStorage.getItem('message');
    if (storedMessage) {
      setWelcomeMessage(storedMessage);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <header className="welcome-message">{welcomeMessage}</header>
      <main className="dashboard-main">
        <section className="rates-section">
          <h2>Exchange Rates</h2>
          <ExchangeRates />
        </section>

        <section className="converter-section">
          <h2>Currency Converter</h2>
          <CurrencyConverter />
        </section>

        <section className="feedback-section">
          <h2>Feedback</h2>
          <FeedbackForm />
        </section>
      </main>

      <aside className="sidebar">
        <TransactionCount />
        <TransactionLog />
      </aside>
    </div>
  );
};


