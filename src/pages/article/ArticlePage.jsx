import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import styled from "styled-components";

import LikesButtonGroup from "../../components/LikesButtonGroup";
import {
  getSinglePostData,
  getSingleUserData,
  handlePostComment,
  getMemberInfo,
  handleUploadCommentEmotionCount,
} from "../../utils/firebase";
import CloseButtonImg from "../../images/close-button.svg";

const ArticlePage = () => {
  const { articleId } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState("");
  const [userData, setUserData] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [likesCount, setLikes] = useState(0);
  const [image, setImage] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  useEffect(() => {
    getSinglePostData(articleId).then((postsDocData) => {
      setPostData(postsDocData);
      console.log(postsDocData);

      getSingleUserData(postsDocData).then((usersDocData) => {
        setUserData(usersDocData);
      });
    });
    getMemberInfo(({ email }) => {
      console.log(email);
      setEmail(email);
    });
  }, []);

  useEffect(() => {}, [userData]);

  // useEffect(() => {}, [commentData]);

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

  const handleLikesCounter = () => {};

  if (postData === "" || userData === "") {
    return null;
  } else {
    console.log(postData, "postsData");
    console.log(userData, "userData");
    return (
      <>
        {
          <>
            <StyledPostNav>
              <StyledPostNavContainer>
                <StyledPostGenderImgBox>
                  <img alt='' width='32px' height='32px' />
                </StyledPostGenderImgBox>
                <StyledPostName>{userData.email}</StyledPostName>
                <button>
                  <img src={CloseButtonImg} alt='' width='24px' height='24px' />
                </button>
              </StyledPostNavContainer>
            </StyledPostNav>
            <div>{postData.title}</div>
            <div>
              <div>{postData.kanBan}</div>
              <div>我是發文時間 {new Date(postData.postTime.seconds * 1000).toLocaleString()}</div>
            </div>
            <span>{postData.content}</span>
            <div>
              Likes總數量：
              {/* {Number(postsData.likes.angry.length + postsData.likes.happy.length + postsData.likes.like.length)} */}
            </div>
            <LikesButtonGroup postsData={postData} articleId={articleId} email={email}></LikesButtonGroup>
            <div>回應數量：{postData.comment ? postData.comment.length : 0}</div>
            {postData.comment &&
              postData.comment.map((comment) => {
                return (
                  <>
                    <div>我是回應人姓名：{comment.name}</div>
                    <div>我是回應樓層：{comment.floor}</div>
                    <div>我是回應內容：{comment.content}</div>
                    <StyledUnloadPreviewImg
                      style={{ display: comment.audio ? "block" : "none" }}
                      src={comment.audio}
                      alt=''
                    />
                    <div>我是回應時間：{new Date(comment.commentTime.seconds * 1000).toLocaleString()}</div>
                    <div>我是愛心數：{comment.like.length}</div>
                    <button
                      // style={{ backgroundColor: likeIsClick ? "green" : "gray" }}
                      onClick={(e) => {
                        handleUploadCommentEmotionCount(articleId, email, "like");
                        // setLikeIsClick(!likeIsClick);
                      }}>
                      Like
                    </button>
                  </>
                );
              })}
            <StyledForm action=''>
              <div>
                <StyledContentContainer>
                  <StyledTextarea
                    placeholder='content'
                    rows='8'
                    cols='41'
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
              <div>
                <button>
                  <input type='file' onChange={handleChange} multiple />
                </button>
                <button
                  disabled={content.length === 0 ? "disabled" : ""}
                  onClick={(e) => {
                    handlePostComment(e, image, articleId, content, email).then((c) => {
                      setPostData({ ...postData, comment: [...postData.comment, c] });
                    });
                  }}>
                  送出
                </button>
              </div>
            </StyledForm>
          </>
        }
      </>
    );
  }
};

const StyledPostNav = styled.div`
  display: block;
`;

const StyledPostNavContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  padding: 40px 60px 22px;
`;

const StyledPostGenderImgBox = styled.div`
  padding-right: 8px;
`;

const StyledPostName = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
  text-align: left;
`;

const StyledForm = styled.form`
  border: 2px solid red;
`;

const StyledPreviewImgContainer = styled.div`
  display: flex;
`;

const StyledUnloadPreviewImg = styled.img`
  max-width: 180px;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
  border: none;
`;

export default ArticlePage;
