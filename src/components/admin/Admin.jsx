import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditProductData({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleEditChange = (e) => {
    setEditProductData({ ...editProductData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/products/${editProductId}`,
        editProductData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Удалить продукт?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Пользователи</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}) - {u.role}
          </li>
        ))}
      </ul>

      <h2>Продукты</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {editProductId === p.id ? (
              <div>
                <input
                  name="name"
                  value={editProductData.name}
                  onChange={handleEditChange}
                />
                <input
                  name="description"
                  value={editProductData.description}
                  onChange={handleEditChange}
                />
                <input
                  name="price"
                  value={editProductData.price}
                  onChange={handleEditChange}
                />
                <button onClick={handleEditSave}>Сохранить</button>
                <button onClick={() => setEditProductId(null)}>Отмена</button>
              </div>
            ) : (
              <div>
                <img src={p.image} alt={p.name} width={80} />
                {p.name} - {p.description} - ${p.price}{" "}
                <button onClick={() => handleEditClick(p)}>
                  Редактировать
                </button>
                <button onClick={() => handleDeleteProduct(p.id)}>
                  Удалить
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
