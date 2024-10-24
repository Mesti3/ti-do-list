import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreateTodoForm } from './createToDo';  // Adjust the import path as needed
import { useTodoItem, useTodoList } from '../../hooks/useTodo';

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

  it('renders the form inputs and buttons correctly', () => {
    render(<CreateTodoForm lists={sampleLists} />);

    // Check if list and item creation forms are rendered
    expect(screen.getByText('Create a New List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('List Title')).toBeInTheDocument();

    expect(screen.getByText('Create a New Item')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item Description')).toBeInTheDocument();
  });

  it('displays validation errors when submitting an empty item form', async () => {
    render(<CreateTodoForm lists={sampleLists} />);

    fireEvent.click(screen.getByText('Save Item'));

    // Expect the validation error to appear for the item title
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

    fireEvent.click(screen.getByText('Save Item'));

    // Wait for the mutation to be called
    await waitFor(() =>
      expect(mockCreateItemMutation.mutate).toHaveBeenCalledWith({
        listId: sampleLists[1].id,  // '2' is the default selectedListId
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

    fireEvent.change(screen.getByPlaceholderText('List Title'), {
      target: { value: 'New List' },
    });

    fireEvent.click(screen.getByText('Save List'));

    await waitFor(() =>
      expect(mockCreateListMutation.mutate).toHaveBeenCalledWith('New List', expect.anything())
    );
  });

  it('updates selected list when a different list is selected', () => {
    render(<CreateTodoForm lists={sampleLists} />);

    const selectList = screen.getByLabelText('Select Todo List:');
    
    // Change the selected list
    fireEvent.change(selectList, { target: { value: sampleLists[0].id } });

    expect(selectList).toBe(sampleLists[0].id);
  });

});