import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


  return (
    <header className="bg-[#f8f9fc]">
      <div className="flex justify-between items-center px-6 py-4 border-b-[1px] border-[#e0e0e0]">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-[#000000] text-[16px] font-medium">
            Dashboard
          </Link>
          <Link to="/tasklist" className="text-[#6c757d] text-[16px]">Task list</Link>
        </div>
        <button className="bg-[#6f42c1] text-white text-[14px] font-medium px-4 py-2 rounded-[4px]">
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
