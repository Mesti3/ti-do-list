import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreateTodoForm } from './createToDo';
import { useTodoItem, useTodoList } from '../../hooks/useTodo';
import React from 'react';

// Mock the hooks
jest.mock('../../hooks/useTodo');

const mockUseTodoItem = useTodoItem as jest.Mock;
const mockUseTodoList = useTodoList as jest.Mock;

describe('CreateTodoForm', () => {
  const mockCreateItemMutation = {
    mutate: jest.fn(),
    isSuccess: false,
  };

  const mockCreateListMutation = {
    mutate: jest.fn(),
    isSuccess: false,
  };

  beforeEach(() => {
    mockUseTodoItem.mockReturnValue({
      createItemMutation: mockCreateItemMutation,
    });

    mockUseTodoList.mockReturnValue({
      createListMutation: mockCreateListMutation,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const sampleLists = [
    { id: '1', title: 'List 1' },
    { id: '2', title: 'List 2' },
  ];

  it('renders the CreateTodoForm component', () => {
    render(<CreateTodoForm lists={sampleLists} />);

    // Assert the title and form input elements exist
    expect(screen.getByText('Create a New List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('List Title')).toBeInTheDocument();
    expect(screen.getByText('Create a New Item')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item Title')).toBeInTheDocument();
  });

  it('validates form and shows error when submitting empty item form', async () => {
    render(<CreateTodoForm lists={sampleLists} />);

    // Click submit without filling in the form
    fireEvent.click(screen.getByText('Save Item'));

    // Assert validation error message
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
  });

  it('calls createItemMutation when submitting a valid todo item', async () => {
    render(<CreateTodoForm lists={sampleLists} />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Item Title'), {
      target: { value: 'New Task' },
    });

    fireEvent.change(screen.getByPlaceholderText('Item Description'), {
      target: { value: 'A description for the task' },
    });

    fireEvent.change(screen.getByPlaceholderText('Item Title'), {
      target: { value: 'New Task' },
    });

    fireEvent.click(screen.getByText('Save Item'));

    // Wait for the mutation to be called
    await waitFor(() =>
      expect(mockCreateItemMutation.mutate).toHaveBeenCalledWith({
        listId: sampleLists[1].id, // '2' is the default selectedListId
        data: {
          title: 'New Task',
          description: 'A description for the task',
          deadline: '',
          completed: false,
        },
      })
    );
  });

  it('calls createListMutation when submitting a valid todo list', async () => {
    render(<CreateTodoForm lists={sampleLists} />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('List Title'), {
      target: { value: 'New List' },
    });

    fireEvent.click(screen.getByText('Save List'));

    // Wait for the list mutation to be called
    await waitFor(() =>
      expect(mockCreateListMutation.mutate).toHaveBeenCalledWith('New List', expect.anything())
    );
  });

});
