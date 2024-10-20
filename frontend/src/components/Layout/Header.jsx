import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FiMenu, FiX, FiBook } from 'react-icons/fi';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">
            <FiBook className="inline-block mr-2" />
            BookScope
          </Link>
          <div className="hidden md:flex">
            <Link to="/books" className="text-white hover:text-indigo-200 px-3 py-2">Books</Link>
            {isAuthenticated ? (
              <>
                <Link to="/books/new" className="text-white hover:text-indigo-200 px-3 py-2">Add New Book</Link>
                <Link to="/profile" className="text-white hover:text-indigo-200 px-3 py-2">Profile</Link>
                <button onClick={handleLogout} className="text-white hover:text-indigo-200 px-3 py-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-indigo-200 px-3 py-2">Login</Link>
                <Link to="/register" className="text-white hover:text-indigo-200 px-3 py-2">Register</Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-3">
            <Link to="/books" className="block text-white hover:text-indigo-200 py-2">Books</Link>
            {isAuthenticated ? (
              <>
                <Link to="/books/new" className="block text-white hover:text-indigo-200 py-2">Add New Book</Link>
                <Link to="/profile" className="block text-white hover:text-indigo-200 py-2">Profile</Link>
                <button onClick={handleLogout} className="block text-white hover:text-indigo-200 py-2 w-full text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-indigo-200 py-2">Login</Link>
                <Link to="/register" className="block text-white hover:text-indigo-200 py-2">Register</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;