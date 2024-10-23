import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { TodoItemComp } from './todoItem'; 
import { TodoItem } from '../../interfaces/interface'; 

const mockItem: TodoItem = {
  id: '1',
  title: 'Test Todo',
  description: 'This is a test todo item.',
  deadline: new Date().toISOString(),
  completed: false,
};

const handleItemToggle = jest.fn();
const handleDeleteItem = jest.fn();

describe('TodoItemComp', () => {
  test('renders the todo item correctly', () => {
    render(
      <table>
        <tbody>
          <TodoItemComp
            item={mockItem}
            handleItemToggle={handleItemToggle}
            handleDeleteItem={handleDeleteItem}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    expect(screen.getByText('This is a test todo item.')).toBeInTheDocument();

    const formattedDeadline = new Date(mockItem.deadline).toLocaleString();
    expect(screen.getByText(formattedDeadline)).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('calls handleItemToggle when checkbox is clicked', () => {
    render(
      <table>
        <tbody>
          <TodoItemComp
            item={mockItem}
            handleItemToggle={handleItemToggle}
            handleDeleteItem={handleDeleteItem}
          />
        </tbody>
      </table>
    );

    // Simulate checkbox click
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Expect the handleItemToggle to have been called with the correct arguments
    expect(handleItemToggle).toHaveBeenCalledWith(mockItem.id, mockItem.completed);
  });

  test('calls handleDeleteItem when delete link is clicked', () => {
    render(
      <table>
        <tbody>
          <TodoItemComp
            item={mockItem}
            handleItemToggle={handleItemToggle}
            handleDeleteItem={handleDeleteItem}
          />
        </tbody>
      </table>
    );

    const deleteLink = screen.getByText('Delete');
    fireEvent.click(deleteLink);

    expect(handleDeleteItem).toHaveBeenCalledWith(mockItem.id);
  });
});
