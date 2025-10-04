import React from 'react';
import TaskCard from './TaskCard';
import '../css/TaskList.css';

function TaskList({ tasks, onTaskComplete, onTaskDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty-message">
        No tasks yet. Add one!
      </p>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onComplete={onTaskComplete}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;