import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import Todo from "./components/Todo";
import { db } from "./services/Firebase";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// adding tailwind styles
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-br from-[#00FF87] to-[#60EFFF]`,
  container: `bg-slate-50 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center p-2 text-gray-800`,
  form: `flex justify-between`,
  input: `border p-2 my-2 w-full text-xl rounded-md italic focus:outline-indigo-400`,
  button: `border p-2 rounded-md my-2 ml-2 bg-indigo-400 text-slate-100 text-xl cursor-pointer hover:bg-indigo-500`,
  count: `p-2 text-center`,
};

function App() {
  // Variables
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const taskCollectionRef = collection(db, "todos");

  // CRUD - Create, Read, Update and Delete operations

  // Create tasks/todos
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(taskCollectionRef, {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read tasks/todos
  useEffect(() => {
    const readQuery = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(readQuery, (querySnapshot) => {
      let tasksArr = [];
      querySnapshot.forEach((doc) => {
        tasksArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(tasksArr);
    });
    return () => unsubscribe();
  }, []);

  // Update tasks/todos
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  // Delete tasks/todos
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    // Background Container
    <div className={style.bg}>
      {/* Main Container where the form will be added */}
      <div className={style.container}>
        <h3 className={style.heading}>📝 To-do App</h3>
        {/* Form to input tasks/todos */}
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Enter your task"
          />
          <button className={style.button}>
            <BsPlus size={30} />
          </button>
        </form>
        {/* Rendering tasks component */}
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {/* Adding Tasks Count */}
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
