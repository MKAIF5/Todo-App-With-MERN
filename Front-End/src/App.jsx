import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 20 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 25 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 transition-all dark:bg-gray-800 dark:text-white">
      <Navbar />

      <motion.div
        className="p-3 flex-grow flex justify-center items-center mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-semibold text-center">To-Do List</h2>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new task..."
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-400 transition-all">
            Add Task
          </button>

          <motion.ul className="space-y-3">
            <motion.li
              className="flex justify-between items-center p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="cursor-pointer">Example Todo Item 1</span>
              <div className="flex gap-2">
                <button className="text-yellow-500 hover:text-yellow-400">
                  <FaPen className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-400">
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            </motion.li>
            <motion.li
              className="flex justify-between items-center p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="cursor-pointer">Example Todo Item 2</span>
              <div className="flex gap-2">
                <button className="text-yellow-500 hover:text-yellow-400">
                  <FaPen className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-400">
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            </motion.li>
            <motion.li
              className="flex justify-between items-center p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="cursor-pointer">Example Todo Item 3</span>
              <div className="flex gap-2">
                <button className="text-yellow-500 hover:text-yellow-400">
                  <FaPen className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-400">
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default App;