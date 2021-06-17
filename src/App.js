import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import styled from "styled-components";

// Stylesheet
import "./css/App.css";

// Component files
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Preferences from "./components/Preferences";
import useToken from "./components/custom/useToken";
import NotMatch from "./pages/NotMatch";
import { AccountBox } from "./components/accountBox";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  // const { token, setToken } = useToken();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { path } = useRouteMatch();

  useEffect(() => {
    console.log("token: ", token);
    console.log("path: ", path);
  });

  const login = () => {
    return (
      <>
        <Navbar />

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route path="/sign-in">
                <Login setToken={setToken} />
              </Route>
              <Route path="/sign-up">
                <SignUp />
              </Route>
              <Route path="*">
                <Login setToken={setToken} />
              </Route>
            </Switch>
          </div>
        </div>
      </>
    );
  };

  const dashboard = () => {
    return (
      <div className="dashboard-wrapper">
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="*">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    );
  };

  // return <div className="App">{!token ? login() : dashboard()}</div>;
  return (
    <AppContainer>
      {!token ? <AccountBox setToken={setToken} /> : dashboard()}
    </AppContainer>
  );
};

export default App;
