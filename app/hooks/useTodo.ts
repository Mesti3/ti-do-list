import { useMutation, useQuery, useQueryClient } from "react-query"
import { createTodoItem, deleteTodoItem,geTodoListItem,updateTodoItem } from "../services/todolistItem.api";
import {createTodoList,geTodoList} from '../services/todolist.api';

export const useTodoItem = (listId: string)=> {
    const queryClient = useQueryClient();

    const { data: todoItems } = useQuery(['todoListItemsById', listId], async () => {
        if (!listId) return [];
        const items = await geTodoListItem(listId);
        return items;
    }, {
        enabled: !!listId, 
    });

    const createItemMutation = useMutation(
       async ({listId, data}:{listId:string, data : { title: string, description: string , deadline: string, completed: boolean}  }) => 
        await createTodoItem(listId,data.title, data.description, data.deadline,data.completed), {
        onSuccess: ()=>{
            queryClient.invalidateQueries('todoListItem');
        }
    });

    const deleteItemMutation = useMutation(
        async ({listId, itemId}: {listId: string, itemId: string}) => await  deleteTodoItem(listId, itemId), {
        onSuccess: () =>{
            queryClient.invalidateQueries('todoListItem')
        }
    })

    const updateItemMutation = useMutation(
        async ({listId,itemId,completed}:{listId: string, itemId: string,  completed: boolean }) => 
            await updateTodoItem(listId,itemId,completed), {
        onSuccess: () => {
          queryClient.invalidateQueries('todoListItem');
        },
      });
    
      return {
        todoItems,
        createItemMutation,
        deleteItemMutation,
        updateItemMutation,
      };
};

export const useTodoList = () => {
    const queryClient = useQueryClient();

    const {data: todoLists, error, isLoading} = useQuery('todoListItem', geTodoList);

    const createListMutation = useMutation(
       async ( title: string ) => 
        await createTodoList(title), {
        onSuccess: ()=>{
            queryClient.invalidateQueries('todoListItem');
        }
    });
    
      return {
        todoLists,
        error,
        isLoading,
        createListMutation,
      };
}