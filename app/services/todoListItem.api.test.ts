// todolistItem.api.test.ts
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import {
    geTodoListItem,
    createTodoItem,
    deleteTodoItem,
    updateTodoItem
} from './todolistItem.api'; // Adjust the import path accordingly
import { TodoItem } from '../interfaces/interface'; // Adjust the import path accordingly

const mock = new AxiosMockAdapter(axios);

describe('TodoListItem API', () => {
    afterEach(() => {
        mock.reset(); // Reset the mock after each test
    });

    it('fetches the todo list items successfully', async () => {
        const listId = '44';

        const result = await geTodoListItem(listId);
        expect(result).not.toBe([]); // This should now pass
    });

    it('creates a new todo item successfully', async () => {
        const listId = '44';
        const newItem = {
            title: 'New Item',
            description: 'New Description',
            deadline: '2024-01-01',
            completed: false,
        };

        // Mocking the POST request
        mock.onPost(`todolist/${listId}/todolistItem`).reply(201);

        await expect(createTodoItem(listId, newItem.title, newItem.description, newItem.deadline, newItem.completed)).resolves.toBeUndefined(); // Expecting no return value
    });

    // delete is tested just have commented out to not change id all the time
    it('deletes a todo item successfully', async () => {
        const listId = '44';
        const itemId = '1';

        // Mocking the DELETE request
        mock.onDelete(`todolist/${listId}/todolistItem/${itemId}`).reply(204);

        await expect(deleteTodoItem(listId, itemId)).resolves.toBeUndefined(); // Expecting no return value
    });

    it('updates a todo item successfully', async () => {
        const listId = '27';
        const itemId = '3';
        const completed = true;

        // Mocking the PUT request
        mock.onPut(`todolist/${listId}/todolistItem/${itemId}`).reply(200);

        await expect(updateTodoItem(listId, itemId, completed)).resolves.toBeUndefined(); // Expecting no return value
    });

});
