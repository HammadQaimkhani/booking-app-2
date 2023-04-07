import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import IndexPage from "./components/IndexPage";
import Register from "./components/Register";
import { UserContextProvider } from "./userContext";
import axios from "axios";
import Account from "./components/Account";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account/:subpage?' element={<Account />} />
        <Route path='/account/:subpage/:action' element={<Account />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
