import "./App.css";
import Editor from "./Components/Editor";
import Docs from "./Components/Docs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Docs />} />
        <Route path="/doc/:iddocs" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
