import React, { useState } from 'react';
import '../css/TaskForm.css';

const API_BASE_URL = "http://localhost:8080";

function TaskForm({ onTaskAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!name || !description) {
      alert('Please fill in both fields');
      return;
    }

    console.log('API_BASE_URL:', API_BASE_URL); 
    console.log('Sending request to:', `${API_BASE_URL}/tasks`); 

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name, 
          description: description 
        }),
      });

      console.log('Response status:', response.status); 

      if (response.ok) {
        setName('');
        setDescription('');
        onTaskAdded();
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    }
  };

  return (
    <div className="task-form-container">
      <h2 className="form-title">Add a Task</h2>

      <div className="form-group">
        <label htmlFor="name" className="form-label">Title</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="form-button"
        disabled={!name || !description}
      >
        Add
      </button>
    </div>
  );
}

export default TaskForm;