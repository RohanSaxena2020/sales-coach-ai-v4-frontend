import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto p-4">
        <a href="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-white">Sales Coach</span>
          <span className="text-red-600">AI</span>
        </a>
      </div>
    </header>
  );
};

export default Header;