
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UseMemodemo from "./useMemodemo";

import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "./todoSlice";

export default function App() {
  const [text, setText] = useState("");
 const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState(null)
// change
  const todos = useSelector((state) => state.td.todos);
  const dispatch = useDispatch();

  function handleSubmit() {
    if (!text.trim()) return;
    if (editMode) {
      dispatch(editTodo({ id: editId, text: text.trim() }));
      setEditMode(false);
    } else {
      dispatch(addTodo(text.trim()));
    }
    setText("");
  }

  return (
    <>
      <h1>Todo App</h1>

      
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter a todo"
        />

        <button onClick={handleSubmit}>
          {editMode ? "Update Todo" : "Add Todo"}
        </button>
      

      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />

          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>

          <button onClick={() => dispatch(deleteTodo(todo.id))}>
            Delete
          </button>

           <button onClick={() =>{
             setEditMode(true)
              setText(todo.text)
              setEditId(todo.id)
             handleSubmit()
           }}
            >
            Edit
          </button>
        </div>
      ))}

      <UseMemodemo todos={todos} />
    </>
  );
}
