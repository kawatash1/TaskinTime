import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  updateTask,
  fetchTasksByCategory,
  fetchAllTasks,
  deleteTask, // Импорт функции удаления задачи
} from '../../redux/services/taskService';

const TaskList = ({ category, tasks: parentTasks }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (parentTasks) {
      setTasks(parentTasks);
    } else {
      const loadTasks = async () => {
        try {
          const data =
            category === 'all' || !category
              ? await fetchAllTasks()
              : await fetchTasksByCategory(category);
          setTasks(data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      loadTasks();
    }
  }, [category, parentTasks]);

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleIconClick = async (taskId, icon) => {
    if (icon === '🗑️') {
      // Обработка удаления задачи
      try {
        await deleteTask(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        console.log(`Task ${taskId} deleted successfully`);
      } catch (error) {
        console.error(`Failed to delete task ${taskId}:`, error);
      }
      return;
    }

    let newCategory;
    switch (icon) {
      case '⏲️':
        newCategory = 'upcoming';
        break;
      case '🚚':
        newCategory = 'priority';
        break;
      case '📋':
        newCategory = 'completed';
        break;
      case '❤️':
        newCategory = 'favorites';
        break;
      default:
        console.log(`Unknown icon "${icon}" clicked`);
        return;
    }

    try {
      const updatedTask = await updateTask(taskId, { category: newCategory });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, category: updatedTask.category } : task
        )
      );
      console.log(`Task ${taskId} updated to category: ${newCategory}`);
    } catch (error) {
      console.error(`Failed to update task ${taskId}:`, error);
    }
  };

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div className="task" key={task._id}>
            <h3 className="task-title" onClick={() => handleTaskClick(task._id)}>
              {task.title}
            </h3>
            <p>{task.description || 'No description provided'}</p>
            <p>Category: {task.category}</p>
            <div className="task-icons">
              {['⏲️', '🚚', '📋', '❤️', '🗑️'].map((icon) => (
                <span key={icon} onClick={() => handleIconClick(task._id, icon)}>
                  {icon}
                </span>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;