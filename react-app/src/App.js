import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Dashboard from "./components/Dashboard";
import TripDetail from "./components/TripDetail";
import Friends from "./components/Friends";
import CreateTrip from "./components/CreateTrip";
import Footer from "./components/Footer";
import { authenticate } from "./store/session";

function App() {
  // const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/sign-up">
          <SignUpForm />
        </Route>
        <ProtectedRoute exact path="/users">
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute exact path="/users/:userId">
          <User />
        </ProtectedRoute>
        <ProtectedRoute exact path="/">
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute exact path="/trips/:tripId">
          <TripDetail />
        </ProtectedRoute>
        <ProtectedRoute exact path="/new-trip">
          <CreateTrip />
        </ProtectedRoute>
        <ProtectedRoute exact path="/friends">
          <Friends />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
