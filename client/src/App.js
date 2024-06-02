import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { useDispatch } from "react-redux";

import { useAuth } from "./hooks/use-auth";
import { authActions } from "./store/auth";
import Loader from "./components/UI/Loader";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MyListPage from "./pages/MyListPage";

const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Error = React.lazy(() => import("./pages/Error"));

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue["200"],
    },
    secondary: {
      main: lightBlue["700"],
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const { token, login, logout, userId } = useAuth();

  useEffect(() => {
    dispatch(authActions.setIsLoggedIn(!!token));
    dispatch(authActions.setToken(token));
    dispatch(authActions.setUID(userId));
    dispatch(authActions.setLogin(login));
    dispatch(authActions.setLogout(logout));
    if (!!token) {
      const storedData = JSON.parse(localStorage.getItem("gog-user-data"));
      if (storedData) {
        dispatch(authActions.setUsername(storedData.uname));
        dispatch(authActions.setName(storedData.name));
      }
    }
  }, [dispatch, token, userId, login, logout]);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={!token ? <Navigate to="/auth" /> : <Home />}
          />
          <Route path="/list" element={<MyListPage />} />
          <Route
            path="/auth"
            element={!!token ? <Navigate to="/" /> : <Auth />}
          />
          <Route
            path="/auth/forget-password"
            element={!!token ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route
            path="/auth/reset-password"
            element={!!token ? <Navigate to="/" /> : <ResetPassword />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
