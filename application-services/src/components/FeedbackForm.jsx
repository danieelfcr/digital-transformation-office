import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

export const FeedbackForm = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5265/api/feedback', {
      comment,
      rating,
      userId: sessionStorage.getItem('id')
    });
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Your comments..."
        required
      />
      <label>Rating:
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
        </select>
      </label>
      <button type="submit">Submit Feedback</button>
      {submitted && <p className="confirmation">Thank you for your feedback!</p>}
    </form>
  );
};
