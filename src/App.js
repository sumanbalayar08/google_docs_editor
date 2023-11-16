import "./App.css";
import Editor from "./Components/Editor";
import Docs from "./Components/Docs";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Docs />} />
        <Route path="/doc/:iddocs" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
