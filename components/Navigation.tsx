'use client';

import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold tracking-tight">StyleMuse</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-gray-600 luxury-transition">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-gray-600 luxury-transition">
              Blog
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-gray-600 luxury-transition">
              Shop Directory
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-gray-600 luxury-transition">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-gray-600 luxury-transition">
              Contact
            </Link>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/shop"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Shop Directory
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
