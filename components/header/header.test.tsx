import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header'; 
import { useRouter } from 'next/router';

// Mock Next.js useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
    });
  });

  it('renders all navigation links correctly', () => {
    render(<Header />);

    // Check if the "Home" link is present and correct
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

   const todoListLink = screen.getByText('Create item');
    expect(todoListLink).toBeInTheDocument();
    expect(todoListLink).toHaveAttribute('href', '/todolist');


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
