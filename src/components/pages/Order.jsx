import React from "react";
import "./Order.css";

function Order() {
  return (
    <main>
      <h2>Заказ</h2>
      <p>Форма для оформления заказа.</p>

      <form>
        <input type="text" placeholder="Ваше имя" />
        <input type="text" placeholder="Контактный телефон" />
        <textarea placeholder="Описание заказа"></textarea>
        <button type="submit">Отправить заявку</button>
      </form>
    </main>
  );
}

export default Order;
