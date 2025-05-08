import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  // Add state to manage dropdown visibility
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // Track if we're on the homepage
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // Add state to track the selected language
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: 'English (US)',
    flag: (
      <svg
        className="w-5 h-5 rounded-full me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3900 3900"
      >
        <path fill="#b22234" d="M0 0h7410v3900H0z" />
        <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300" />
        <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
        <g fill="#fff">
          <path d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z" />
        </g>
      </svg>
    ),
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen || isProfileDropdownOpen) {
        setIsLanguageDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen, isProfileDropdownOpen]);

  // Toggle dropdown visibility
  const toggleLanguageDropdown = (e) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(false); // Close other dropdown
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setIsLanguageDropdownOpen(false); // Close other dropdown
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    console.log('Logging out...');
    // Implement actual logout functionality here
    // For example: 
    // localStorage.removeItem('authToken');
    // window.location.href = '/login';
  };

  // Define available languages with their flags
  const languages = [
    {
      name: 'English (US)',
      flag: (
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 rounded-full me-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path fill="#bd3d44" d="M0 0h247v10H0z" />
          <path fill="#fff" d="M0 10h247v10H0z" />
        </svg>
      ),
    },
    {
      name: 'Deutsch',
      flag: (
        <svg
          className="h-3.5 w-3.5 rounded-full me-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path fill="#ffce00" d="M0 341.3h512V512H0z" />
          <path d="M0 0h512v170.7H0z" />
          <path fill="#d00" d="M0 170.7h512v170.6H0z" />
        </svg>
      ),
    },
    {
      name: 'Italiano',
      flag: (
        <svg
          className="h-3.5 w-3.5 rounded-full me-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path fill="#fff" d="M0 0h512v512H0z" />
          <path fill="#009246" d="M0 0h170.7v512H0z" />
          <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
        </svg>
      ),
    },
  ];

  // Handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-3xl">💲</span>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Zenya
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
          {/* Language dropdown button */}
          <button
            type="button"
            onClick={toggleLanguageDropdown}
            className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {/* Display selected language flag and name */}
            {React.cloneElement(selectedLanguage.flag, { className: "w-5 h-5 rounded-full me-3" })}
            {selectedLanguage.name}
          </button>

          {/* Profile button - only show if not on homepage */}
          {!isHomePage && (
            <div className="relative">
              <button
                type="button"
                onClick={toggleProfileDropdown}
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <div className="relative w-8 h-8 overflow-hidden bg-blue-600 rounded-full">
                  <svg className="absolute w-10 h-10 text-white -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </button>

              {/* Profile dropdown menu */}
              <div
                className={`z-50 ${isProfileDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600`}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">John Doe</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">john.doe@zenya.com</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Settings
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-red-500"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Language dropdown menu */}
          <div
            className={`z-50 ${isLanguageDropdownOpen ? 'block' : 'hidden'} absolute right-12 mt-12 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700`}
          >
            <ul className="py-2 font-medium">
              {languages.map((language, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <div className="inline-flex items-center">
                      {language.flag}
                      {language.name}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-language"
        >
          {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
