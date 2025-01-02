import React from 'react';
import TaskList from '../components/Tasks/taskList';

const Future = () => {
  return (
    <div className="content">
      <h2>Future Tasks</h2>
      <p>Here you can view all future tasks.</p>
      <TaskList category="upcoming" />
    </div>
  );
};

export default Future;