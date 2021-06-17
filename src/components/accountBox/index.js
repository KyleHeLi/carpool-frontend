import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { SignupForm } from "./signupForm";
import { AccountContext } from "./accountContext";

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8pem;
  padding-bottom: 5em;
`;

// CSS reference websites:
// 1. https://cssgradient.io/
// 2. https://flatuicolors.com/
const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -290px;
  left: -70px;
  transform: rotate(60deg);
  background: rgb(243, 156, 18);
  background: linear-gradient(
    58deg,
    rgba(243, 156, 18, 1) 20%,
    rgba(241, 196, 15, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
  margin-left: 30px;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
  margin-left: 30px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 1em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox({ setToken }) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpendingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpendingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpendingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer className="box-container">
        <TopContainer className="top-container">
          <BackDrop
            className="back-drop"
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer className="header-container">
              <HeaderText className="header-text">Welcome</HeaderText>
              <HeaderText className="header-text">Back</HeaderText>
              <SmallText className="small-text">
                Please sign-in to continue!
              </SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer className="header-container">
              <HeaderText className="header-text">Create</HeaderText>
              <HeaderText className="header-text">Account</HeaderText>
              <SmallText className="small-text">
                Please sign-up to continue!
              </SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer className="inner-container">
          {active === "signin" && (
            <LoginForm className="login-form" setToken={setToken} />
          )}
          {active === "signup" && <SignupForm className="signup-form" />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
