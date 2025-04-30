
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-800">واصل</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-800 hover:bg-gray-50">
                الرئيسية
              </Link>
              
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-800 hover:bg-gray-50 flex items-center">
                  الميزات
                  <ChevronDown size={16} className="mr-1" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 hidden group-hover:block">
                  <Link to="/features/voice-campaigns" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    حملات صوتية
                  </Link>
                  <Link to="/features/analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    تحليلات متقدمة
                  </Link>
                  <Link to="/features/integration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    التكامل مع الأنظمة
                  </Link>
                </div>
              </div>
              
              <Link to="/pricing" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-800 hover:bg-gray-50">
                الأسعار
              </Link>
              
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-800 hover:bg-gray-50">
                اتصل بنا
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/login">
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50 hover:text-brand-800">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-brand-800 hover:bg-brand-900 text-white">
                  إنشاء حساب
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-ml-2 ml-0 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-800 hover:bg-gray-50 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-800 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
              الميزات
              <div className="pr-4 mt-2 space-y-1">
                <Link 
                  to="/features/voice-campaigns" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  حملات صوتية
                </Link>
                <Link 
                  to="/features/analytics" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تحليلات متقدمة
                </Link>
                <Link 
                  to="/features/integration" 
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  التكامل مع الأنظمة
                </Link>
              </div>
            </div>
            
            <Link 
              to="/pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-800 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              الأسعار
            </Link>
            
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-800 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              اتصل بنا
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <Link 
                  to="/login" 
                  className="block w-full px-4 py-2 text-center text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
              </div>
              <div className="mt-3 flex items-center px-3">
                <Link 
                  to="/register" 
                  className="block w-full px-4 py-2 text-center text-sm font-medium rounded-md bg-brand-800 text-white hover:bg-brand-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
