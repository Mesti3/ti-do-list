import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { geTodoList, createTodoList } from './todolist.api'; 

const mock = new AxiosMockAdapter(axios);

describe('TodoList API', () => {
    afterEach(() => {
        mock.reset(); 
    });

    it('fetches the todo list successfully', async () => {
        const result = await geTodoList();
        expect(result).not.toBe([]);
    });

    it('creates a new todo list successfully', async () => {
        const newTitle = 'New List';
        
        mock.onPost('todolist').reply(201);

        await expect(createTodoList(newTitle)).resolves.toBeUndefined(); 
    });

});
