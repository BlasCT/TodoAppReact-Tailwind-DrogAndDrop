import React from "react";
import CheckIcon from "../../icons/CheckIcon";
import CroosIcon from "../../icons/CrossIcon";

// eslint-disable-next-line react/display-name
const TodoItem = React.forwardRef(
  ({ task, removeTodo, updateTodo, ...props }, ref) => {
    const { id, title, completed } = task;

    return (
      <article
        {...props}
        ref={ref}
        className="flex gap-4 border-b-2 border-gray-400 dark:bg-gray-800 transition-all duration-700"
      >
        <button
          className={`h-5 w-5 flex-none border-2 rounded-full ${
            completed
              ? " grid place-items-center bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 "
              : " inline-block"
          }`}
          onClick={() => updateTodo(id)}
        >
          {completed && <CheckIcon />}
        </button>
        <p
          className={`text-gray-600 dark:text-gray-400 grow ${
            completed && "line-through"
          }`}
        >
          {title}
        </p>
        <button className="flex-none" onClick={() => removeTodo(id)}>
          <CroosIcon />
        </button>
      </article>
    );
  }
);
export default TodoItem;
