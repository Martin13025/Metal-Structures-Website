import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/Logo.webp";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-container">
          <img
            src={logo}
            alt="Логотип"
            className="logo-img"
            style={{ height: "60px", width: "auto" }}
          />
          <span className="logo-text">ANDI Pro Market</span>
        </div>

        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/about">О нас</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/order">Заказ</Link>
          <Link to="/portfolio">Портфолио</Link>
          <Link to="/reviews">Отзывы</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
        <nav className="nav">
          <a href="/">Главная</a>
          <a href="/login">Войти</a>
          <a href="/register">Регистрация</a>
        </nav>

        <p className="call-btn">+7 (933) 022-16-32</p>
      </div>
    </header>
  );
}

export default Header;
