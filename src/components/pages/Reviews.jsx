import React, { useState } from "react";
import "./Reviews.css";

const initialReviews = [
  { id: 1, name: "Павел В.", rating: 5, text: "Отличный продавец!" },
  {
    id: 2,
    name: "Светлана",
    rating: 5,
    text: "Спасибо большое, очень довольны",
  },
  { id: 3, name: "Саша Юданов", rating: 5, text: "Советую. Отличный товар." },
];

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || newReview.rating === 0) return;
    setReviews([{ ...newReview, id: Date.now() }, ...reviews]);
    setNewReview({ name: "", text: "", rating: 0 });
    setHoverRating(0);
  };

  return (
    <div className="reviews-container">
      <h1>Отзывы</h1>

      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
        />
        <textarea
          placeholder="Ваш отзыв"
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
        />
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${
                star <= (hoverRating || newReview.rating) ? "filled" : ""
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setNewReview({ ...newReview, rating: star })}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit">Отправить</button>
      </form>

      <div className="reviews-list">
        {reviews.map((r) => (
          <div key={r.id} className="review-card">
            <div className="review-header">
              <strong>{r.name}</strong> ·{" "}
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= r.rating ? "filled" : ""}>
                  ★
                </span>
              ))}
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
