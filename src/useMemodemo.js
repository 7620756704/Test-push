
import { useMemo, useState } from "react";

function UseMemodemo({ todos }) {
  const [count, setCount] = useState(0);

  const completedTodos = useMemo(() => {
    console.log("Filtering todos...");

    return todos.filter((todo) => todo.completed);
  }, [todos]);

  return (
    <div>
      <h3>Completed todos: {completedTodos.length}</h3>

      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}

export default UseMemodemo;
