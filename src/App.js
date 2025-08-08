import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Routes/NavBar";
import RouteList from "./Routes/RouteList";
import NewBookApi from "./NewBookApi";
import { jwtDecode } from "jwt-decode";

// Contexts ---------------------------
export const IsLogInContext = createContext({
  isLogIn: false,
  setIsLogIn: () => {},
});

export const CurrentUserContext = createContext({
  currentUser: "",
  setCurrentUser: () => {},
});

export const AppliedContext = createContext({
  applied: false,
  setApplied: () => {},
});
// ------------------------------------

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // Ping, Check if conntected to back end -----------------------------------------------------
    async function testConnection() {
      const ok = await NewBookApi.checkConnection();
      console.log("API connected:", ok);
    }
    testConnection();

    // Creates a token --------------------------------------
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { username } = jwtDecode(token);
      setIsLogIn(true);
      setCurrentUser(username);
    } catch (err) {
      console.error("Invalid token in localStorage:", err);
      localStorage.removeItem("token");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogIn(false);
    setCurrentUser("");
  };

  const handleLogin = async (logInData) => {
    const token = await NewBookApi.authToken(logInData);
    localStorage.setItem("token", token);
    const { username } = jwtDecode(token);
    setCurrentUser(username);
    setIsLogIn(true);
  };

  const handleSignUp = async (signUpData) => {
    const token = await NewBookApi.authRegister(signUpData);
    localStorage.setItem("token", token);
    const { username } = jwtDecode(token);
    setCurrentUser(username);
    setIsLogIn(true);
  };

  const handleEditUser = async (username, EditData) => {
    const user = await NewBookApi.patchUser(username, EditData);
    setCurrentUser(user.username);
    setIsLogIn(true);
  };

  return (
    <div>
      <BrowserRouter>
        <IsLogInContext.Provider value={{ isLogIn, setIsLogIn }}>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar handleLogout={handleLogout} />
            <main>
              <RouteList
                handleLogin={handleLogin}
                handleSignUp={handleSignUp}
                handleEditUser={handleEditUser}
              />
            </main>
          </CurrentUserContext.Provider>
        </IsLogInContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
