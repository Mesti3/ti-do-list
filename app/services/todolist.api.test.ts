// todolist.api.test.ts
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { geTodoList, createTodoList } from './todolist.api'; // Adjust the import path accordingly
import { TodoList } from '../interfaces/interface'; // Adjust the import path accordingly

const mock = new AxiosMockAdapter(axios);

describe('TodoList API', () => {
    afterEach(() => {
        mock.reset(); // Reset the mock after each test
    });

    it('fetches the todo list successfully', async () => {
        const result = await geTodoList();
        expect(result).not.toBe([]);
    });

    it('creates a new todo list successfully', async () => {
        const newTitle = 'New List';
        
        // Mocking the POST request
        mock.onPost('todolist').reply(201);

        await expect(createTodoList(newTitle)).resolves.toBeUndefined(); 
    });

});
