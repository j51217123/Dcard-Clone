import React from "react";
import styled from "styled-components";

import { handleUploadPostEmotionCount } from "../../utils/firebase";
import Like from "../../images/like.png";
import Happy from "../../images/happy.png";
import Angry from "../../images/angry.png";

const EmotionButtonGroup = (props) => {
  const { setEmotionCount, articleId, email } = props; // delete postData

  return (
    <StyledEmotionButtonContainer>
      <StyledEmotionButton
        aria-label='username'
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "like").then((emotionLen) => {
            setEmotionCount(emotionLen);
          });
        }}>
        <StyledEmotionImg src={Like} alt='emotionLikeImg' />
      </StyledEmotionButton>
      <StyledEmotionButton
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "happy").then((emotionLen) => {
            setEmotionCount(emotionLen);
          });
        }}>
        <StyledEmotionImg src={Happy} alt='emotionHappyImg' />
      </StyledEmotionButton>
      <StyledEmotionButton
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "angry").then((emotionLen) => {
            setEmotionCount(emotionLen);
          });
        }}>
        <StyledEmotionImg src={Angry} alt='emotionAngryImg' />
      </StyledEmotionButton>
    </StyledEmotionButtonContainer>
  );
};

const StyledEmotionButtonContainer = styled.div`
  display: flex;
`;

const StyledEmotionButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin-right: -6px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

const StyledEmotionImg = styled.img`
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgb(255, 255, 255);
  box-sizing: content-box;

  /* :hover {
    width: 24px;
    height: 24px;
  } */
  /* ${(props) => (props.hover ? ":hover { width: 24px }" : "")} */
`;

export default EmotionButtonGroup;
