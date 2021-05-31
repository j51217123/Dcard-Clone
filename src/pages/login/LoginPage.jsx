import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { loginMember } from "../../utils/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getRegisterAndLoginEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const getRegisterAndLoginPassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  return (
    <StyledMain>
      <StyledMainContainer>
        <StyledLoginButtonGroup>
          <StyledFacebookLoginButton>
            <StyledFacebookButtonContainer>
              <img src='' alt='' />
              Facebook 註冊 / 登入
            </StyledFacebookButtonContainer>
          </StyledFacebookLoginButton>
          <StyledGoogleLoginButton>
            <StyledGoogleLoginButtonContainer>
              <img src='' alt='' />
              Google 註冊 / 登入
            </StyledGoogleLoginButtonContainer>
          </StyledGoogleLoginButton>
        </StyledLoginButtonGroup>
        <StyledDemarcation>或</StyledDemarcation>
        <StyledLoginForm action=''>
          <StyledLoginEmail>
            <StyledLoginEmailContainer>
              <StyledLoginLabel>常用信箱</StyledLoginLabel>
              <StyledLoginInput
                placeholder='輸入信箱'
                onChange={(e) => {
                  getRegisterAndLoginEmail(e);
                }}></StyledLoginInput>
            </StyledLoginEmailContainer>
          </StyledLoginEmail>
          <StyledLoginPassWordContainer>
            <StyledLoginLabel>密碼</StyledLoginLabel>
            <StyledLoginInput
              placeholder='輸入密碼'
              onChange={(e) => {
                getRegisterAndLoginPassword(e);
              }}></StyledLoginInput>
          </StyledLoginPassWordContainer>
          <StyledLoginButton
            onClick={(e) => {
              loginMember(e, email, password);
            }}>
            <StyledLoginButtonText>註冊 / 登入</StyledLoginButtonText>
          </StyledLoginButton>
        </StyledLoginForm>
      </StyledMainContainer>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  height: 100vh;
  width: 100%;
  padding-top: 48px;
  background-color: #00324e;
	display: flex;
	align-items: center;
`;

const StyledMainContainer = styled.div`
  width: 100%;
  max-width: 522px;
  margin: auto;
  padding: 60px 60px;
  background-color: rgb(255, 255, 255);
`;

const StyledLoginButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFacebookLoginButton = styled.button`
  transform: translateX(-2px);
  width: calc(100% + 4px);
  background: rgb(66, 95, 156);
  color: rgb(255, 255, 255);
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 0px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledFacebookButtonContainer = styled.div`
  text-align: center;
  padding: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const StyledGoogleLoginButton = styled.button`
  transform: translateX(-2px);
  width: calc(100% + 4px);
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
`;

const StyledGoogleLoginButtonContainer = styled.div`
  text-align: center;
  padding: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const StyledDemarcation = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
  margin-top: 20px;
  ::before,
  ::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ccc;
  }
  ::before {
    margin-right: 10px;
  }
  ::after {
    margin-left: 10px;
  }
`;

const StyledLoginForm = styled.div`
  display: block;
`;

const StyledLoginEmail = styled.div``;

const StyledLoginEmailContainer = styled.div`
  margin-top: 20px;
`;

const StyledLoginPassWordContainer = styled.div`
  margin-top: 20px;
`;

const StyledLoginLabel = styled.label`
  display: block;
  padding-bottom: 6px;
  color: rgb(0, 0, 0);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const StyledLoginInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const StyledLoginButton = styled.button`
  width: calc(100% + 4px);
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
  line-height: 22px;
  border-radius: 10px;
  padding: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  outline: none;
  border: none;
`;

const StyledLoginButtonText = styled.div`
  text-align: center;
`;

export default LoginPage;
