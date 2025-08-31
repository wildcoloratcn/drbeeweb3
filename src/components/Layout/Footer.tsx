import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>© 2023 DrBEE. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-yellow-400">Terms</a>
          <a href="#" className="hover:text-yellow-400">Privacy</a>
          <a href="/about" className="hover:text-yellow-400">About</a>
        </div>
      </div>
    </footer>
  );
};