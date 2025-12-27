import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import Catalog from "./components/pages/Catalog";
import About from "./components/pages/About";
import Order from "./components/pages/Order";
import Portfolio from "./components/pages/Portfolio";
import Reviews from "./components/pages/Reviews";
import Contacts from "./components/pages/Contacts";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/order" element={<Order />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
