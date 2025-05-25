import { useState, useEffect } from 'react';

export default function FetchAPIDemo() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const addItem = () => {
    const newItem = { name: newItemName };
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then(res => res.json())
      .then(data => setItems([...items, data]));
    setNewItemName('');
  };

  const deleteItem = id => {
    fetch(`http://localhost:3000/items/${id}`, { method: 'DELETE' })
      .then(() => setItems(items.filter(item => item.id !== id)));
  };

  const updateItem = (id, newName) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    })
      .then(res => res.json())
      .then(updatedItem => setItems(items.map(item => (item.id === id ? updatedItem : item))));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Fetch API Demo</h2>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Xóa</button>
            <button onClick={() => {
              const newName = prompt('Nhập tên mới:', item.name);
              if (newName) updateItem(item.id, newName);
            }}>Sửa</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
          placeholder="Tên mới"
        />
        <button onClick={addItem}>Thêm</button>
      </div>
    </div>
  );
}