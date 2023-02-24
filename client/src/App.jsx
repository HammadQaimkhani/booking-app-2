import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import IndexPage from "./components/IndexPage";
function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
