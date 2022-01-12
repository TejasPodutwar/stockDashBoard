import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import AuthContext from "./store/auth-context";
import Dashboard from "./components/Dashboard";

const App = () => {
  const ctx = React.useContext(AuthContext);
  return (
    <>
      <Header />
      <main>
        {!ctx.isLoggedIn && <UserForm />}
        {ctx.isLoggedIn && <Dashboard />}
      </main>
    </>
  );
};

export default App;
