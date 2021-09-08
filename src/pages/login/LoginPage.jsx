import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import LazyImg from "../../images/lazy.svg";
import { loginMember, facebookMemberLogin } from "../../utils/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const getRegisterAndLoginEmail = (e) => {
    setEmail(e.target.value);
  };

  const getRegisterAndLoginPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <StyledMain>
      <StyledMainContainer>
        <StyledLazyContainer>
          <StyledLazyImg src={LazyImg} alt='' />
          <StyledLazyTitle>年輕人都在 Dcard 上討論</StyledLazyTitle>
          <StyledLazyInfo>
            不想錯過任何有趣的話題嗎？
            <br />
            趕快加入我們吧！
          </StyledLazyInfo>
          <StyledLazyLink to='/'>
            <StyledLazyButton>
              <StyledLazyDescription>先看討論區</StyledLazyDescription>
            </StyledLazyButton>
          </StyledLazyLink>
        </StyledLazyContainer>
        <StyledLoginFormContainer>
          <StyledLoginButtonGroup>
            <StyledFacebookLoginButton>
              <StyledFacebookButtonContainer
                onClick={(e) => {
                  e.preventDefault();
                  facebookMemberLogin(history);
                }}>
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
                  placeholder='輸入信箱 / aaa@test.com'
                  type='email'
                  onChange={(e) => {
                    getRegisterAndLoginEmail(e);
                  }}></StyledLoginInput>
              </StyledLoginEmailContainer>
            </StyledLoginEmail>
            <StyledLoginPassWordContainer>
              <StyledLoginLabel>密碼</StyledLoginLabel>
              <div>
                <StyledLoginInput
                  placeholder='輸入密碼 / 123456'
                  type='password'
                  onChange={(e) => {
                    getRegisterAndLoginPassword(e);
                  }}></StyledLoginInput>
              </div>
            </StyledLoginPassWordContainer>
            <StyledLoginButton
              onClick={(e) => {
                e.preventDefault();
                loginMember(email, password, history);
              }}>
              <StyledLoginButtonText>註冊 / 登入</StyledLoginButtonText>
            </StyledLoginButton>
          </StyledLoginForm>
        </StyledLoginFormContainer>
      </StyledMainContainer>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #00324e;
  display: flex;
  align-items: center;
`;

const StyledMainContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  padding: 50px 0px;

  @media screen and (max-width: 1024px) {
    padding: 50px 30px;
  }
`;

const StyledLazyContainer = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StyledLazyImg = styled.img`
  display: block;
  max-width: 100%;
  max-height: 60vh;
  height: 250px;
  margin: auto;
  cursor: zoom-in;
  object-fit: cover;
`;

const StyledLazyTitle = styled.h1`
  color: rgb(255, 255, 255);
  font-size: 32px;
  line-height: 45px;
  margin-top: 0.67em;
`;

const StyledLazyInfo = styled.p`
  margin: 0px 0px 20px;
  color: rgb(255, 255, 255);
  font-size: 24px;
  line-height: 36px;
  opacity: 0.6;
  text-align: center;
`;

const StyledLazyLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3397cf;
`;

const StyledLazyButton = styled.button`
  outline: none;
  user-select: none;
  border: none;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  line-height: 1.25;
  background: none;
  color: #3397cf;
`;

const StyledLazyDescription = styled.div`
  min-height: 18px;
  font-size: 16px;
  text-align: center;
  opacity: 1;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledLoginFormContainer = styled.div`
  width: 100%;
  max-width: 522px;
  border-radius: 4px;
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
  background: rgb(66, 95, 156);
  color: rgb(255, 255, 255);
  outline: none;
  border: none;
  padding: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
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
  transform: translateX(-2px);
  width: calc(100% + 4px);
  margin-top: 20px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  line-height: 22px;
  border-radius: 10px;
  padding: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  outline: none;
  border: none;
  background-color: #3397cf;

  :hover {
    background-color: #5ab0db;
    color: rgb(255, 255, 255);
  }
`;

const StyledLoginButtonText = styled.div`
  text-align: center;
`;

export default LoginPage;
