import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoListComp } from './todoList';
import { TodoItem } from '../../interfaces/interface';
import { useTodoItem } from '../../hooks/useTodo';

jest.mock('../../hooks/useTodo', () => ({
  useTodoItem: jest.fn(),
}));

const mockTodoItems: TodoItem[] = [
  { id: '1', title: 'Item 1', description: 'Description 1', deadline: new Date().toISOString(), completed: false },
  { id: '2', title: 'Item 2', description: 'Description 2', deadline: new Date().toISOString(), completed: true },
];

const mockTodoLists = [
  { id: 'list1', title: 'List 1' },
  { id: 'list2', title: 'List 2' },
];

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

    expect(screen.getByText('List 2')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('filters items based on search term', async () => {
    render(<TodoListComp lists={mockTodoLists} />);

    const searchInput = screen.getByPlaceholderText('Search');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'Item 1' } });

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });
  });

  test('toggles todo items correctly', () => {
    render(<TodoListComp lists={mockTodoLists} />);

    const checkbox = screen.getAllByRole('checkbox')[0];

    fireEvent.click(checkbox);

    expect(mockUseTodoItem.updateItemMutation.mutate).toHaveBeenCalledWith(
      { listId: 'list2', itemId: '1', completed: true },
      expect.anything()
    );
  });

  test('deletes an item correctly', () => {
    render(<TodoListComp lists={mockTodoLists} />);

    const deleteLink = screen.getAllByText('Delete')[0];

    fireEvent.click(deleteLink);

    expect(mockUseTodoItem.deleteItemMutation.mutate).toHaveBeenCalledWith({
      listId: 'list2',
      itemId: '1',
    });
  });

  test('filters items based on completion status', async () => {
    render(<TodoListComp lists={mockTodoLists} />);

    const filterSelect = screen.getByLabelText('Select Type:');

    fireEvent.change(filterSelect, { target: { value: 'done' } });

    await waitFor(() => {
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    fireEvent.change(filterSelect, { target: { value: 'onGoing' } });

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });
  });
});
