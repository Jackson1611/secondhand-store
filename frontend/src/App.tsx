import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductList from "./components/ProductList";
function App() {
  return (
    <div className="App">
      <ProductList />
    </div>
  );
}

export default App;
