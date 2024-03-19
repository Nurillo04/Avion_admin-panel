import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashSaidBar from "./components/SaidBar";
import AddProducts from "./Pages/AddProducts";
import AllProducts from "./Pages/AllProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/add" element={<AddProducts />} />
        <Route path="/dashSaidbar" element={<DashSaidBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
