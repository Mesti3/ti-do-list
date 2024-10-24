import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import {
    geTodoListItem,
    createTodoItem,
    deleteTodoItem,
    updateTodoItem
} from './todolistItem.api'; 


const mock = new AxiosMockAdapter(axios);

describe('TodoListItem API', () => {
    afterEach(() => {
        mock.reset(); 
    });

    it('fetches the todo list items successfully', async () => {
        const listId = '30';

        const result = await geTodoListItem(listId);
        expect(result).not.toBe([]);
    });

    it('creates a new todo item successfully', async () => {
        const listId = '30';
        const newItem = {
            title: 'New Item',
            description: 'New Description',
            deadline: '2024-01-01',
            completed: false,
        };

        mock.onPost(`todolist/${listId}/todolistItem`).reply(201);

        await expect(createTodoItem(listId, newItem.title, newItem.description, newItem.deadline, newItem.completed)).resolves.toBeUndefined(); // Expecting no return value
    });

    // it('deletes a todo item successfully', async () => {
    //     const listId = '30';
    //     const itemId = '1';

    //     mock.onDelete(`todolist/${listId}/todolistItem/${itemId}`).reply(204);

    //     await expect(deleteTodoItem(listId, itemId)).resolves.toBeUndefined(); // Expecting no return value
    // });

    it('updates a todo item successfully', async () => {
        const listId = '30';
        const itemId = '3';
        const completed = true;

        mock.onPut(`todolist/${listId}/todolistItem/${itemId}`).reply(200);

        await expect(updateTodoItem(listId, itemId, completed)).resolves.toBeUndefined(); // Expecting no return value
    });

});
