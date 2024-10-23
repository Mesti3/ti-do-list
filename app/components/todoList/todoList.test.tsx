import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoListComp } from './todoList';
import { TodoItem } from '../../interfaces/interface';
import { useTodoItem } from '../../hooks/useTodo';

// Mock the `useTodoItem` hook
jest.mock('../../hooks/useTodo', () => ({
  useTodoItem: jest.fn(),
}));

// Mock data for TodoItem and TodoList
const mockTodoItems: TodoItem[] = [
  { id: '1', title: 'Item 1', description: 'Description 1', deadline: new Date().toISOString(), completed: false },
  { id: '2', title: 'Item 2', description: 'Description 2', deadline: new Date().toISOString(), completed: true },
];

const mockTodoLists = [
  { id: 'list1', title: 'List 1' },
  { id: 'list2', title: 'List 2' },
];

// Mock implementation of `useTodoItem`
const mockUseTodoItem = {
  deleteItemMutation: { mutate: jest.fn() },
  updateItemMutation: { mutate: jest.fn() },
  todoItems: mockTodoItems,
};

describe('TodoListComp', () => {
  beforeEach(() => {
    (useTodoItem as jest.Mock).mockReturnValue(mockUseTodoItem);
  });

  test('renders todo lists and items correctly', () => {
    render(<TodoListComp lists={mockTodoLists} />);

    // Check if the correct list is selected and displayed
    expect(screen.getByText('List 2')).toBeInTheDocument();

    // Check that the search input is present
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    // Check that the TodoItemComp items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('filters items based on search term', async () => {
    render(<TodoListComp lists={mockTodoLists} />);

    const searchInput = screen.getByPlaceholderText('Search');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'Item 1' } });

    await waitFor(() => {
      // Item 1 should be visible
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      // Item 2 should not be visible
      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });
  });

  test('toggles todo items correctly', () => {
    render(<TodoListComp lists={mockTodoLists} />);

    // Find the checkbox for the first item
    const checkbox = screen.getAllByRole('checkbox')[0];

    // Simulate clicking the checkbox to toggle the item
    fireEvent.click(checkbox);

    // Check that the toggle mutation was called with the correct arguments
    expect(mockUseTodoItem.updateItemMutation.mutate).toHaveBeenCalledWith(
      { listId: 'list2', itemId: '1', completed: true },
      expect.anything()
    );
  });

  test('deletes an item correctly', () => {
    render(<TodoListComp lists={mockTodoLists} />);

    // Find the delete link for the first item
    const deleteLink = screen.getAllByText('Delete')[0];

    // Simulate clicking the delete link
    fireEvent.click(deleteLink);

    // Check that the delete mutation was called with the correct arguments
    expect(mockUseTodoItem.deleteItemMutation.mutate).toHaveBeenCalledWith({
      listId: 'list2',
      itemId: '1',
    });
  });

  test('filters items based on completion status', async () => {
    render(<TodoListComp lists={mockTodoLists} />);

    // Find the filter select element
    const filterSelect = screen.getByLabelText('Select Type:');

    // Change the filter to "done"
    fireEvent.change(filterSelect, { target: { value: 'done' } });

    await waitFor(() => {
      // Only the completed item should be visible
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    // Change the filter to "onGoing"
    fireEvent.change(filterSelect, { target: { value: 'onGoing' } });

    await waitFor(() => {
      // Only the ongoing (incomplete) item should be visible
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });
  });
});
