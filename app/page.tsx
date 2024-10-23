"use client";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import dynamic from 'next/dynamic'

const queryClient = new QueryClient();

const TodoListPage = dynamic(
  () => import('./pages/todolist/todolist'),
  { ssr: false }
)

const NotFoundPage = dynamic(
  () => import('./pages/notFound/notFound'),
  { ssr: false }
)

const AboutPage = dynamic(
  () => import('./pages/about/about'),
  { ssr: false }
)

const ContactPage = dynamic(
  () => import('./pages/contact/contact'),
  { ssr: false }
)

const HomePage = dynamic(
  () => import('./pages/home/home'),
  { ssr: false }
)

const  App = () =>  {
 
  return (
    <>
      <Router >
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