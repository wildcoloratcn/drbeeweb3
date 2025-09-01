import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>© 2023 DrBEE. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="/about" className="hover:text-yellow-400">About</a>
          <a href="https://github.com/wildcoloratcn/drbeeweb3" className="hover:text-yellow-400" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>
    </footer>
  );
};