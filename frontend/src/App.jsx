import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  const addItem = async () => {
    if (!newItem) return;
    const res = await axios.post(API_URL, { name: newItem });
    setItems([...items, res.data]);
    setNewItem('');
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  const updateItem = async (id) => {
    const name = prompt("Update item name:");
    if (!name) return;
    const res = await axios.put(`${API_URL}/${id}`, { name });
    setItems(items.map(item => (item._id === id ? res.data : item)));
  };

  return (
    <div className="App">
      <h1>Simple CRUD with Mongoose, React, and Vite</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
            <button onClick={() => updateItem(item._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

