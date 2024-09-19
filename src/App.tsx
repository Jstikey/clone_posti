import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/homepages/home";
import { Sidebar } from "./component/navbar/navbar";
import { Login } from "./pages/home/homepages/login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Profile } from "./component/navbar/logOut";
import { Spinner } from "./customHook/spinner/spinner";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <div className="spinnerContainer" style={{ height: "100vh" }}>
        <Spinner />
      </div>
    );

  return (
    <Router>
      <div className="App">
        <Routes>
          {user ? (
            <>
              <Route
                path="/"
                element={
                  <Sidebar>
                    <Home />
                  </Sidebar>
                }
              />
              <Route
                path="/profile"
                element={
                  <Sidebar>
                    <Profile />
                  </Sidebar>
                }
              />
            </>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          <Route path="*" element={<Login />} />{" "}
          {/* Redirect to login for unknown routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
