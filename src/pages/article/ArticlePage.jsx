import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CloseButtonImg from "../../images/close-button.svg";
import { getPostsData, getUserData } from "../../utils/firebase";

const ArticlePage = () => {
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getPostsData().then((postsDocData) => {
      setPostsData(postsDocData);
      console.log(postsDocData);
      getUserData(postsDocData).then((usersDocData) => {
        setUserData(usersDocData);
      });
    });
  }, []);
  useEffect(() => {}, [userData]);

  if (postsData.length === 0 || userData.length === 0) {
    console.log(postsData, userData);
    return null;
  } else {
    return (
      <>
        {postsData &&
          postsData.map((art, index) => {
            const postTime = new Date(art.postTime.seconds * 1000);
            let likesCounter = Number(art.likes.angry.length + art.likes.happy.length);

            return (
              <>
                <StyledPostNav>
                  <StyledPostNavContainer>
                    <StyledPostGenderImgBox>
                      <img alt='' width='32px' height='32px' />
                    </StyledPostGenderImgBox>
                    <StyledPostName>{userData[0][index].name}</StyledPostName>
                    <button>
                      <img src={CloseButtonImg} alt='' width='24px' height='24px' />
                    </button>
                  </StyledPostNavContainer>
                </StyledPostNav>
                <div>{art.title}</div>
                <div>
                  <div>{art.kanBan}</div>
                  <div>{postTime.toLocaleString()}</div>
                </div>
                <span>{art.content.text}</span>
                <div>喜歡數量：{likesCounter}</div>
                <div>回應數量：{art.comment.length}</div>
                {art.comment &&
                  art.comment.map((comment) => {
                    const commentTime = new Date(comment.commentTime.seconds * 1000);
                    console.log(comment.like);
                    return (
                      <>
                        <div>我是回應人姓名：{userData[0][index].name}</div>
                        <div>我是回應樓層：{comment.floor}</div>
                        <div>我是回應時間：{commentTime.toLocaleString()}</div>
                        <div>我是愛心數：{comment.like.length}</div>
                      </>
                    );
                  })}
              </>
            );
          })}
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

export default ArticlePage;
