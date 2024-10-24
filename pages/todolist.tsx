"use client";
import { useTodoList } from '@/hooks/useTodo';
import { CreateTodoForm } from '../components/createTodo/createToDo';
import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

 const TodoList = () => {
  const { todoLists } = useTodoList();
  

  return (
    <div className="home">
      <Header/>
        <CreateTodoForm lists={todoLists ?? []}/>
        <Footer/>
    </div>
  );
};

export default TodoList;
