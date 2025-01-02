import React from 'react';
import TaskList from '../components/Tasks/taskList';

const Completed = () => {
  return (
    <div className="content">
      <h2>Completed Tasks</h2>
      <p>Here you can view all completed tasks.</p>
      <TaskList category="completed" />
    </div>
  );
};

export default Completed;