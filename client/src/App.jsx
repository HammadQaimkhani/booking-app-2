import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import IndexPage from "./components/IndexPage";
import Register from "./components/Register";
import { UserContextProvider } from "./userContext";
import axios from "axios";
import ProfilePage from "./components/ProfilePage";
import Places from "./components/Places";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacePage from "./components/PlacePage";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/place/:id' element={<PlacePage />} />
        <Route path='/account' element={<ProfilePage />} />
        <Route path='/account/places' element={<Places />} />
        {/* <Route path='/account/booking' element={<Places />} /> */}
        <Route path='/account/places/new' element={<PlacesFormPage />} />
        <Route path='/account/places/:id' element={<PlacesFormPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
