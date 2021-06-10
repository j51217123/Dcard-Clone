import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faFire, faStore, faGamepad } from "@fortawesome/free-solid-svg-icons";

const SideBar = (props) => {
  const { kanBansData } = props;
  return (
    <StyledSideBar>
      <StyledSideBarContainer>
        <StyledSideBarLink to='/'>
          <StyledSideBarLogo>
            <FontAwesomeIcon icon={faListAlt} />
          </StyledSideBarLogo>
          <StyledSideBarLogoName>所有看板</StyledSideBarLogoName>
        </StyledSideBarLink>
        <StyledSideBarLink to='/'>
          <StyledSideBarLogo>
            <FontAwesomeIcon icon={faFire} />
          </StyledSideBarLogo>
          <StyledSideBarLogoName>即時熱門看板</StyledSideBarLogoName>
        </StyledSideBarLink>
        <StyledSideBarLink to='/'>
          <StyledSideBarLogo>
            <FontAwesomeIcon icon={faStore} />
          </StyledSideBarLogo>
          <StyledSideBarLogoName>好物研究室</StyledSideBarLogoName>
        </StyledSideBarLink>
        <StyledSideBarLink to='/'>
          <StyledSideBarLogo>
            <FontAwesomeIcon icon={faGamepad} />
          </StyledSideBarLogo>
          <StyledSideBarLogoName>遊戲專區</StyledSideBarLogoName>
        </StyledSideBarLink>
        <StyledSideBarSelectedKanBan>
          <StyledSideBarSelectedKanBanContainer>Dcard 精選看板</StyledSideBarSelectedKanBanContainer>
          {kanBansData &&
            kanBansData.map((kanBan) => {
              return (
                <StyledSideBarLink to={`/${kanBan.name}`}>
                  <StyledSideBarLogo>
                    <StyledSideBarIcon src={kanBan.icon} />
                  </StyledSideBarLogo>
                  <StyledSideBarLogoName>{kanBan.name}</StyledSideBarLogoName>
                </StyledSideBarLink>
              );
            })}
        </StyledSideBarSelectedKanBan>
      </StyledSideBarContainer>
    </StyledSideBar>
  );
};

const StyledSideBar = styled.div`
  width: 188px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StyledSideBarContainer = styled.div`
  width: 100%;
  max-width: 188px;
  margin: 20px 0px;
`;

const StyledSideBarLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgb(255, 255, 255);
  height: 44px;
  padding: 0px 10px 0px 20px;
`;

const StyledSideBarLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  border-radius: 50%;
`;

const StyledSideBarLogoName = styled.div`
  width: 100%;
  margin: 0px 10px;
`;

const StyledSideBarSelectedKanBan = styled.div``;

const StyledSideBarSelectedKanBanContainer = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  padding: 0 10px 0 20px;
  align-items: center;
  color: hsla(0, 0%, 100%, 0.35);
`;

const StyledSideBarIcon = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

export default SideBar;
