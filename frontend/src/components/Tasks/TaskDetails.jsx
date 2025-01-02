import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById, deleteTask } from '../../redux/services/taskService';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await fetchTaskById(id);
        setTask(data);
      } catch (error) {
        console.error('Error loading task:', error);
      }
    };
    loadTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      alert('Task deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  return task ? (
    <div className="content">
      <div className="taskDetails">
        <h2>{task.title}</h2>
        <p>{task.description || 'No description provided'}</p>
        <p>Category: {task.category}</p>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete Task</button>
      </div>
    </div>
  ) : (
    <p>Loading task...</p>
  );
};

export default TaskDetails;