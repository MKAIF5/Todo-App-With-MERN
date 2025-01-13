import React from 'react';
import github from "../assets/github.svg";
import { useSelector, useDispatch } from 'react-redux';
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { toggleTheme } from "../theme/theme";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleDarkLight = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`p-5 flex justify-end items-center w-full ${theme === 'dark' ? 'bg-[#0a1a2e] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex gap-4">
        <div className="flex justify-center items-center w-10 rounded p-2 bg-[#e9e9e9]">
          <a target='_blank' href="https://github.com/mkaif5">
            <img src={github} alt="GitHub" />
          </a>
        </div>
        <div
          onClick={toggleDarkLight}
          className={`flex justify-center items-center w-10 rounded p-2 cursor-pointer text-2xl ${theme === 'dark' ? 'bg-[#1a2634] text-white' : 'bg-[#e9e9e9] text-blue-900'}`}
        >
          {theme === 'dark' ? <IoSunnyOutline /> : <MdOutlineDarkMode />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;