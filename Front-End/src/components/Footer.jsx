import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {

  const theme = useSelector((state) => state.theme.theme);

  return (
    <footer className={`p-4 text-center w-full text-white ${theme === 'dark' ? 'bg-gray-700' : 'bg-[#0a1a2e]'}`}>
      <p>Design And Created By || <span className="font-semibold">Mohammad Kaif Khan</span></p>
      <p>
        Source Code{' '}
        <a href="https://github.com/MKAIF5/Todo-App-With-MERN" target='_blank' className="text-blue-400">
          Todo
        </a>
      </p>
    </footer>
  );
};

export default Footer;