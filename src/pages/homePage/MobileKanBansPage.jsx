import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

import { getKanBansData } from "../../utils/firebase";
import CloseButtonIcon from "../../components/icons/CloseButtonIcon";

const MobileKanBansPage = (props) => {
  let { kanBanName } = useParams();
  const { setIsOpen } = props;
  const [kanBansData, setKanBansData] = useState("");

  useEffect(() => {
    getKanBansDataToHomePage();
  }, []);

  const getKanBansDataToHomePage = async () => {
    const getFireStoreKanBansData = await getKanBansData();
    // console.log(getFireStoreKanBansData);
    setKanBansData(getFireStoreKanBansData);
  };

  return (
    <>
      <Animated animationIn='bounceInUp' animationOut='fadeOut' isVisible={true} className='animate'>
        <StyledMobileKanBansPage>
          <StyledMobileKanBansPageContainer>
            <StyledMobileKanBansPageHeader>
              <StyledMobileKanBansPageHeaderContainer>
                <StyledMobileKanBansPageHeaderTitle>
                  追蹤列表
                  <StyledMobileKanBansPageCloseButton
                    onClick={() => {
                      setIsOpen(false);
                    }}>
                    <StyledCloseButtonIconContainer>
                      <CloseButtonIcon />
                    </StyledCloseButtonIconContainer>
                  </StyledMobileKanBansPageCloseButton>
                </StyledMobileKanBansPageHeaderTitle>
              </StyledMobileKanBansPageHeaderContainer>
            </StyledMobileKanBansPageHeader>
            <StyledMobileKanBansPageBody>
              <StyledMobileKanBansPageBodyContainer className='StyledMobileKanBansPageBodyContainer'>
                <StyledMobileKansPageLink to='/'>
                  <StyledMobileKansPageLogo>
                    <FontAwesomeIcon icon={faListAlt} />
                  </StyledMobileKansPageLogo>
                  <StyledMobileKansPageLogoName>所有看板</StyledMobileKansPageLogoName>
                </StyledMobileKansPageLink>
                <StyledSpecialKanBan>
                  <StyledSpecialKanBanContainer>Dcard 精選看板</StyledSpecialKanBanContainer>
                  {kanBansData &&
                    kanBansData
                      .filter((art) => (kanBanName ? art.kanBan === kanBanName : true))
                      .map((kanBan) => {
                        return (
                          <StyledMobileKansPageLink
                            to={`/${kanBan.name}`}
                            onClick={() => {
                              setIsOpen(false);
                            }}>
                            <StyledMobileKansPageLogo>
                              <StyledMobileKanBansIcon src={kanBan.icon} />
                            </StyledMobileKansPageLogo>
                            <StyledMobileKansPageLogoName>{kanBan.name}</StyledMobileKansPageLogoName>
                          </StyledMobileKansPageLink>
                        );
                      })}
                </StyledSpecialKanBan>
              </StyledMobileKanBansPageBodyContainer>
            </StyledMobileKanBansPageBody>
          </StyledMobileKanBansPageContainer>
        </StyledMobileKanBansPage>
      </Animated>
    </>
  );
};

const StyledMobileKanBansPage = styled.div`
  background-color: rgb(255, 255, 255);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 99;
  display: flex;
  flex-direction: column;
`;

const StyledMobileKanBansPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledMobileKanBansPageHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 16px;
  background: rgb(0, 106, 166);
`;

const StyledMobileKanBansPageHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
`;

const StyledMobileKanBansPageHeaderTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  position: relative;
  color: rgb(255, 255, 255);
`;

const StyledCloseButtonIconContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    fill: rgb(255, 255, 255);
  }
`;

const StyledMobileKanBansPageCloseButton = styled.button`
  display: flex;
  padding: 0px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 0px;
  color: rgb(255, 255, 255);
`;

const StyledMobileKanBansPageBody = styled.div`
  display: flex;
  width: 100%;
`;

const StyledMobileKanBansPageBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
`;

const StyledMobileKansPageLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 44px;
  color: rgba(0, 0, 0, 0.75);
  padding: 16px 16px;

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const StyledMobileKansPageLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  width: 30px;
  height: 30px;
  color: rgba(0, 0, 0, 0.35);
`;

const StyledMobileKansPageLogoName = styled.div`
  width: 100%;
  margin: 0px 8px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.75);
`;

const StyledSpecialKanBan = styled.div`
  height: calc(100% - 44px - 44px - 44px - 44px - 48px);
  overflow: scroll;
`;

const StyledSpecialKanBanContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0px 16px;
  background-color: rgb(242, 243, 244);
  color: rgb(166, 166, 166);
  font-weight: 500;
  font-size: 14px;
`;

const StyledMobileKanBansIcon = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

export default MobileKanBansPage;
