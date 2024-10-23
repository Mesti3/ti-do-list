import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTodoItem, useTodoList } from "../../hooks/useTodo";
import React, { useEffect, useState } from "react";
import { TodoList } from "@/interfaces/interface";

// Schema for todo item validation
const schemaItem = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.string().optional(),
});

// Schema for todo list validation
const schemaList = z.object({
  title: z.string().min(1, "Title is required"),
});

type FormDataItem = z.infer<typeof schemaItem>;
type FormDataList = z.infer<typeof schemaList>;

interface TodoListItemCompProps {
  lists: TodoList[];
}

export const CreateTodoForm: React.FC<TodoListItemCompProps> = ({ lists }) => {
  // State for selected list ID
  const [selectedListId, setSelectedListId] = useState<string>(lists[lists.length - 1]?.id ?? "");

  // Hooks for managing todo item and todo list
  const { createItemMutation } = useTodoItem(selectedListId);
  const { createListMutation } = useTodoList();

  // Form hook for creating a new  item
  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    reset: resetItemForm,
    formState: { errors: itemErrors },
  } = useForm<FormDataItem>({
    resolver: zodResolver(schemaItem),
  });

  // Form hook for creating a new todo list
  const {
    register: registerList,
    handleSubmit: handleSubmitList,
    reset: resetListForm,
    formState: { errors: listErrors },
  } = useForm<FormDataList>({
    resolver: zodResolver(schemaList),
  });

  // Handle submission of a new todo item
  const onSubmitItem = (data: FormDataItem) => {
    createItemMutation.mutate({
      listId: selectedListId,
      data: {
        title: data.title,
        description: data.description ?? "",
        deadline: data.deadline ?? "",
        completed: false,
      },
    });
  };

  const onSubmitList = (data: FormDataList) => {
    createListMutation.mutate( data.title , {
      onSuccess: () => {
        resetListForm(); // Reset the form on success
      }
    });
  };

  // Effect to reset form and handle successful item creation
  useEffect(() => {
    if (createItemMutation.isSuccess) {
      resetItemForm();
      console.log("Todo item created successfully!");
    }
  }, [createItemMutation.isSuccess, resetItemForm]);

  return (
    <div className="md:flex mx-auto m-4 flex">
      {/* Form for creating a new todo list */}
      <form className="mx-auto m-4" onSubmit={handleSubmitList(onSubmitList)}>
        <h2>Create a New List</h2>
        <input
          className="input m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...registerList("title")}
          placeholder="List Title"
        />
        {listErrors.title && <span>{listErrors.title.message}</span>}
        <button
          className="btn m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Save List
        </button>
      </form>

      {/* Form for creating a new todo item */}
      <form className="mx-auto m-4" onSubmit={handleSubmitItem(onSubmitItem)}>
        <div className="mb-4 flex md:flex md:items-center md:justify-between">
          <label htmlFor="todo-list-select" className="mr-2">Select Todo List:</label>
          <select
            id="todo-list-select"
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
        </div>
        <h2>Create a New Item</h2>
        <input
          className="input m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...registerItem("title")}
          placeholder="Item Title"
        />
        {itemErrors.title && <span>{itemErrors.title.message}</span>}
        <input
          className="input m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...registerItem("description")}
          placeholder="Item Description"
        />
        <input
          className="input m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="datetime-local"
          {...registerItem("deadline")}
        />
        <button
          className="btn m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Save Item
        </button>
      </form>
    </div>
  );
};
