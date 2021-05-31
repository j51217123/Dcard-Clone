import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import LogoImg from "../images/logo.svg";

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledLogoAndSearchBar>
          <StyledLogoContainer>
            <StyledLogoLink to='/'>
              <StyledLogoImg src={LogoImg} alt='Dcard' />
            </StyledLogoLink>
          </StyledLogoContainer>
          <StyledSearchBar>
            <StyledSearchBarContainer>
              <StyledSearchBarInput type='text' placeholder='搜尋' />
              <StyledSearchBarButton>
                <FontAwesomeIcon icon={faSearch} />
              </StyledSearchBarButton>
            </StyledSearchBarContainer>
          </StyledSearchBar>
        </StyledLogoAndSearchBar>
        <StyledLoginContainer>
          <StyledLoginLink to='/login'>
            <StyledLoginSpan>註冊 / 登入</StyledLoginSpan>
          </StyledLoginLink>
        </StyledLoginContainer>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100%;
  height: 48px;
  background-color: rgb(0, 106, 166);
`;

const StyledHeaderContainer = styled.div`
  max-width: 1280px;
  height: 100%;
  display: flex;
  align-items: center;
  margin: auto;
  padding: 0 36px;

  @media screen and (max-width: 450px) {
    padding: 0 18px;
  }

  @media screen and (max-width: 375px) {
    padding: 0 9px;
  }
`;

const StyledLogoAndSearchBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const StyledLogoContainer = styled.div`
  height: 30px;
`;

const StyledLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledLogoImg = styled.img`
  height: 100%;

  @media screen and (max-width: 450px) {
    height: 70%;
  }
`;

const StyledSearchBar = styled.div`
  display: flex;
  width: 100%;
`;

const StyledSearchBarContainer = styled.div`
  display: flex;
  width: 40%;
  min-width: 150px;
  height: 30px;
  margin: 0 32px;
  border-radius: 4px;
  overflow: hidden;
`;

const StyledSearchBarInput = styled.input`
  background-color: rgb(0, 88, 138);
  width: 100%;
  height: 100%;
  padding: 0px 8px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  border: none;
  outline: none;

  &::placeholder {
    color: #bfd5e2;
  }
`;

const StyledSearchBarButton = styled.button`
  background-color: rgb(0, 106, 166);
  display: flex;
  padding: 0 9px;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 88, 138);
  outline: none;
  align-items: center;
  cursor: pointer;
`;

const StyledLoginContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledLoginLink = styled(Link)`
  padding: 0 16px;

  @media screen and (max-width: 450px) {
    padding: 0 8px;
  }
`;

const StyledLoginSpan = styled.span`
  color: rgb(255, 255, 255);
  white-space: nowrap;
`;

export default Header;
