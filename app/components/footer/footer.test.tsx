import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher
import Footer from './footer';

describe('Footer Component', () => {
  test('renders footer content correctly', () => {
    // Render the Footer component
    render(<Footer />);

    // Check if the text "All Rights Reserved." is in the document
    expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();

    // Check for the presence of the "About" link
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '#');

    // Check for the presence of the "Contact" link
    const contactLink = screen.getByText('Contact');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '#');
  });
});
