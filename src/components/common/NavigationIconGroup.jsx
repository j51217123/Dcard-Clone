import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { SearchIcon, PostIcon, FriendIcon, EMailBoxIcon, ProfileIcon, LogOutIcon } from "../icons/NavigationIcons";
import { logoutMember } from "../../utils/firebase";

const NavigationIconGroup = () => {
  return (
    <StyledNavigationIconGroup>
      <StyledNavigationIconGroupContainer>
        <StyledMobileSearchLink to='/'>
          <StyledNavigationIconImgContainer>
            <SearchIcon />
          </StyledNavigationIconImgContainer>
        </StyledMobileSearchLink>
        <Link to='/post'>
          <StyledNavigationIconImgContainer>
            <PostIcon />
          </StyledNavigationIconImgContainer>
        </Link>
        <Link to='/'>
          <StyledNavigationIconImgContainer fill cursor>
            <FriendIcon />
          </StyledNavigationIconImgContainer>
        </Link>
        <Link to='/'>
          <StyledNavigationIconImgContainer fill cursor>
            <EMailBoxIcon />
          </StyledNavigationIconImgContainer>
        </Link>
        <Link to='/'>
          <StyledNavigationIconImgContainer fill cursor>
            <ProfileIcon />
          </StyledNavigationIconImgContainer>
        </Link>
        <Link
          to='/'
          onClick={(e) => {
            logoutMember(e);
          }}>
          <StyledNavigationIconImgContainer>
            <LogOutIcon />
          </StyledNavigationIconImgContainer>
        </Link>
      </StyledNavigationIconGroupContainer>
    </StyledNavigationIconGroup>
  );
};

const StyledNavigationIconGroup = styled.div`
  display: flex;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const StyledNavigationIconGroupContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  min-width: 200px;
`;

const StyledNavigationIconImgContainer = styled.div`
  display: flex;
  width: 60px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  color: rgba(255, 255, 255, 0.6);
  height: 100%;
  pointer-events: all;

  svg {
    /* fill: rgb(255, 255, 255); */
    fill: ${(props) => (props.fill ? "rgba(0,0,0,0.35)" : "rgb(255, 255, 255)")};
    cursor: ${(props) => (props.cursor ? "not-allowed" : "pointer")};
    width: 24px;
    height: 24px;
  }

  @media screen and (max-width: 1024px) {
    width: 24px;
  }
`;

const StyledMobileSearchLink = styled(Link)`
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
  }
`;

export default NavigationIconGroup;
