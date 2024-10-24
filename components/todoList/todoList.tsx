"use client";
import { TodoItemComp } from "../todoItem/todoItem";
import React, { useEffect, useState } from "react";
import { TodoItem, TodoList } from '../../interfaces/interface';
import { useTodoItem } from "../../hooks/useTodo";

interface TodoListItemCompProps {
  lists: TodoList[];
}

export const TodoListComp: React.FC<TodoListItemCompProps> = ({ lists }) => {
  const [selectedListId, setSelectedListId] = useState<string>(lists[lists.length - 1]?.id);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { deleteItemMutation, updateItemMutation, todoItems } = useTodoItem(selectedListId);


  const [todoListItem, settodoListItem] = useState<TodoItem[]>(todoItems ?? [] );
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
      setSelectedListId(lists[lists.length - 1]?.id)
      settodoListItem(todoItems ?? []);
  }, [todoItems,selectedListId,lists]);

  const filteredItems = todoListItem.filter(item => {
    const matchesSearchTerm =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "all") return matchesSearchTerm;
    if (filterType === "done") return matchesSearchTerm && item.completed;
    if (filterType === "onGoing") return matchesSearchTerm && !item.completed;

    return matchesSearchTerm;
  });

  const uncheckedItems = filteredItems.filter(item => !item.completed);
  const checkedItems = filteredItems.filter(item => item.completed);

  const handleItemToggle = (itemId: string, completed: boolean) => {
    updateItemMutation.mutate({
      listId: selectedListId,
      itemId: itemId,
      completed: !completed,
    }, {
      onSuccess: () => {
        settodoListItem((todoListItem) =>
          todoListItem.map((item) =>
            item.id === itemId ? { ...item, completed: !completed } : item
          )
        );
      },
    });
  };

  const handleDeleteItem = (itemId: string) => {
    deleteItemMutation.mutate({ listId: selectedListId, itemId });
    settodoListItem((todoListItem) => todoListItem.filter((item) => item.id !== itemId));
  };

  return (
    <div className="w-full mx-auto max-w-screen-xl pb-12 p-4 flex flex-col md:flex md:items-center md:justify-between sm:rounded-lg">
      <div className="md:flex mx-auto m-4">
        {/* Search Input */}
        <form className="max-w-md mx-auto p-4">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
        </form>

        {/* Select Todo List */}
        <form className="mb-4 flex md:flex md:items-center md:justify-between p-4">
          <label htmlFor="todo-list-select" className="mr-2">Select Todo List:</label>
          <select
            id="todo-list-select"
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {lists.map(list => (
              <option key={list.id} value={list.id}>{list.title}</option>
            ))}
          </select>
        </form>

        {/* Select Type (all, done, onGoing) */}
        <form className="mb-4 flex md:flex md:items-center md:justify-between p-4">
          <label htmlFor="filter-type-select" className="mr-2">Select Type:</label>
          <select
            id="filter-type-select"
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="done">Done (Checked)</option>
            <option value="onGoing">OnGoing (Unchecked)</option>
          </select>
        </form>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Deadline</th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {/* Render unchecked items first */}
          {uncheckedItems.map((item: TodoItem) => (
            <TodoItemComp
              key={item.id}
              item={item}
              handleItemToggle={handleItemToggle}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
          {/* Render checked items next */}
          {checkedItems.map((item: TodoItem) => (
            <TodoItemComp
              key={item.id}
              item={item}
              handleItemToggle={handleItemToggle}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
