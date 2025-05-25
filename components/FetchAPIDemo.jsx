import { useState, useEffect } from 'react';

export default function FetchAPIDemo() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3001/todos';

  // Fetch all todos
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          completed: false
        })
      });
      
      if (!response.ok) throw new Error('Failed to add todo');
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTitle('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Set todo for editing
  const startEditing = (todo) => {
    setEditingTodo({ ...todo });
  };

  // Update a todo
  const updateTodo = async (e) => {
    e.preventDefault();
    if (!editingTodo || !editingTodo.title.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/${editingTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingTodo)
      });
      
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      
      setTodos(todos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      ));
      setEditingTodo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle todo completion status
  const toggleComplete = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !todo.completed
        })
      });
      
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      
      setTodos(todos.map(t => 
        t.id === updatedTodo.id ? updatedTodo : t
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Search todos
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Fetch API with JSON Server</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
          <button 
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            &times;
          </button>
        </div>
      )}
      
      {/* Search Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!newTitle.trim()}
        >
          Add
        </button>
      </form>
      
      {/* Edit Todo Form */}
      {editingTodo && (
        <form onSubmit={updateTodo} className="mb-4 p-3 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">Edit Todo</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={editingTodo.title}
              onChange={(e) => setEditingTodo({...editingTodo, title: e.target.value})}
              className="flex-grow p-2 border rounded"
            />
            <button 
              type="submit" 
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button 
              type="button" 
              onClick={() => setEditingTodo(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {/* Todo List */}
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <ul className="border rounded divide-y">
          {filteredTodos.length === 0 ? (
            <li className="p-3 text-center text-gray-500">No todos found</li>
          ) : (
            filteredTodos.map(todo => (
              <li 
                key={todo.id} 
                className="p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                    className="h-5 w-5"
                  />
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.title}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => startEditing(todo)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    disabled={editingTodo !== null}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
      
      <button 
        onClick={fetchTodos} 
        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
      >
        Refresh Todos
      </button>
    </div>
  );
}