import { TodoListComp } from '../../components/todoList/todoList';
import { useTodoList } from '../../hooks/useTodo';
import React from 'react';

const HomePage = () => {
  const { todoLists } = useTodoList();

  return (
    <div className="home">
        <TodoListComp lists={todoLists ?? []} />
    </div>
  );
};
export default HomePage;