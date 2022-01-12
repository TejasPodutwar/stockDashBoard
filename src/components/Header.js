import React, { useContext } from "react";
import classes from "./Header.module.css";
import AuthContext from "../store/auth-context";

function Header() {
  const ctx = useContext(AuthContext);
  return (
    <header className={classes["header"]}>
      <div className={classes["main-heading"]}>Stock Analyz</div>
      {ctx.isLoggedIn && (
        <button className={classes["logout_btn"]} onClick={ctx.onLogout}>
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
