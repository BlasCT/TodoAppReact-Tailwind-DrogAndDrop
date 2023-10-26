import { useState } from "react";

export default function TodoCreate({ createTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(title[0].trim());
    if (title[0].trim() === "") {
      return console.log("No hay datos");
    }

    createTodo(title);
    setTitle("");
  };

  const handleChangeForm = (e) => {
    setTitle([e.target.value]);
  };

  return (
    <form
      className="bg-white rounded-lg overflow-hidden py-4 flex gap-4 items-center px-4 dark:bg-gray-800 transition-all duration-700"
      onSubmit={handleSubmitForm}
    >
      <span className="rounded-full border-2 w-5 h-5 inline-block "></span>
      <input
        className="w-full text-gray-400 outline-none dark:bg-gray-800 transition-all duration-700"
        type="text"
        placeholder="Create a new todo..."
        onChange={handleChangeForm}
        value={title}
      />
    </form>
  );
}
