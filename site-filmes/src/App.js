import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
