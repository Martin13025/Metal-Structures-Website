import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>О компании ANDI Pro Market</h1>
      <div className="about-info">
        <p>Рейтинг: 5,0 (27 отзывов)</p>
        <p>Подписчики: 15 | Подписки: 3</p>
        <p>На Авито с ноября 2020</p>
        <p>Компания проверена | Реквизиты проверены | Телефон подтверждён</p>
      </div>

      <div className="about-description">
        <h2>Изготовление металлоконструкций и металлоизделий</h2>
        <p>Металлоизделия и металлоконструкции на заказ</p>
        <ul>
          <li>
            ⚙ Изготовим изделия из металла любой сложности и любого объема по
            вашим образцам и чертежам. Сварочные работы.
          </li>
          <li>
            ⚙ Все заказы по изготовлению нестандартных металлоконструкций
            выполняются по заданному графику.
          </li>
          <li>✔ Гарантируем выполнение сложных заказов в срок.</li>
          <li>✔ Собственное современное производство.</li>
          <li>
            ✔ Каждый расчет индивидуален, эффект масштаба действует: чем больше
            партия, тем ниже цена.
          </li>
        </ul>
        <p>
          ☎ Телефон: <a href="tel:+79330221632">+7 933 022-16-32</a>
        </p>
      </div>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <a
          href="https://yandex.ru/maps/44/izhevsk/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: 0,
          }}
        >
          Ижевск
        </a>
        <a
          href="https://yandex.ru/maps/44/izhevsk/geo/ulitsa_timiryazeva/11037713/?ll=53.239365%2C56.867793&utm_medium=mapframe&utm_source=maps&z=17.84"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "14px",
          }}
        >
          Улица Тимирязева — Яндекс Карты
        </a>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=53.239365%2C56.867793&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCggxMTAzNzcxMxJm0KDQvtGB0YHQuNGPLCDQo9C00LzRg9GA0YLRgdC60LDRjyDQoNC10YHQv9GD0LHQu9C40LrQsCwg0JjQttC10LLRgdC6LCDRg9C70LjRhtCwINCi0LjQvNC40YDRj9C30LXQstCwIgoNG_VUQhWaeGNC&z=17.84"
          width="100%"
          height="400"
          frameBorder="1"
          allowFullScreen={true}
          style={{ position: "relative", borderRadius: "8px" }}
          title="Яндекс Карта"
        ></iframe>
      </div>
    </div>
  );
}

export default About;
