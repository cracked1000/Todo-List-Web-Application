import React, { useState, useEffect } from 'react';
import Navbar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_BASE_URL = "http://localhost:8080";

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    notCompletedTasks: 0,
  });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };


  const handleTaskComplete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}/complete`, { method: 'PUT' });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };


  const handleTaskDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const handleTaskUpdate = async (updatedTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks(tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ));
      } else {
        console.error('Failed to update task');
        alert('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task');
    }
  };

  const handleTaskAdded = () => {
    fetchTasks();
    fetchStats();
  };

  const handleResetStats = async () => {
    try {
      await fetch(`${API_BASE_URL}/tasks/stats/reset`, { method: 'POST' });
      fetchStats();
    } catch (error) {
      console.error('Error resetting stats:', error);
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar
        totalTasks={stats.totalTasks}
        completedTasks={stats.completedTasks}
        notCompletedTasks={stats.notCompletedTasks}
        onReset={handleResetStats}
      />
      <div className="app-container">
        <TaskForm onTaskAdded={handleTaskAdded} />

        <div className="tasks-section">
          <h2>Recent Tasks</h2>
          <TaskList
            tasks={tasks}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
            onTaskUpdate={handleTaskUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
