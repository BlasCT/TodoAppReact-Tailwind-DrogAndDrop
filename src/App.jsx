import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "@hello-pangea/dnd";

const initialStateTodo = JSON.parse(localStorage.getItem("todos")) || [];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function App() {
  const [todo, setTodo] = useState(initialStateTodo);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todo;
      case "active":
        return todo.filter((todo) => !todo.completed);

      case "completed":
        return todo.filter((todo) => todo.completed);
      default:
        return todo;
    }
  };

  const changeFilter = (filter) => setFilter(filter);

  const createTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };

    const temp = [...todo];
    temp.unshift(newTodo);
    setTodo(temp);
  };

  const removeTodo = (id) => {
    setTodo(todo.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    const temp = todo.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodo(temp);
  };

  const computedItemsLeft = todo.filter((todo) => !todo.completed).length;
  const clearCompleted = () => {
    setTodo(todo.filter((todo) => !todo.completed));
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    setTodo((prevTasks) => reorder(prevTasks, source.index, destination.index));
  };

  return (
    <div className="bg-[url(./src/assets/images/bg-mobile-light.jpg)] dark:bg-[url(./src/assets/images/bg-desktop-dark.jpg)] md:bg-[url(./src/assets/images/bg-desktop-light.jpg)] bg-no-repeat bg-contain bg-gray-300 min-h-screen dark:bg-gray-900 transition-all duration-700 mad:dark:bg-[url(./src/assets/images/bg-mobile-dark.jpg)] ">
      <Header />
      <main className="container mx-auto px-4 mt-8 md:max-w-xl">
        <TodoCreate createTodo={createTodo} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <TodoList
            todos={filteredTodos()}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </DragDropContext>

        <TodoComputed
          computedItemsLeft={computedItemsLeft}
          clearCompleted={clearCompleted}
        />

        <TodoFilter changeFilter={changeFilter} filter={filter} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
