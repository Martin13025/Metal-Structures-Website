import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => setError("Ошибка загрузки отзывов"))
      .finally(() => setLoading(false));
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !text.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });

      if (!res.ok) throw new Error();

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);

      setName("");
      setText("");
    } catch {
      setError("Не удалось добавить отзыв");
    }
  };

  return (
    <div className="reviews">
      <form onSubmit={submitReview}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Ваш отзыв"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>

      {loading && <p>Загрузка отзывов…</p>}
      {error && <p>{error}</p>}

      {reviews.map((rev) => (
        <div className="review" key={rev.id}>
          <strong>{rev.name}</strong>
          <p>{rev.text}</p>
          {rev.created_at && (
            <small>{new Date(rev.created_at).toLocaleDateString()}</small>
          )}
        </div>
      ))}
    </div>
  );
}
