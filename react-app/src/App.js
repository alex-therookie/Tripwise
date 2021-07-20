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
  const user = useSelector((state) => state.session.user);
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
      <Footer />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/trips/:tripId" exact={true}>
          <TripDetail />
        </ProtectedRoute>
        <ProtectedRoute path="/new-trip" exact={true}>
          <CreateTrip />
        </ProtectedRoute>
        <ProtectedRoute path="/friends" exact={true}>
          <Friends />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
