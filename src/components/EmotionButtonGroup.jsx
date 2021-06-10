import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { handleUploadPostEmotionCount } from "../utils/firebase";
import Like from "../images/like.png";
import Happy from "../images/happy.png";
import Angry from "../images/angry.png";

const EmotionButtonGroup = (props) => {
  const { setEmotionCount, postData, articleId, email } = props;
  const [likeIsClick, setLikeIsClick] = useState("");

  return (
    <StyledEmotionButtonContainer>
      <StyledEmotionButton
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "like").then((emotionLen) => {
            setEmotionCount(emotionLen);
          });
        }}>
        <StyledEmotionImg src={Like} alt='' />
      </StyledEmotionButton>
      <StyledEmotionButton
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "happy").then((emotionLen) => {
            setEmotionCount(emotionLen);
          });
        }}>
        <StyledEmotionImg src={Happy} alt='' />
      </StyledEmotionButton>
      <StyledEmotionButton
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "angry").then((emotionLen) => {
            setEmotionCount(emotionLen);
          });
        }}>
        <StyledEmotionImg src={Angry} alt='' />
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
`;

export default EmotionButtonGroup;
