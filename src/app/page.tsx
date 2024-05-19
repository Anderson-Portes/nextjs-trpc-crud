"use client";

import { FormEvent, useState } from "react";
import api from "./_trpc/client";
import Trash from "./_components/icons/Trash";

export default function Home() {
  const todos = api.todos.all.useQuery();
  const [title, setTitle] = useState("");
  const options = {
    onSettled: () => todos.refetch(),
  };
  const createTodo = api.todos.create.useMutation(options);
  const deleteTodo = api.todos.delete.useMutation(options);
  const updateTodo = api.todos.update.useMutation(options);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;
    createTodo.mutate(title);
    setTitle("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Todos</h1>
        <div>
          {todos.isLoading && <div>Loading...</div>}
          {todos.isError && <div>Error: {todos.error.message}</div>}
          {todos.data?.length === 0 && <div className="text-red-500">No todos yet...</div>}
          {todos?.data?.map((todo) => (
            <div key={todo.id} className="flex gap-3 items-center">
              <input
                id={`check-${todo.id}`}
                type="checkbox"
                checked={todo.done || false}
                onChange={() =>
                  updateTodo.mutate({ id: todo.id, done: !todo.done })
                }
              />
              <label
                htmlFor={`check-${todo.id}`}
                className={todo.done ? "line-through" : ""}
              >
                {todo.title}
              </label>
              <span
                className="cursor-pointer"
                onClick={() => deleteTodo.mutate(todo.id)}
              >
                <Trash />
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-2xl mb-2 mt-4">Create a todo</div>
          <div className="flex gap-3 items-center">
            <label htmlFor="content">Title: </label>
            <input
              id="content"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black border-2 h-[40px]"
            />
            <button className="bg-blue-500 text-white p-2 rounded-lg">
              Add todo
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
