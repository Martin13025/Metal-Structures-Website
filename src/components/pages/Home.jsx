import React from "react";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>ANDI Pro Market</h1>
        <p className="subtitle">
          Изготовление металлоконструкций и металлоизделий
        </p>

        <div className="rating">
          <strong>5,0</strong>
          <span>27 отзывов</span>
        </div>

        <div className="meta">
          <span>15 подписчиков</span>
          <span>3 подписки</span>
        </div>

        <div className="checks">
          <span>Компания проверена</span>
          <span>Реквизиты проверены</span>
          <span>Телефон подтверждён</span>
        </div>
      </section>

      <section className="schedule">
        <h3>Режим работы</h3>
        <ul>
          <li>Понедельник – Пятница: 09:30–17:30</li>
          <li>Суббота: Закрыто</li>
          <li>Воскресенье: Закрыто</li>
        </ul>
      </section>

      <section className="gallery">
        <img src="/images/obuvnica.jpg" alt="Obuvnica" />
        <img src="/images/veshalka.jpg" alt="Veshalka" />
        <img src="/images/work1.jpg" alt="Работа 1" />
        <img src="/images/work2.jpg" alt="Работа 2" />
        <img src="/images/work3.jpg" alt="Работа 3" />
      </section>
    </main>
  );
}

export default Home;
