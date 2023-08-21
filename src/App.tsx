import React from "react";
// import "./App.scss";
import YotubeForm from "./components/YotubeForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./components/TodoList";

const client = new QueryClient();

function App() {
  return (
    <div className="App">
      {/* <YotubeForm /> */}
      <QueryClientProvider client={client}>
        <TodoList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
