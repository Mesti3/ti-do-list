"use client";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="top-0 right-0 left-0 row-start-3 bg-white rounded-lg shadow dark:bg-gray-800 flex gap-6 flex-wrap items-center justify-center">
      <nav className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="/" className="hover:underline me-4 md:me-6">
              Home
            </Link>
          </li>

          {/* ToDo List Route */}
          <li>
            <Link href="/todolist" className="hover:underline me-4 md:me-6">
              Create item
            </Link>
          </li>

          {/* About */}
          <li>
            <Link href="/about" className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>

          {/* Privacy Policy */}
          <li>
            <Link href="/privacypolicy" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
