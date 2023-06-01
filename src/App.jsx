import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useCreateContext } from "./Context/CreateContext";
import CreateRabbitHoles from "./Pages/CreateRabbitHoles";

function App() {
  const { count, setCount } = useCreateContext();
  return (
    <div className="App">
      <CreateRabbitHoles></CreateRabbitHoles>
    </div>
  );
}

export default App;
