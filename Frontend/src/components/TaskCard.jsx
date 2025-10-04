import React from 'react';
import '../css/TaskCard.css';

function TaskCard({ task, onComplete, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className="task-card">
      <h3 className="task-title">{task.name}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
        <button onClick={() => onComplete(task.id)} className="btn-done">
          Done
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;