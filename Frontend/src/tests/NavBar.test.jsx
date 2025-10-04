import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../components/NavBar'

describe('Navbar Component', () => {
  test('should display stats', () => {
    render(
      <Navbar 
        totalTasks={10} 
        completedTasks={5} 
        notCompletedTasks={3}
        onReset={() => {}}
      />
    )
    
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('should show zeros when undefined', () => {
    render(<Navbar onReset={() => {}} />)
    
    const zeros = screen.getAllByText('0')
    expect(zeros.length).toBe(3)
  })

  test('should display labels', () => {
    render(<Navbar totalTasks={5} onReset={() => {}} />)
    
    expect(screen.getByText('Total Tasks Created')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Deleted')).toBeInTheDocument()
  })

  test('should ask confirmation before reset', () => {
    window.confirm = jest.fn(() => false)
    const mockReset = jest.fn()
    
    render(<Navbar totalTasks={5} onReset={mockReset} />)
    
    fireEvent.click(screen.getByText('Start Fresh'))
    
    expect(window.confirm).toHaveBeenCalled()
    expect(mockReset).not.toHaveBeenCalled()
  })

  test('should reset when confirmed', () => {
    window.confirm = jest.fn(() => true)
    const mockReset = jest.fn()
    
    render(<Navbar totalTasks={5} onReset={mockReset} />)
    
    fireEvent.click(screen.getByText('Start Fresh'))
    
    expect(mockReset).toHaveBeenCalled()
  })
})