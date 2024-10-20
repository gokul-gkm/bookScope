import React from 'react';
import { FiGithub, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} BookScope. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400"><FiGithub size={20} /></a>
            <a href="#" className="hover:text-indigo-400"><FiInstagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;