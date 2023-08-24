import "./App.css";
import Search from "./pages/Search";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import RequireUser from "./utils/RequireUser";
import OnlyIfNotLogin from "./utils/OnlyForLogin";
import VerifyEmail from "./pages/VerifyEmail";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/CreatePost";
import Activity from "./pages/Activity";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/post-post" element={<CreatePost />} />
          <Route path="/activity" element={<Activity />} />
        </Route>

        <Route element={<OnlyIfNotLogin />}>
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
