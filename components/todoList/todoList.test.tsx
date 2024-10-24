import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoListComp } from './todoList'; // Adjust the import path as needed
import { useTodoItem } from '../../hooks/useTodo';
import { TodoItem } from '../../interfaces/interface';

jest.mock('../../hooks/useTodo');

const mockUseTodoItem = useTodoItem as jest.Mock;

describe('TodoListComp', () => {
  const mockDeleteItemMutation = {
    mutate: jest.fn(),
  };
  
  const mockUpdateItemMutation = {
    mutate: jest.fn(),
  };

  const sampleTodoItems: TodoItem[] = [
    { id: '1', title: 'Task 1', description: 'Description 1', completed: false, deadline: '' },
    { id: '2', title: 'Task 2', description: 'Description 2', completed: true, deadline: '' },
  ];

  const sampleLists = [
    { id: '1', title: 'List 1' },
    { id: '2', title: 'List 2' },
  ];

  beforeEach(() => {
    mockUseTodoItem.mockReturnValue({
      deleteItemMutation: mockDeleteItemMutation,
      updateItemMutation: mockUpdateItemMutation,
      todoItems: sampleTodoItems,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TodoListComp with search, select, and filter inputs', () => {
    render(<TodoListComp lists={sampleLists} />);
    
    // Ensure inputs are rendered
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Todo List:')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Type:')).toBeInTheDocument();

    // Check that table headers are rendered
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Deadline')).toBeInTheDocument();
  });

  it('displays the correct todo items based on selected list and filter', () => {
    render(<TodoListComp lists={sampleLists} />);

    // Ensure both items are displayed (since filter is "all")
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    // Filter to "done" (completed)
    fireEvent.change(screen.getByLabelText('Select Type:'), { target: { value: 'done' } });
    
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument(); // Task 1 is not completed
    expect(screen.getByText('Task 2')).toBeInTheDocument(); // Task 2 is completed

    // Filter to "onGoing" (not completed)
    fireEvent.change(screen.getByLabelText('Select Type:'), { target: { value: 'onGoing' } });
    
    expect(screen.getByText('Task 1')).toBeInTheDocument(); // Task 1 is not completed
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument(); // Task 2 is completed
  });

  it('filters the todo items based on search term', () => {
    render(<TodoListComp lists={sampleLists} />);

    // Type a search term that matches only "Task 1"
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Task 1' } });

    // Task 1 should be displayed, Task 2 should be hidden
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  it('toggles item completion status when checkbox is clicked', async () => {
    render(<TodoListComp lists={sampleLists} />);

    const task1Checkbox = screen.getByLabelText('Task 1'); // Checkbox for Task 1

    fireEvent.click(task1Checkbox); // Toggle Task 1 completion

    await waitFor(() =>
      expect(mockUpdateItemMutation.mutate).toHaveBeenCalledWith(
        {
          listId: sampleLists[1].id,  // Assume "List 2" is selected by default
          itemId: '1',
          completed: true,  // Task 1 was not completed, so we expect it to be marked as completed
        },
        expect.anything()
      )
    );
  });

  it('deletes a todo item when the delete button is clicked', () => {
    render(<TodoListComp lists={sampleLists} />);

    const deleteButton = screen.getByText('Delete Task 1'); // Assuming there's a delete button for each task
    fireEvent.click(deleteButton);

    expect(mockDeleteItemMutation.mutate).toHaveBeenCalledWith({
      listId: sampleLists[1].id,  // Assume "List 2" is selected by default
      itemId: '1',
    });
  });

  it('updates the selected list when a different list is selected', () => {
    render(<TodoListComp lists={sampleLists} />);

    const selectList = screen.getByLabelText('Select Todo List:');
    
    // Change the selected list
    fireEvent.change(selectList, { target: { value: sampleLists[0].id } });

    expect(selectList).toBe(sampleLists[0].id);
  });
});
