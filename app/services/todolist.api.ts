import axios, { AxiosResponse } from 'axios';
import { TodoList } from '../interfaces/interface';

const api = axios.create({
    baseURL: "https://671513e433bc2bfe40b95089.mockapi.io/api/v1/"
});

export const geTodoList = async (): Promise<TodoList[] | null> => { 
    try {
        const res: AxiosResponse<any, any> = await api.get('todolist');
        return res.data as TodoList[];
    } catch (error) {
        console.error('Error fetching todo list:', error);
        return null;  // or you can throw an error if you want to handle it upstream
    }
};

export const createTodoList = async (title: string): Promise<void> => {
    try {
        await api.post(`todolist`, {
            title, 
           
        });
    } catch (error) {
        console.error('Error creating todo item:', error);
    }
};

export const deleteTodoList = async (listId: string): Promise<void> => {
    try {
        await api.delete(`todolist/${listId}`);
    } catch (error) {
        console.error('Error deleting todo item:', error);
    }
};
