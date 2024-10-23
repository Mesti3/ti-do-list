"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/home';
import TodoListPage from './pages/todolist/todolist';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import React from 'react';
import NotFoundPage from './pages/notFound/notFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import AboutPage from './pages/about/about';
import ContactPage from './pages/contact/contact';

const queryClient = new QueryClient();

const  App = () =>  {
  return (
    <>
      <Router>
        <Header/>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/todo" element={<TodoListPage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </QueryClientProvider>
        <Footer/>
      </Router>
      </>
  );
}
export default App;