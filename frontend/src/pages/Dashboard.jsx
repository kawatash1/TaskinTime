import React, { useEffect, useState } from 'react';
import TaskList from '../components/Tasks/taskList';
import TaskForm from '../components/Tasks/TaskForm.jsx';
import { fetchAllTasks } from '../redux/services/taskService';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false); // Управление видимостью формы
  const [tasks, setTasks] = useState([]); // Локальный список задач

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchAllTasks(); // Загружаем задачи с сервера
        setTasks(data);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []); // Загружаем задачи только один раз при монтировании компонента

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Добавляем новую задачу
    setShowForm(false); // Скрываем форму
  };

  return (
    <div className="content">
      <h2>Dashboard</h2>
      <p>Here you can view all tasks.</p>

      {/* Кнопка управления формой */}
      <button className="btn" onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? 'Cancel' : 'Create Task'}
      </button>

      {/* Форма для создания задачи */}
      {showForm && <TaskForm onSubmit={handleAddTask} />}

      {/* Список задач */}
      <TaskList category="all" tasks={tasks} />
    </div>
  );
};

export default Dashboard;