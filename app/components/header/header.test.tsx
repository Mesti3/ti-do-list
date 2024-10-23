import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for extended matchers like "toBeInTheDocument"
import { BrowserRouter } from 'react-router-dom'; // for routing
import Header from './header';

describe('Header Component', () => {
  test('renders navigation links correctly', () => {
    // Render the Header component inside a BrowserRouter (required for the Link component)
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check for the presence of the Home link
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    // Check for the presence of the "Create item" link
    const todoLink = screen.getByText('Create item');
    expect(todoLink).toBeInTheDocument();
    expect(todoLink).toHaveAttribute('href', '/todo');

    // Check for the presence of the "About" link
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    // Check for the presence of the "Privacy Policy" link
    const privacyPolicyLink = screen.getByText('Privacy Policy');
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(privacyPolicyLink).toHaveAttribute('href', '/privacypolicy');

    // Check for the presence of the "Contact" link
    const contactLink = screen.getByText('Contact');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});
