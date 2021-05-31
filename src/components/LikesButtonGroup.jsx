import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { handleUploadPostEmotionCount } from "../utils/firebase";

const LikesButtonGroup = (props) => {
  const { postsData, articleId, email } = props;
  const [likeIsClick, setLikeIsClick] = useState("");
  // const [happyIsClick, setHappyIsClick] = useState(postsData.emotion.happy.includes(email));
  // const [angryIsClick, setAngryIsClick] = useState(postsData.emotion.angry.includes(email));

  return (
    <div>
      <button
        style={{ backgroundColor: likeIsClick === "like" ? "green" : "gray" }}
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "like");
          likeIsClick === "like" ? setLikeIsClick("") : setLikeIsClick("like");
        }}>
        Like
      </button>
      <button
        style={{ backgroundColor: likeIsClick === "happy" ? "green" : "gray" }}
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "happy");
          likeIsClick === "happy" ? setLikeIsClick("") : setLikeIsClick("happy");
        }}>
        Happy
      </button>
      <button
        style={{ backgroundColor: likeIsClick === "angry" ? "green" : "gray" }}
        onClick={() => {
          handleUploadPostEmotionCount(articleId, email, "angry");
          likeIsClick === "angry" ? setLikeIsClick("") : setLikeIsClick("angry");
        }}>
        Angry
      </button>
    </div>
  );
};

export default LikesButtonGroup;
