"use client";
import { useTodoList } from '@/hooks/useTodo';
import { CreateTodoForm } from '../../components/createTodo/createToDo';
import React from 'react';

 const TodoListPage = () => {
  const { todoLists } = useTodoList();
  

  return (
    <div className="home">
        <CreateTodoForm lists={todoLists ?? []}/>
    </div>
  );
};

export default TodoListPage;
