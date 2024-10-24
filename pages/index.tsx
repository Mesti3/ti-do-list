"use client";
import { TodoListComp } from '../components/todoList/todoList';
import { useTodoList } from '../hooks/useTodo';
import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const Home = () => {
  const { todoLists } = useTodoList();

  return (
    <div className="home">
      <Header/>
        <TodoListComp lists={todoLists ?? []} />
        <Footer/>
    </div>
  );
};
export default Home;