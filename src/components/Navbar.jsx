// Navbar component with theme toggle, logout, ar hover effect
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { FaUserCircle, FaBars, FaSignOutAlt, FaTasks, FaPlus, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Theme local storage theke nebo, default light
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  // User login check and theme apply korsi
  useEffect(() => {
    // User check korsi
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // User change hole menu close korsi
      setIsMenuOpen(false);
    });
    // Theme apply korsi HTML root e
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    return () => unsubscribe();
  }, [theme]);

  // Logout handle korsi
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout hoye gese!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout korte problem holo!');
    }
    setIsMenuOpen(false);
  };

  // Theme toggle ar menu close ek sathe korsi
  const toggleThemeAndCloseMenu = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsMenuOpen(false);
  };

  // Menu toggle korsi
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500 dark:text-blue-400">
          TaskMarket
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Home
          </Link>
          <Link to="/browse-tasks" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            Browse Tasks
          </Link>
          {user && (
            <>
              <Link to="/add-task" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                <FaPlus className="inline mr-1" /> Add Task
              </Link>
              <Link to="/my-posted-tasks" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                <FaTasks className="inline mr-1" /> My Tasks
              </Link>
            </>
          )}
          <button onClick={toggleThemeAndCloseMenu} className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            {theme === 'light' ? <FaMoon className="inline mr-1" /> : <FaSun className="inline mr-1" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button onClick={toggleMenu} className="flex items-center relative group">
                {user.photoURL ? (
                  <>
                    <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
                    {/* Hover e displayName show korbo */}
                    <span className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      {user.displayName || 'User'}
                    </span>
                  </>
                ) : (
                  <FaUserCircle className="h-8 w-8 text-gray-700 dark:text-gray-200" />
                )}
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded z-50">
                  <div className="p-2 border-b">
                    <p className="text-gray-900 dark:text-gray-200 font-medium">{user.displayName || 'User'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block p-2 text-red-600 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  >
                    <FaSignOutAlt className="inline mr-1" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 p-1 rounded">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-500 dark:bg-blue-600 text-white p-1 rounded">
                Signup
              </Link>
            </div>
          )}
          <button onClick={toggleMenu} className="md:hidden ml-2 text-gray-700 dark:text-gray-200">
            <FaBars />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-2">
          <Link
            to="/"
            className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/browse-tasks"
            className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Tasks
          </Link>
          {user && (
            <>
              <Link
                to="/add-task"
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaPlus className="inline mr-1" /> Add Task
              </Link>
              <Link
                to="/my-posted-tasks"
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTasks className="inline mr-1" /> My Tasks
              </Link>
              <Link
                to="/profile"
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={toggleThemeAndCloseMenu}
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-full text-left"
              >
                {theme === 'light' ? <FaMoon className="inline mr-1" /> : <FaSun className="inline mr-1" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <button
                onClick={handleLogout}
                className="block p-2 text-red-600 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              >
                <FaSignOutAlt className="inline mr-1" /> Sign out
              </button>
            </>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="block p-2 text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block p-2 bg-blue-500 dark:bg-blue-600 text-white rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;