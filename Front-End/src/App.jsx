import { useEffect, useState } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {

  // Todo Functionality
  const BASE_URL = "http://localhost:3000";

  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState();
  console.log(todos);

  // Todo Get Work 
  const todoGet = async () => {

    const response = await axios(`${BASE_URL}/api/v1/todos`);
    const todosData = response?.data?.data;
    console.log(todosData);

    const editAdd = todosData.map((todo) => {
      return { ...todo, isEditing: false };
    });

    setTodos(editAdd);
  };

  useEffect(() => {
    todoGet();
  }, []);

  // Todo Add Work 
  const todoAdd = async (event) => {

    try {
      event.preventDefault();

      const todoValue = event.target.children[0].value;
      if (todoValue === "") {
        toast.error("plzz Enter A Value");
        return;
      }

      await axios.post(`${BASE_URL}/api/v1/todo`,
        {
          "todoContent": todoValue
        }
      );
      todoGet();

      event.target.reset();

    } catch (error) {
      console.log(error);

    }
  }
  // Todo Edit Work
  const todoEdit = async (event, todoId) => {

    try {
      event.preventDefault();

      const todoValue = event.target.children[0].value;

      await axios.patch(`${BASE_URL}/api/v1/todo/${todoId}`,
        {
          "todoContent": todoValue,
        }
      );
      todoGet();

      event.target.reset();

    } catch (error) {
      console.log(error);

    }
  }

  // Todo Delete Work 
  const todoDelete = async (todoId) => {
    console.log("todoId", todoId);

    try {
      const { data } = await axios.delete(`${BASE_URL}/api/v1/todo/${todoId}`);

      console.log('data', data);
      toast.success(data?.message);

      todoGet();
    } catch (error) {
      console.log(error);
    }

  }

  // Animation Functionality
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
        className="p-3 flex-grow flex justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 mb-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-semibold text-center">To-Do List</h2>
          <form onSubmit={todoAdd} className='space-y-5'>
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

            {todos?.map((todo, index) => (

              <motion.li
                key={todo.id}
                className="flex justify-between items-center p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {!todo.isEditing ? <span className="cursor-pointer">{todo.todoContent}</span>
                  :
                  <form
                    onSubmit={(e) => todoEdit(e, todo.id)}
                  >
                    <input
                      type='text'
                      defaultValue={todo.todoContent}
                    />
                  </form>
                }
                <div className="flex gap-2">
                  {
                    !todo.isEditing ?
                      <button
                        onClick={
                          () => {

                            const newTodos = todos.map((todo, i) => {
                              if (i === index) {
                                todo.isEditing = true;
                              } else {
                                todo.isEditing = false;
                              };
                              return todo;
                            });
                            setTodos([...newTodos]);
                          }}
                        className="text-yellow-500 hover:text-yellow-400">
                        <FaPen className="h-5 w-5" />
                      </button>
                      : <button
                        onClick={() => {
                          const newTodos = todos.map((todo, i) => {
                            todo.isEditing = false;
                            return todo;
                          });
                          setTodos([...newTodos]);
                        }}
                        className='text-orange-500 hover:text-orange-400
                      text-xs'>
                        Cancel
                      </button>
                  }
                  {!todo.isEditing ?
                    <button
                      onClick={() => todoDelete(todo.id)}
                      className="text-red-500 hover:text-red-400">
                      <FaTrashAlt className="h-5 w-5" />
                    </button>
                    : <button className='text-gray-500 hover:text-gray-400 text-xs'>
                      Save
                    </button>
                  }
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
      <Footer />
    </div >
  );
}

export default App;