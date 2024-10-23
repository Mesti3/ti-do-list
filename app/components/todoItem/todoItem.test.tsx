import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides extra matchers for assertions
import { TodoItemComp } from './todoItem'; // Adjust the import path if necessary
import { TodoItem } from '../../interfaces/interface'; // Adjust import path if necessary

// Mock data for TodoItem
const mockItem: TodoItem = {
  id: '1',
  title: 'Test Todo',
  description: 'This is a test todo item.',
  deadline: new Date().toISOString(),
  completed: false,
};

// Mock functions
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

    // Check if the title is rendered
    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText('This is a test todo item.')).toBeInTheDocument();

    // Check if the deadline is rendered (format could change based on locale)
    const formattedDeadline = new Date(mockItem.deadline).toLocaleString();
    expect(screen.getByText(formattedDeadline)).toBeInTheDocument();

    // Check if the checkbox is rendered and not checked
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

    // Simulate delete link click
    const deleteLink = screen.getByText('Delete');
    fireEvent.click(deleteLink);

    // Expect the handleDeleteItem to have been called with the correct item id
    expect(handleDeleteItem).toHaveBeenCalledWith(mockItem.id);
  });
});
