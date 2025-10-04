import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskList from '../components/TaskList'

describe('TaskList Component', () => {
  test('should show empty message when no tasks', () => {
    render(<TaskList tasks={[]} onTaskComplete={() => {}} onTaskDelete={() => {}} />)
    
    expect(screen.getByText('No tasks yet. Add one!')).toBeInTheDocument()
  })

  test('should render all tasks', () => {
    const tasks = [
      { id: 1, name: 'Task 1', description: 'Desc 1' },
      { id: 2, name: 'Task 2', description: 'Desc 2' }
    ]
    
    render(<TaskList tasks={tasks} onTaskComplete={() => {}} onTaskDelete={() => {}} />)
    
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  test('should render correct number of tasks', () => {
    const tasks = [
      { id: 1, name: 'Task 1', description: 'Desc 1' },
      { id: 2, name: 'Task 2', description: 'Desc 2' },
      { id: 3, name: 'Task 3', description: 'Desc 3' }
    ]
    
    render(<TaskList tasks={tasks} onTaskComplete={() => {}} onTaskDelete={() => {}} />)
    
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })
})