import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const style = {
  li: `flex justify-between bg-gray-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-gray-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center text-rose-500`,
};

const Todo = ({ todo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo}
        </p>
      </div>
      <button className={style.button}>{<RiDeleteBin5Line />}</button>
    </li>
  );
};

export default Todo;