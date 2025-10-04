import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskCard from '../components/TaskCard'

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    name: 'Buy groceries',
    description: 'Get milk and eggs'
  }

  test('should show task name and description', () => {
    render(<TaskCard task={mockTask} onComplete={() => {}} onDelete={() => {}} />)
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(screen.getByText('Get milk and eggs')).toBeInTheDocument()
  })

  test('should call onComplete when Done button clicked', () => {
    const mockComplete = jest.fn()
    render(<TaskCard task={mockTask} onComplete={mockComplete} onDelete={() => {}} />)
    
    const doneBtn = screen.getByText('Done')
    fireEvent.click(doneBtn)
    
    expect(mockComplete).toHaveBeenCalledWith(1)
  })

  test('should show confirmation before deleting', () => {
    window.confirm = jest.fn(() => true)
    const mockDelete = jest.fn()
    
    render(<TaskCard task={mockTask} onComplete={() => {}} onDelete={mockDelete} />)
    
    const deleteBtn = screen.getByText('Delete')
    fireEvent.click(deleteBtn)
    
    expect(window.confirm).toHaveBeenCalled()
    expect(mockDelete).toHaveBeenCalledWith(1)
  })

  test('should not delete when user cancels', () => {
    window.confirm = jest.fn(() => false)
    const mockDelete = jest.fn()
    
    render(<TaskCard task={mockTask} onComplete={() => {}} onDelete={mockDelete} />)
    
    fireEvent.click(screen.getByText('Delete'))
    
    expect(mockDelete).not.toHaveBeenCalled()
  })
})