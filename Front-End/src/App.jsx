import { useEffect, useState } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Theme Functionality
  const theme = useSelector((state) => state.theme.theme);

  // Todo Functionality
  const BASE_URL = "http://localhost:3000";

  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    todoGet();
  }, []);

  // Function to fetch todos
  const todoGet = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/todos`);
      const todosData = response?.data?.data;
      setTodos(todosData);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add a new todo
  const todoAdd = async (event) => {
    event.preventDefault();

    const todoValue = event.target.children[0].value.trim();
    if (todoValue === "") {
      toast.error("Please enter a value.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/todo`, { todoContent: todoValue });
      todoGet();
      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to start editing a todo
  const startEditing = (todoId) => {
    setEditingTodoId(todoId);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      isEditing: todo.id === todoId,
    }));
    setTodos(updatedTodos);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingTodoId(null);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      isEditing: false,
    }));
    setTodos(updatedTodos);
  };

  // Function to save edited todo
  const saveEditing = async (event, todoId) => {
    event.preventDefault();

    const todoValue = event.target.children[0].value.trim();

    if (todoValue === "") {
      toast.error("Please enter a valid task.");
      return;
    }

    try {
      await axios.patch(`${BASE_URL}/api/v1/todo/${todoId}`, { todoContent: todoValue });

      const updatedTodos = todos.map(todo =>
        todo.id === todoId ? { ...todo, todoContent: todoValue, isEditing: false } : todo
      );

      setTodos(updatedTodos);
      toast.success("Todo updated successfully.");
    } catch (error) {
      console.log(error);
    } finally {
      setEditingTodoId(null);  // Reset the editing mode
    }
  };

  // Function to delete a todo
  const todoDelete = async (todoId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/todo/${todoId}`);
      toast.success(response.data.message);
      todoGet(); // Refresh the todos list
    } catch (error) {
      console.log(error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 25 } },
  };

  return (
    <div className={`flex flex-col min-h-screen text-gray-900 transition-all ${theme === 'dark' ? 'bg-[#0a1a2e] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <motion.div
        className="p-3 flex-grow flex justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={`p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 mb-32 ${theme === 'dark' ? 'bg-[#1a2634] text-white' : 'bg-white text-gray-900'}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-semibold text-center">To-Do List</h2>
          <form onSubmit={todoAdd} className="space-y-5">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a new task..."
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-400 transition-all">
              Add Task
            </button>
          </form>
          <motion.ul className="space-y-3">
            {todos.map(todo => (
              <motion.li
                key={todo.id}
                className={`flex justify-between items-center p-2 rounded-md ${theme === 'dark' ? 'bg-[#2c3e50]' : 'bg-gray-200'} hover:bg-gray-300 transition-all`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {!todo.isEditing ? (
                  <span className="cursor-pointer">{todo.todoContent}</span>
                ) : (
                  <form onSubmit={(e) => saveEditing(e, todo.id)}>
                    <input type="text" defaultValue={todo.todoContent} />
                  </form>
                )}
                <div className="flex gap-2">
                  {!todo.isEditing ? (
                    <button
                      onClick={() => startEditing(todo.id)}
                      className="text-yellow-500 hover:text-yellow-400"
                    >
                      <FaPen className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={cancelEditing}
                      className="text-orange-500 hover:text-orange-400 text-xs"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      if (todo.isEditing) {
                        saveEditing(e, todo.id);
                      } else {
                        todoDelete(todo.id);
                      }
                    }}
                    className={!todo.isEditing ? "text-red-500 hover:text-red-400" : "text-gray-500 hover:text-gray-400 text-xs"}
                  >
                    <FaTrashAlt className="h-5 w-5" />
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default App;