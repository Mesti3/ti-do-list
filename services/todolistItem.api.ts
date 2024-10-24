import axios, { AxiosResponse,AxiosError } from 'axios';
import { TodoItem } from '../interfaces/interface';

const api = axios.create({
    baseURL: "https://671513e433bc2bfe40b95089.mockapi.io/api/v1/"
});

export const geTodoListItem = async (listId: string): Promise<TodoItem[] | null> => { 
    try {
        const res: AxiosResponse<unknown, unknown> = await api.get(`todolist/${listId}/todolistItem`);
        return res.data as TodoItem[];
    } catch (error) {
        if((error as AxiosError).response?.data === "Not found"){
            console.error('No item in list created yet');
            return null; 
        }else{
        console.error('Error fetching todo list:', error);
        return null; 
        }
    }
};

export const createTodoItem = async (listId: string,title: string, description: string, deadline: string, completed: boolean): Promise<void> => {
    try {
        await api.post(`todolist/${listId}/todolistItem`, {
            title, 
            description, 
            deadline,
            completed
        });
    } catch (error) {
        console.error('Error creating todo item:', error);
    }
};

export const deleteTodoItem = async (listId: string,itemId: string): Promise<void> => {
    try {
        await api.delete(`todolist/${listId}/todolistItem/${itemId}`);
    } catch (error) {
        console.error('Error deleting todo item:', error);
    }
};

export const updateTodoItem = async (listId: string,itemId: string, completed: boolean): Promise<void> => {
    try {
        await api.put(`todolist/${listId}/todolistItem/${itemId}`, { completed });
    } catch (error) {
        console.error('Error updating todo item:', error);
    }
};
