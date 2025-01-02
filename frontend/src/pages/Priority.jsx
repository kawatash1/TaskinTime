import React from 'react';
import TaskList from '../components/Tasks/taskList';

const Priority = () => {
  return (
    <div className="content">
      <h2>Priority Tasks</h2>
      <p>Here you can view all priority tasks.</p>
      <TaskList category="priority" />
    </div>
  );
};

export default Priority;