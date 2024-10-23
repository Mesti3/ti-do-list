import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers like "toBeInTheDocument"
import { BrowserRouter } from 'react-router-dom'; // for routing
import Header from './header';

describe('Header Component', () => {
  test('renders navigation links correctly', () => {
    // Render the Header component inside a BrowserRouter
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check for the presence of the Home link
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const todoLink = screen.getByText('Create item');
    expect(todoLink).toBeInTheDocument();
    expect(todoLink).toHaveAttribute('href', '/todo');

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    const privacyPolicyLink = screen.getByText('Privacy Policy');
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '/privacypolicy');

    const contactLink = screen.getByText('Contact');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});
