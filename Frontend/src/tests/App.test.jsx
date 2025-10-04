import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

global.fetch = jest.fn()

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('should load tasks on mount', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: 'Task 1', description: 'Desc 1' }]
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ totalTasks: 1, completedTasks: 0, notCompletedTasks: 0 })
      })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })
  })

  test('should show empty message', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ 
        ok: true, 
        json: async () => ({ totalTasks: 0, completedTasks: 0, notCompletedTasks: 0 }) 
      })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('No tasks yet. Add one!')).toBeInTheDocument()
    })
  })

  test('should display stats', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ 
        ok: true, 
        json: async () => ({ totalTasks: 5, completedTasks: 2, notCompletedTasks: 1 }) 
      })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  test('should complete task', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: 'Task 1', description: 'Desc' }]
      })
      .mockResolvedValueOnce({ 
        ok: true, 
        json: async () => ({ totalTasks: 1, completedTasks: 0, notCompletedTasks: 0 }) 
      })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ 
        ok: true, 
        json: async () => ({ totalTasks: 1, completedTasks: 1, notCompletedTasks: 0 }) 
      })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Done'))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/tasks/complete/1',
        { method: 'PUT' }
      )
    })
  })

  test('should delete task', async () => {
    window.confirm = jest.fn(() => true)
    
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: 'Task 1', description: 'Desc' }]
      })
      .mockResolvedValueOnce({ 
        ok: true, 
        json: async () => ({ totalTasks: 1, completedTasks: 0, notCompletedTasks: 0 }) 
      })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ 
        ok: true, 
        json: async () => ({ totalTasks: 1, completedTasks: 0, notCompletedTasks: 1 }) 
      })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Delete'))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/tasks/1',
        { method: 'DELETE' }
      )
    })
  })
})