import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-900 text-white w-full">
      <div className="text-center">
        <p>Design And Created By || <span className="font-semibold">Mohammad Kaif Khan</span></p>
        <p>
          Source Code{' '}
          <a href="https://github.com/MKAIF5/Todo-App-With-MERN" target='_blank' className="text-blue-400">
            Todo
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
