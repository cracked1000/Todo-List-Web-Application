import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskForm from '../components/TaskForm'

global.fetch = jest.fn()

describe('TaskForm Component', () => {
  beforeEach(() => {
    fetch.mockClear()
    jest.clearAllMocks()
  })

  test('should render form inputs', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  test('should disable button when empty', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const addBtn = screen.getByText('Add')
    expect(addBtn).toBeDisabled()
  })

  test('should enable button when filled', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const titleInput = screen.getByLabelText('Title')
    const descInput = screen.getByLabelText('Description')
    
    fireEvent.change(titleInput, { target: { value: 'Test' } })
    fireEvent.change(descInput, { target: { value: 'Test desc' } })
    
    const addBtn = screen.getByText('Add')
    expect(addBtn).not.toBeDisabled()
  })

  test('should submit form successfully', async () => {
    const mockOnTaskAdded = jest.fn()
    fetch.mockResolvedValueOnce({ ok: true })
    
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />)
    
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Task' } })
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Details' } })
    fireEvent.click(screen.getByText('Add'))
    
    await waitFor(() => {
      expect(mockOnTaskAdded).toHaveBeenCalled()
    })
  })

  test('should clear form after submit', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const titleInput = screen.getByLabelText('Title')
    const descInput = screen.getByLabelText('Description')
    
    fireEvent.change(titleInput, { target: { value: 'Test' } })
    fireEvent.change(descInput, { target: { value: 'Test desc' } })
    fireEvent.click(screen.getByText('Add'))
    
    await waitFor(() => {
      expect(titleInput.value).toBe('')
      expect(descInput.value).toBe('')
    })
  })
})