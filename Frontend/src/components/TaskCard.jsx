import React, { useState } from 'react';
import '../css/TaskCard.css';

function TaskCard({ task, onComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleSaveEdit = () => {
    if (editedName.trim()) {
      onUpdate({
        ...task,
        name: editedName.trim(),
        description: editedDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedName(task.name);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          className="edit-input"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Task name"
          autoFocus
        />
        <textarea
          className="edit-textarea"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Description (optional)"
          rows="3"
        />
        <div className="task-actions">
          <button onClick={handleSaveEdit} className="btn-save">
            Save
          </button>
          <button onClick={handleCancelEdit} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <h3 className="task-title">{task.name}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
        <button onClick={() => onComplete(task.id)} className="btn-done">
          Done
        </button>
        <button onClick={() => setIsEditing(true)} className="btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;