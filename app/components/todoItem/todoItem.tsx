import React, { useEffect } from "react";
import { TodoItem } from "../../interfaces/interface";

interface TodoItemCompProps {
  item: TodoItem; // This specifies that 'item' prop is required and should be of type 'TodoItem'
  handleItemToggle: (itemId: string,completed: boolean) => void; // Function to toggle item selection
  handleDeleteItem: (itemId: string) => void;
}

export const TodoItemComp: React.FC<TodoItemCompProps> = ({ item, handleItemToggle,handleDeleteItem  }) => {


  return (
    <tr className={item.completed ? 'bg-white dark:bg-green-200' : 'bg-white dark:bg-gray-800'} >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.title}
      </th>
      <td className="px-6 py-4">{item.description}</td>
      <td className="px-6 py-4">
        {new Date(item.deadline).toLocaleString()}
      </td>
      <td className="px-6 py-4" >
        <input
          type="checkbox"
          checked={item.completed} // Checked state is based on 'isSelected'
          onChange={() => handleItemToggle(item.id,item.completed)} // Toggle selection
        />
      </td>
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          onClick={() => handleDeleteItem(item.id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};
