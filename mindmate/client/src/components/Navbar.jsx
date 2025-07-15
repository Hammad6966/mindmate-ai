import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LightBulbIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const authenticatedNavigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Journal', href: '/journal', current: location.pathname === '/journal' },
    { name: 'Mood', href: '/mood', current: location.pathname === '/mood' },
    { name: 'Chat', href: '/chat', current: location.pathname === '/chat' },
  ];

  const unauthenticatedNavigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Login', href: '/login', current: location.pathname === '/login' },
    { name: 'Register', href: '/register', current: location.pathname === '/register' },
  ];

  const navigation = isAuthenticated ? authenticatedNavigation : unauthenticatedNavigation;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Disclosure as="nav" className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                  <div className="relative">
                    <LightBulbIcon className="h-8 w-8 text-purple-400 animate-glow" />
                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm opacity-50 animate-pulse"></div>
                  </div>
                  <span className="text-xl font-poppins font-semibold glow-text">
                    MindMate
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-300 ${
                      item.current
                        ? 'text-purple-400'
                        : 'text-gray-300 hover:text-purple-300'
                    } group`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
                
                {/* User info and logout for authenticated users */}
                {isAuthenticated && (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-300">
                      Welcome, {user?.username || 'User'}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/30 backdrop-blur-md border-t border-white/10">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                      item.current
                        ? 'text-purple-400 bg-white/5'
                        : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                
                {/* User info and logout for authenticated users */}
                {isAuthenticated && (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-400 border-t border-white/10 mt-2 pt-2">
                      Welcome, {user?.username || 'User'}
                    </div>
                    <Disclosure.Button
                      as="button"
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-red-400 hover:bg-white/5 transition-colors duration-300"
                    >
                      Logout
                    </Disclosure.Button>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar; 