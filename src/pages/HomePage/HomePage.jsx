import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faFire, faStore, faGamepad, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { getPostsData, getKanBansData } from "../../utils/firebase";

const ArticlesPage = () => {
  const [postsData, setPostsData] = useState([]);
  const [kanBansData, setKanBansData] = useState("");

  useEffect(() => {
    getPostsDataToHomePage();
    getKanBansDataToHomePage();
  }, []);

  const getPostsDataToHomePage = async () => {
    const getFireStorePostsData = await getPostsData();
    console.log(getFireStorePostsData);
    setPostsData(getFireStorePostsData);
  };

  const getKanBansDataToHomePage = async () => {
    const getFireStoreKanBansData = await getKanBansData();
    console.log(getFireStoreKanBansData);
    setKanBansData(getFireStoreKanBansData);
  };

  return (
    <StyledBody>
      <StyledBodyContainer>
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
            <StyledSideBarSelectedKanBan>Dcard 精選看板</StyledSideBarSelectedKanBan>
            {kanBansData &&
              kanBansData.map((kanBan) => {
                return (
                  <StyledSideBarLink to='/'>
                    <StyledSideBarLogo>
                      <StyledSideBarImg src={kanBan.icon} />
                    </StyledSideBarLogo>
                    <StyledSideBarLogoName>{kanBan.name}</StyledSideBarLogoName>
                  </StyledSideBarLink>
                );
              })}
          </StyledSideBarContainer>
        </StyledSideBar>

        <StyledMain className='StyledMain'>
          <StyledMainContainer className='StyledMainContainer'>
            <StyledMainHeader className='StyledMainHeader'>
              <StyledSortDes>文章排序依</StyledSortDes>
              <StyledSortContainer>
                <div>熱門</div>
                <StyledFaCaretDownIconContainer>
                  <FontAwesomeIcon icon={faCaretDown} />
                </StyledFaCaretDownIconContainer>
              </StyledSortContainer>
            </StyledMainHeader>
            <StyledMainBody>
              {postsData &&
                postsData.map((art) => {
                  console.log(art);
                  return (
                    <StyledArticle>
                      <StyledArticleContainer>
                        <Link to={`/article/${art.articleId}`}>
                          <StyledArticleKanBanAndNameContainer>
                            <StyledArticleSelectedKanBan className='kanban'>{art.kanBan}．</StyledArticleSelectedKanBan>
                            <StyledArticleOwner className='name'>{art.name}</StyledArticleOwner>
                          </StyledArticleKanBanAndNameContainer>
                          <div>
                            <StyledArticleTitle>{art.title}</StyledArticleTitle>
                          </div>
                        </Link>
                      </StyledArticleContainer>
                    </StyledArticle>
                  );
                })}
            </StyledMainBody>
          </StyledMainContainer>
        </StyledMain>
      </StyledBodyContainer>
    </StyledBody>
  );
};

const StyledBody = styled.div`
  width: 100%;
  background-color: #00324e;
`;

const StyledBodyContainer = styled.div`
  max-width: 1280px;
  height: 100vh; // 100%
  display: flex;
  margin: 0 auto;
`;

const StyledSideBar = styled.div`
  width: 100%;
  max-width: 208px;
`;

const StyledSideBarContainer = styled.div`
  max-width: 208px;
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
  margin: 0px 10px;
`;

const StyledSideBarSelectedKanBan = styled.div`
  display: flex;
  height: 44px;
  padding: 0 10px 0 20px;
  align-items: center;
  color: hsla(0, 0%, 100%, 0.35);
`;

const StyledSideBarImg = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

const StyledMain = styled.div`
  width: 100%;
  color: rgb(255, 255, 255);
`;

const StyledMainContainer = styled.div`
  max-width: 1028px;
`;

const StyledMainHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 81px;
  margin: 20px 0px;
  padding: 20px 60px 0px;
  border-radius: 4px 4px 0px 0px;
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.35);
`;

const StyledSortDes = styled.div`
  padding: 0px 10px;
`;

const StyledSortContainer = styled.div`
  display: flex;
  padding: 6px 4px 6px 8px;
  background-color: rgba(0, 16, 32, 0.06);
  border-radius: 8px;
`;

const StyledFaCaretDownIconContainer = styled.div`
  padding: 0px 4px;
`;

const StyledMainBody = styled.div``;

const StyledArticle = styled.div`
  background-color: rgb(255, 255, 255);
`;

const StyledArticleContainer = styled.div`
  border-bottom: 1px solid #e9e9e9;
  height: 155px;
`;

const StyledArticleTitle = styled.h2`
  color: rgb(0, 0, 0);
`;

const StyledArticleKanBanAndNameContainer = styled.div`
  display: flex;
`;

const StyledArticleOwner = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

const StyledArticleSelectedKanBan = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

export default ArticlesPage;
