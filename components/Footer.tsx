import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">StyleMuse</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Making fashion inspiration shoppable. Discover, curate, and shop your perfect style.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-gray-900 luxury-transition">Home</Link></li>
              <li><Link href="/blog" className="hover:text-gray-900 luxury-transition">Blog</Link></li>
              <li><Link href="/shop" className="hover:text-gray-900 luxury-transition">Shop Directory</Link></li>
              <li><Link href="/about" className="hover:text-gray-900 luxury-transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/?category=minimal_luxe" className="hover:text-gray-900 luxury-transition">Minimal Luxe</Link></li>
              <li><Link href="/?category=streetwear" className="hover:text-gray-900 luxury-transition">Streetwear</Link></li>
              <li><Link href="/?category=sustainable" className="hover:text-gray-900 luxury-transition">Sustainable Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 luxury-transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 luxury-transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 luxury-transition">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="mailto:hello@stylemuse.com" className="text-gray-600 hover:text-gray-900 luxury-transition">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 luxury-transition">
              Newsletter
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} StyleMuse. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-gray-900 luxury-transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900 luxury-transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
