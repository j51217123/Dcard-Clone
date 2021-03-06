import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import OcardImg from "../../images/Ocard.svg";
import { HamMenuIcon } from "../icons/NavigationIcons";
import { getPostsData, getMemberInfo } from "../../utils/firebase";
import NavigationIconGroup from "../common/NavigationIconGroup";
import MobileKanBansPage from "../../pages/homePage/MobileKanBansPage";

const Header = () => {
  const [memberInfo, setMemberInfo] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.postsData);

  useEffect(() => {
    const unsubscribe = getMemberInfoToHeader();
    return () => {
      unsubscribe();
    };
  }, []);

  const getMemberInfoToHeader = (email) => {
    getMemberInfo(({ email }) => {
      setMemberInfo(email);
    });
  };

  const getSearchValue = (e) => {
    setSearchInfo(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setSearchInfo("");
    }
  };

  const handleSearch = () => {
    const searchResult = postsData.filter((postData) => postData.title.includes(searchInfo));
    dispatch({ type: "SET_POST_DATA", data: searchResult });
    setSearchInfo("");
  };

  const getAllPostsData = async () => {
    const getFireStorePostsData = await getPostsData();
    dispatch({ type: "SET_POST_DATA", data: getFireStorePostsData });
  };

  return (
    <StyledHeader>
      {isOpen ? <MobileKanBansPage setIsOpen={setIsOpen} /> : ""}
      <StyledHeaderContainer className="StyledHeaderContainer">
        <StyledHamMenuContainer
          onClick={() => {
            setIsOpen(true);
          }}>
          <HamMenuIcon />
        </StyledHamMenuContainer>
        <StyledLogoAndSearchBar>
          <StyledLogoContainer>
            <StyledLogoLink to="/" onClick={getAllPostsData}>
              <StyledLogoImg src={OcardImg} alt="Ocard" />
            </StyledLogoLink>
          </StyledLogoContainer>
          <StyledSearchBar>
            <StyledSearchBarContainer>
              <StyledSearchBarInput
                type="text"
                placeholder="??????"
                value={searchInfo}
                onChange={getSearchValue}
                onKeyDown={handleKeyPress}
              />
              <StyledSearchBarButton onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </StyledSearchBarButton>
            </StyledSearchBarContainer>
          </StyledSearchBar>
        </StyledLogoAndSearchBar>
        {memberInfo ? (
          <NavigationIconGroup />
        ) : (
          <StyledLoginContainer>
            <StyledLoginLink to="/login">
              <StyledLoginSpan>?????? / ??????</StyledLoginSpan>
            </StyledLoginLink>
          </StyledLoginContainer>
        )}
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
  padding: 0 20px 0 48px;

  @media screen and (max-width: 1024px) {
    padding: 0 24px;
  }

  @media screen and (max-width: 450px) {
    padding: 0 18px;
  }

  @media screen and (max-width: 375px) {
    padding: 0 9px;
  }
`;

const StyledHamMenuContainer = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: flex;
    margin-right: 24px;
    cursor: pointer;
  }
`;

const StyledLogoAndSearchBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const StyledLogoContainer = styled.div`
  height: 30px;
  min-width: 70px;
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

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StyledSearchBarContainer = styled.div`
  display: flex;
  width: 80%;
  min-width: 150px;
  height: 30px;
  margin: 0 32px;
  border-radius: 4px;
  overflow: hidden;
`;

const StyledSearchBarInput = styled.input`
  background-color: rgb(0, 88, 138);
  width: 80%;
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
  padding: 0 12px;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 88, 138);
  border-radius: 0 4px 4px 0;
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
