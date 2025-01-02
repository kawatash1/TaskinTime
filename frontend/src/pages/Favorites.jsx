import React from 'react';
import TaskList from '../components/Tasks/taskList';

const Favorites = () => {
  return (
    <div className="content">
      <h2>Favorite Tasks</h2>
      <p>Here you can view all favorite tasks.</p>
      <TaskList category="favorites" />
    </div>
  );
};

export default Favorites;