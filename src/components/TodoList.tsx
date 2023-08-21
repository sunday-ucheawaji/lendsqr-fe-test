import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const TodoList = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data, error } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  console.log(data);

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default TodoList;
