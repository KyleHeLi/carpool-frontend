import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";

// Stylesheet
import "./css/App.css";

// Component files
import Navbar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signup";

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
