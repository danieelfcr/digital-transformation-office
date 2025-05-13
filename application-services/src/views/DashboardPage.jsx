import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import {
  ExchangeRates,
  CurrencyConverter,
  FeedbackForm,
  TransactionLog,
  TransactionCount,
  WelcomeMessage,
} from '../components';

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
      <header className="welcome-message">
        <WelcomeMessage />
      </header>

      <main className="dashboard-grid">
        <section className="rates-section">
          <h2>Exchange Rates</h2>
          <ExchangeRates />
        </section>

        <section className="converter-section">
          <h2>Currency Converter</h2>
          <CurrencyConverter />
        </section>

        <section className="bottom-section">
          <div className="feedback-container">
            <h2>Feedback</h2>
            <FeedbackForm />
          </div>

          <div className="transactions-container">
            <TransactionCount />
            <TransactionLog />
          </div>
        </section>
      </main>
    </div>
  );
};
