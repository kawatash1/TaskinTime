import React, { useState } from 'react';

const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
// const backendUrl = "https://taskin-time-backend.onrender.com";
console.log(backendUrl);
const apiUrl = `${backendUrl}/api`;
console.log(apiUrl);

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('upcoming'); // Категория по умолчанию
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting task:', { title, description, category }); // Логируем данные
    setLoading(true);
    try {
        const response = await fetch(`${apiUrl}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, category }),
        });
        if (!response.ok) throw new Error('Failed to create task');

        const newTask = await response.json();
        console.log('Task created:', newTask); // Логируем ответ сервера
        if (onSubmit) {
            onSubmit(newTask);
        }
        setTitle('');
        setDescription('');
        setCategory('upcoming');
    } catch (error) {
        console.error('Error creating task:', error);
    } finally {
        setLoading(false);
    }
};

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        className='inputArea'
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className='textArea'
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      
      <button 
      className='btn'
      type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;