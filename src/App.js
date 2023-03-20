import React from "react";

// adding tailwind styles
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-br from-[#00FF87] to-[#60EFFF]`,
  container: `bg-slate-50 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center p-2 text-gray-800`,
  form: `flex justify-between`,
  input: `border p-2 my-2 w-full text-xl rounded-md italic focus:outline-indigo-400`,
  button: `border p-2 rounded-md my-2 ml-2 bg-indigo-400 text-slate-100 text-xl cursor-pointer`,
  count: `p-2 text-center`,
};


function App() {
  return (
    // Background Container
    <div className={style.bg}>
      {/* Main Container where the form will be added */}
      <div className={style.container}>
        <h3 className={style.heading}>📝 To-do App</h3>
        {/* Form to input tasks/todos */}
        <form className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Enter your task"
          />
          <button className={style.button}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
