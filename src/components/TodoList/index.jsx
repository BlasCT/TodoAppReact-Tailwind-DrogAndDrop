import TodoItem from "./TodoItem";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function TodoList({ todos, removeTodo, updateTodo }) {
  return (
    <Droppable droppableId="todos">
      {(droppableProvided) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className="bg-white overflow-hidden dark:bg-gray-900 transition-all duration-700 rounded-t-lg [&>article]:p-4  mt-8"
        >
          {todos.map((todo, index) => {
            return (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvided) => (
                  <TodoItem
                    ref={draggableProvided.innerRef}
                    task={todo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    {...draggableProvided.dragHandleProps}
                    {...draggableProvided.draggableProps}
                  />
                )}
              </Draggable>
            );
          })}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
