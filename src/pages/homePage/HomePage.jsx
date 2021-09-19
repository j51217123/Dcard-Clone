import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { getPostsData, getKanBansData } from "../../utils/firebase";
import { GirlIcon, BoyIcon, GenderDIcon } from "../../components/icons/GenderIcons";
import { CommentIcon } from "../../components/icons/CommentIcons";
import EmotionButtonGroup from "../../components/common/EmotionButtonGroup";
import DropDownMenu from "../../components/common/DropDownMenu";
import SideBar from "./SideBar";
import BannerImg from "../../images/banner.png";

const ArticlesPage = () => {
  let { kanBanName } = useParams();
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.postsData);

  let location = useLocation();
  const [kanBansData, setKanBansData] = useState("");
  const [postsSort, setPostsSort] = useState("");
  const [isMenuItemClick, setMenuItemClick] = useState("");

  useEffect(() => {
    getPostsDataToHomePage();
    getKanBansDataToHomePage();
    renderGenderIcons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPostsDataToHomePage = async () => {
    const getFireStorePostsData = await getPostsData();
    dispatch({ type: "SET_POST_DATA", data: getFireStorePostsData });
  };

  const getKanBansDataToHomePage = async () => {
    const getFireStoreKanBansData = await getKanBansData();
    setKanBansData(getFireStoreKanBansData);
  };

  const renderGenderIcons = () => {
    const icons = [<GirlIcon />, <BoyIcon />, <GenderDIcon />];
    const res = icons[Math.floor(Math.random() * 3)];
    return res;
  };

  const sortedPostsData = [...postsData];

  sortedPostsData.sort((a, b) => {
    if (postsSort === "最新") {
      return b.postTime.seconds - a.postTime.seconds;
    } else if (postsSort === "熱門") {
      return (
        b.emotion.like.length +
        b.emotion.angry.length +
        b.emotion.happy.length -
        (a.emotion.like.length + a.emotion.angry.length + a.emotion.happy.length)
      );
    }
    return sortedPostsData;
  });

  const setOpenHidden = () => {
    document.body.style.overflow = "hidden";
  };

  return (
    <StyledBody>
      <StyledBodyContainer className="StyledBodyContainer">
        <SideBar kanBansData={kanBansData} setPostsSort={setPostsSort} />
        <StyledMain>
          <StyledMainContainer>
            <StyledMainHeader>
              <StyledSortDes>文章排序依</StyledSortDes>
              <StyledSortContainer>
                <StyledSortSelector className="StyledSortSelector">
                  <DropDownMenu setPostsSort={setPostsSort} />
                </StyledSortSelector>
                <StyledFaCaretDownIconContainer>
                  <FontAwesomeIcon icon={faCaretDown} />
                </StyledFaCaretDownIconContainer>
              </StyledSortContainer>
            </StyledMainHeader>
            <StyledMobileMainHeader>
              <StyledMobileMainHeaderContainer>
                <StyledMobileMainHeaderLink
                  style={{
                    color: isMenuItemClick === "熱門" ? "rgba(0, 0, 0, 0.75)" : " rgba(0, 0, 0, 0.35)",
                    borderBottom: isMenuItemClick === "熱門" ? "3px solid rgb(51, 151, 207)" : "none",
                  }}
                  onClick={(e) => {
                    isMenuItemClick === "熱門" ? setMenuItemClick("") : setMenuItemClick("熱門");
                    setPostsSort(e.target.textContent);
                  }}>
                  熱門
                </StyledMobileMainHeaderLink>
                <StyledMobileMainHeaderLink
                  style={{
                    color: isMenuItemClick === "最新" ? "rgba(0, 0, 0, 0.75)" : " rgba(0, 0, 0, 0.35)",
                    borderBottom: isMenuItemClick === "最新" ? "3px solid rgb(51, 151, 207)" : "none",
                  }}
                  onClick={(e) => {
                    isMenuItemClick === "最新" ? setMenuItemClick("") : setMenuItemClick("最新");
                    setPostsSort(e.target.textContent);
                  }}>
                  最新
                </StyledMobileMainHeaderLink>
                <StyledMobileMainHeaderLink cursor>追蹤</StyledMobileMainHeaderLink>
              </StyledMobileMainHeaderContainer>
            </StyledMobileMainHeader>
            <StyledBanner>
              <StyledBannerContainer>
                <StyledBannerImg src={BannerImg} />
              </StyledBannerContainer>
            </StyledBanner>
            <StyledMainBody>
              {sortedPostsData &&
                sortedPostsData
                  .filter((art) => (kanBanName ? art.kanBan === kanBanName : true))
                  .map((art) => {
                    return (
                      <StyledArticle>
                        <Link
                          to={{
                            pathname: `/article/${art.articleId}`,
                            // This is the trick! This link sets
                            // the `background` in location state.
                            state: { background: location },
                          }}
                          onClick={setOpenHidden}
                          className="Link">
                          <StyledMainBodyContainer>
                            <StyledArticleContainer>
                              <StyledArticleKanBanAndNameContainer>
                                <StyledGenderIconContainer>{renderGenderIcons()}</StyledGenderIconContainer>
                                <StyledArticleSelectedKanBan>{art.kanBan}．</StyledArticleSelectedKanBan>
                                <StyledArticleOwner className="StyledArticleOwner	">{art.name}</StyledArticleOwner>
                              </StyledArticleKanBanAndNameContainer>
                              <div>
                                <StyledArticleTitle>{art.title}</StyledArticleTitle>
                              </div>
                              <div>
                                <StyledArticleContent>{art.content}</StyledArticleContent>
                              </div>
                              <StyledEmotionAndComment>
                                <StyledEmotionAndCommentContainer>
                                  <StyledEmotionButtonGroupContainer>
                                    <EmotionButtonGroup />
                                    <StyledCount>
                                      {Number(art.emotion.angry.length) +
                                        Number(art.emotion.happy.length) +
                                        Number(art.emotion.like.length)}
                                    </StyledCount>
                                  </StyledEmotionButtonGroupContainer>
                                  <StyledCommentIconContainer>
                                    <CommentIcon />
                                    <StyledCount paddingLeft>{!art.comment ? 0 : art.comment.length}</StyledCount>
                                  </StyledCommentIconContainer>
                                </StyledEmotionAndCommentContainer>
                              </StyledEmotionAndComment>
                            </StyledArticleContainer>
                            <StyledPreviewImgContainer>
                              <StyledPreviewImg
                                src={art.audio}
                                alt=""
                                width="84px"
                                height="84px"
                                style={{ display: art.audio ? "flex" : "none" }}
                              />
                            </StyledPreviewImgContainer>
                          </StyledMainBodyContainer>
                        </Link>
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
  background-color: rgba(0, 50, 78, 1);

  @media screen and (max-width: 1024px) {
    background-color: rgb(255, 255, 255);
  }
`;

const StyledBodyContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  padding: 16px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    justify-content: center;
    padding: unset;
  }
`;

const StyledMain = styled.div`
  width: 100%;
  color: rgb(255, 255, 255);
  width: calc(100% - 208px);

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const StyledMainContainer = styled.div`
  width: 100%;
`;

const StyledMainHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 81px;
  margin: 20px 0px 0px 0px;
  padding: 20px 40px 0px;
  border-radius: 4px 4px 0px 0px;
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.35);

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const StyledMobileMainHeader = styled.div``;

const StyledMobileMainHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  width: 100%;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const StyledMobileMainHeaderLink = styled(Link)`
  display: grid;
  align-content: center;
  height: 44px;
  color: rgba(0, 0, 0, 0.35);
  font-weight: 600;
  position: relative;
  cursor: ${(props) => (props.cursor ? "not-allowed" : "pointer")};
`;

const StyledBanner = styled.div`
  width: 100%;
`;

const StyledBannerContainer = styled.div`
  width: 100%;
`;

const StyledBannerImg = styled.img`
  width: 100%;
  max-height: 280px;
  object-fit: cover;
`;

const StyledSortDes = styled.div`
  padding: 0px 10px;
  font-size: 14px;
`;

const StyledSortContainer = styled.div`
  display: flex;
  background-color: rgba(0, 16, 32, 0.06);
  border-radius: 8px;
  padding: 2px;
`;

const StyledSortSelector = styled.div`
  width: 100%;
`;

const StyledFaCaretDownIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 4px 0 0;
`;

const StyledMainBody = styled.div`
  width: 100%;
`;

const StyledMainBodyContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgb(233, 233, 233);
  margin-left: 60px;
  margin-right: 60px;
`;

const StyledArticle = styled.div`
  width: 100%;
  background-color: rgb(255, 255, 255);
`;

const StyledArticleContainer = styled.div`
  min-height: 155px;
  max-width: 100%;
  width: calc(100% - 254px);
  margin: 0px 30px 0px 0px;
  padding: 20px 0px;
  cursor: pointer;
  flex-grow: 1;

  @media screen and (max-width: 415px) {
    margin: 0px 12px 0px 0px;
    font-size: 14px;
  }
`;

const StyledArticleTitle = styled.h2`
  color: rgb(0, 0, 0);
  padding: 20px 0px;
`;

const StyledArticleKanBanAndNameContainer = styled.div`
  width: 100%;
  display: flex;
`;

const StyledArticleOwner = styled.div`
  color: rgba(0, 0, 0, 0.5);
  display: block;
  margin-top: -2px;
`;

const StyledGenderIconContainer = styled.div`
  padding-right: 8px;
`;

const StyledArticleSelectedKanBan = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

const StyledArticleContent = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.75);
`;

const StyledEmotionAndComment = styled.div`
  width: 100%;
`;

const StyledEmotionAndCommentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const StyledEmotionButtonGroupContainer = styled.div`
  display: flex;
`;

const StyledCount = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(props) => (props.paddingLeft ? "8px" : "12px")};
  color: rgba(0, 0, 0, 0.35);
`;

const StyledCommentIconContainer = styled.div`
  display: flex;
  padding: 0px 10px;
  svg {
    width: 20px;
    height: 20px;
    fill: rgb(51, 151, 207);
  }
`;

const StyledPreviewImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPreviewImg = styled.img`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

export default ArticlesPage;
