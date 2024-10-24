"use client";
import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const About = () => {

  return (
    <div className="m-4 mb-3 text-gray-500 dark:text-gray-400">
      <Header/>
      <span className='mb-3 text-gray-500 dark:text-gray-400'>
    {` Welcome to our Todo Application! This simple yet powerful tool helps you stay organized and manage your tasks efficiently.
       With our app, you can easily add new items to your to-do list, edit existing tasks to keep them up-to-date,
        and delete items when they're completed or no longer needed. Designed for ease of use, the app allows you to stay focused and productive, 
        whether you're managing personal tasks or keeping track of work-related projects. 
        Stay on top of your tasks and achieve your goals with our intuitive Todo application!`}
      </span>
      <Footer/>
    </div>
  );
};
export default About;