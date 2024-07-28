import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-sm">Copyright 2024 & Beyond, Rohan Saxena © - All Rights Reserved</p>
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/rohan-saxena-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a href="https://github.com/RohanSaxena2020" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
            <i className="fab fa-github text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;