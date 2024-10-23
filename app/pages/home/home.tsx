import { TodoListComp } from '../../components/todoList/todoList';
import {  useTodoItem, useTodoList } from '../../hooks/useTodo';
import React from 'react';
import {TodoItem} from '../../interfaces/interface';

const HomePage = () => {
  const { todoLists } = useTodoList();

  return (
    <div className="home">
        <TodoListComp lists={todoLists ?? []} />
    </div>
  );
};
export default HomePage;