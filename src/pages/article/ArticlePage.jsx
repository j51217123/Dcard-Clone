import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import EmotionButtonGroup from "../../components/common/EmotionButtonGroup";
import { GirlIcon, BoyIcon, GenderDIcon } from "../../components/icons/GenderIcons";
import { getSinglePostData, getSingleUserData, handlePostComment, getMemberInfo } from "../../utils/firebase";
import ModalCloseButtonIcon from "../../components/icons/CloseButtonIcon";
import UploadImgIcon from "../../components/icons/UploadImgIcon";
import ArticleComment from "./ArticleComment";

const ArticlePage = (props) => {
  const { modalClose } = props;
  const { articleId } = useParams();
  const [postData, setPostData] = useState("");
  const [userData, setUserData] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [emotionCount, setEmotionCount] = useState(0);

  useEffect(() => {
    getSinglePostData(articleId).then((postsDocData) => {
      setPostData(postsDocData);
      getSingleUserData(postsDocData).then((usersDocData) => {
        setUserData(usersDocData);
      });
    });
    getMemberInfo(({ email }) => {
      console.log(email);
      setEmail(email);
    });
  }, [articleId]);

  useEffect(() => {}, [userData]);

  const savePostContentToState = (e) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    const objURL = URL.createObjectURL(e.target.files[0]);
    console.log(objURL);
    setPreviewImgUrl(objURL);
  };

  const renderGenderIcons = () => {
    const icons = [<GirlIcon />, <BoyIcon />, <GenderDIcon />];
    const res = icons[Math.floor(Math.random() * 3)];
    return res;
  };

  if (postData === "" || userData === "") {
    return null;
  } else {
    return (
      <>
        {
          <>
            <StyledArticleNav>
              <StyledArticleNavContainer>
                <StyledGenderAndNameContainer className='StyledGenderAndNameContainer'>
                  <StyledArticleGenderImgBox>{renderGenderIcons()}</StyledArticleGenderImgBox>
                  <StyledPostName>{userData.email}</StyledPostName>
                </StyledGenderAndNameContainer>
                <StyledModalCloseButton onClick={modalClose} className='StyledModalCloseButton'>
                  <StyledCloseButtonIconContainer>
                    <ModalCloseButtonIcon />
                  </StyledCloseButtonIconContainer>
                </StyledModalCloseButton>
              </StyledArticleNavContainer>
            </StyledArticleNav>
            <StyledArticleBody>
              <StyledArticleBodyContainer>
                <StyledArticleBodyTitle>
                  <StyledArticleBodyTitleContainer>
                    <StyledArticleBodyTitleText> {postData.title}</StyledArticleBodyTitleText>
                  </StyledArticleBodyTitleContainer>
                </StyledArticleBodyTitle>
                <StyledArticleKanBanAndPostTime>
                  <StyledArticleKanBan>{postData.kanBan}</StyledArticleKanBan>
                  <StyledArticlePostTime>
                    {new Date(postData.postTime.seconds * 1000).toLocaleString()}
                  </StyledArticlePostTime>
                </StyledArticleKanBanAndPostTime>
                <StyledArticleContent>
                  <StyledArticleContentContainer>
                    <StyledArticleContentText>{postData.content}</StyledArticleContentText>
                    <StyledArticleImgContainer>
                      <StyledArticleImg src={postData.audio} alt='' />
                    </StyledArticleImgContainer>
                  </StyledArticleContentContainer>
                </StyledArticleContent>
                <StyledArticleEmotionsCounter className='StyledArticleEmotionsCounter'>
                  <StyledArticleEmotionsCounterContainer className='StyledArticleEmotionsCounterContainer'>
                    <EmotionButtonGroup
                      postData={postData}
                      articleId={articleId}
                      email={email}
                      setEmotionCount={setEmotionCount}></EmotionButtonGroup>
                    <StyledArticleEmotionsNum>{emotionCount}</StyledArticleEmotionsNum>
                    <StyledArticleCommentsNum>
                      ・回應 {postData.comment ? postData.comment.length : 0}
                    </StyledArticleCommentsNum>
                  </StyledArticleEmotionsCounterContainer>
                </StyledArticleEmotionsCounter>
              </StyledArticleBodyContainer>
            </StyledArticleBody>

            <StyledArticleComment>
              <StyledArticleCommentContainer>
                <StyledArticleCommentsTotal>
                  共 {postData.comment === undefined ? 0 : postData.comment.length} 則回應
                </StyledArticleCommentsTotal>
                {postData.comment &&
                  postData.comment.map((comment) => {
                    return (
                      <>
                        <ArticleComment comment={comment} articleId={articleId} email={email} />
                      </>
                    );
                  })}
              </StyledArticleCommentContainer>
            </StyledArticleComment>

            <StyledForm action=''>
              <div>
                <StyledContentContainer>
                  <StyledTextarea
                    placeholder='回應前請詳閱全站站規和本板板規。'
                    rows='6'
                    cols='41'
                    value={content}
                    onChange={savePostContentToState}></StyledTextarea>
                  <StyledPreviewImgContainer>
                    <StyledUnloadPreviewImg
                      style={{ display: previewImgUrl ? "block" : "none" }}
                      src={previewImgUrl}
                      alt=''
                    />
                  </StyledPreviewImgContainer>
                </StyledContentContainer>
              </div>
              <StyledCommentUpload>
                <StyledUploadImgButtonContainer className='StyledUploadImgButtonContainer'>
                  <StyledUploadImgButton>
                    <StyledUploadImgLabel htmlFor='uploadImgId'>
                      <UploadImgIcon />
                      <StyledUploadImgInput type='file' id='uploadImgId' onChange={handleChange} multiple />
                    </StyledUploadImgLabel>
                  </StyledUploadImgButton>
                </StyledUploadImgButtonContainer>
                <StyledPostCommentButton
                  disabled={content.length === 0 ? "disabled" : ""}
                  onClick={(e) => {
                    handlePostComment(e, image, articleId, content, email).then((c) => {
                      if (postData.comment) {
                        setPostData({ ...postData, comment: [...postData.comment, c] });
                        setContent("");
                        setPreviewImgUrl("");
                      } else {
                        setPostData({ ...postData, comment: [c] });
                        setContent("");
                        setPreviewImgUrl("");
                      }
                    });
                  }}>
                  送出
                </StyledPostCommentButton>
              </StyledCommentUpload>
            </StyledForm>
          </>
        }
      </>
    );
  }
};

const StyledArticleNav = styled.div`
  display: block;
`;

const StyledArticleNavContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 60px 22px;
`;

const StyledArticleGenderImgBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const StyledGenderAndNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledModalCloseButton = styled.button`
  padding: 0px 0px 0px 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledCloseButtonIconContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    fill: rgb(196, 196, 196);
  }
`;

const StyledArticleBody = styled.div``;

const StyledArticleBodyContainer = styled.div`
  background: rgb(255, 255, 255);
  padding: 0px 60px;
`;

const StyledArticleBodyTitle = styled.div`
  display: flex;
  align-items: center;
`;

const StyledArticleBodyTitleContainer = styled.div`
  flex: 1 1 0%;
  overflow: hidden;
`;

const StyledArticleBodyTitleText = styled.h1`
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.95);
`;

const StyledArticleKanBanAndPostTime = styled.div`
  font-size: 14px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 12px;
`;

const StyledArticleKanBan = styled.div`
  color: rgba(0, 0, 0, 0.35);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #3397cf;

  ::after {
    content: "·";
    padding: 0px 0.5em;
  }
`;

const StyledArticlePostTime = styled.div`
  color: rgba(0, 0, 0, 0.35);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledArticleContent = styled.div`
  padding: 20px 0px 20px;
`;

const StyledArticleContentContainer = styled.div`
  font-weight: 400;
  font-size: 16px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.75);
  line-height: 28px;
`;

const StyledArticleContentText = styled.div`
  white-space: break-spaces;
  word-break: break-word;
`;

const StyledArticleEmotionsCounter = styled.div`
  background: rgb(255, 255, 255);
`;

const StyledArticleEmotionsCounterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 0px 20px 0px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
`;

const StyledArticleEmotionsNum = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
`;

const StyledArticleCommentsNum = styled.div`
  display: flex;
`;

const StyledArticleCommentsTotal = styled.div`
  display: flex;
  padding: 0px 60px;
  background-color: transparent;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.5);
  padding-bottom: 4px;
`;

const StyledArticleComment = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  background: rgb(245, 245, 245);
`;

const StyledArticleCommentContainer = styled.div`
  flex: 1 1 0%;
  padding: 40px 0px;
`;

const StyledPostName = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
  text-align: left;
`;

const StyledArticleImgContainer = styled.div`
  margin: 20px 0px;
  height: auto;
  max-height: 60vh;
  display: inline-block;
  width: auto;
  height: 60vh;
  max-width: 100%;
  max-height: var(--max-height);
  cursor: zoom-in;
`;

const StyledArticleImg = styled.img`
  width: auto;
  height: var(--height);
  max-width: 100%;
  max-height: var(--max-height);
`;

const StyledForm = styled.form``;

const StyledPreviewImgContainer = styled.div`
  display: flex;
  margin: auto;
`;

const StyledUnloadPreviewImg = styled.img`
  display: block;
  max-width: 100%;
  max-height: 60vh;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 680px;
  margin: 16px auto;
  padding: 0px 60px;
  font-size: 18px;
  line-height: 1.6;
  border: none;
  resize: none;
  ::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }
`;

const StyledUploadImgButton = styled.div`
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledCommentUpload = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 60px;
`;

const StyledUploadImgButtonContainer = styled.div`
  display: flex;
`;

const StyledUploadImgLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-content: center;

  svg {
    fill: rgba(0, 0, 0, 0.5);
  }
`;

const StyledUploadImgInput = styled.input`
  display: none;
`;

const StyledPostCommentButton = styled.button`
  padding: 0 8px;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  height: 44px;
`;

export default ArticlePage;
