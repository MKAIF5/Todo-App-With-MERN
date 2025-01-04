import React from 'react';
import github from "../assets/github.svg";
import theme from "../assets/theme.svg";

const Navbar = () => {
  return (
    <div className="p-5 flex justify-end items-center w-full">
      <div className="flex gap-4">
        <div className="flex justify-center items-center w-10 rounded p-2 bg-[#e9e9e9]">
          <a target='_blank' href="https://github.com/mkaif5"><img src={github} alt="GitHub" /></a>
        </div>
        <div className="flex justify-center items-center w-10 rounded p-2 bg-[#e9e9e9]">
          <img className='cursor-pointer' src={theme} alt="Theme Toggle" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;