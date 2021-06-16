import React, { useState } from "react";
import styled from "styled-components";

import { BoyIcon } from "../../components/icons/GenderIcons";
import { CommentLikeIcon } from "../../components/icons/CommentIcons";

import { handleUploadCommentEmotionCount } from "../../utils/firebase";

const ArticleComment = (props) => {
  const { comment, articleId, email } = props;
  // const [selectedFloor, setSelectedFloor] = useState(comment.floor);
  const [commentLikeCount, setCommentLikeCount] = useState(comment.like.length);
  const [commentLikeIsClick, setCommentLikeIsClick] = useState(comment.like.includes(email) ? "like" : "");

  return (
    <>
      <StyledSingleComment>
        <StyledSingleCommentContainer>
          <StyledSingleCommentHeader>
            <StyledSingleCommentImgContainer>
              <BoyIcon />
            </StyledSingleCommentImgContainer>
            <StyledSingleCommentDetailContainer className='StyledSingleCommentDetailContainer'>
              <StyledSingleCommenter>{comment.name}</StyledSingleCommenter>
              <StyledSingleCommentFloorAndTimeContainer className='StyledSingleCommentFloorAndTimeContainer'>
                <StyledSingleCommentFloorAndTimeContainer className='StyledSingleCommentFloorAndTimeContainer'>
                  B{comment.floor}・{new Date(comment.commentTime.seconds * 1000).toLocaleString()}
                </StyledSingleCommentFloorAndTimeContainer>
              </StyledSingleCommentFloorAndTimeContainer>
            </StyledSingleCommentDetailContainer>
            <StyledCommentLikeButton
              onClick={() => {
                handleUploadCommentEmotionCount(articleId, email, comment.floor).then((currentFloorCommentInfo) => {
                  setCommentLikeCount(currentFloorCommentInfo.likeLen);
                  commentLikeIsClick === "like" ? setCommentLikeIsClick("") : setCommentLikeIsClick("like");
                });
              }}>
              <StyledCommentLikeIconContainer
                style={{
                  fill: commentLikeIsClick === "like" ? "rgb(234, 92, 92)" : "rgba(0,0,0,0.2)",
                }}>
                <CommentLikeIcon />
                {commentLikeCount}
              </StyledCommentLikeIconContainer>
            </StyledCommentLikeButton>
          </StyledSingleCommentHeader>
          <StyledSingleCommentBody>
            <StyledSingleCommentBodyContainer>
              <StyledSingleCommentBodyContent>{comment.content}</StyledSingleCommentBodyContent>
            </StyledSingleCommentBodyContainer>
            <StyledUnloadPreviewImgContainer>
              <StyledUnloadPreviewImg
                style={{ display: comment.audio ? "block" : "none" }}
                src={comment.audio}
                alt=''
              />
            </StyledUnloadPreviewImgContainer>
          </StyledSingleCommentBody>
        </StyledSingleCommentContainer>
      </StyledSingleComment>
    </>
  );
};

const StyledUnloadPreviewImg = styled.img`
  display: block;
  max-width: 100%;
  max-height: 60vh;
`;

const StyledSingleComment = styled.div`
  padding: 0px 60px;
`;

const StyledSingleCommentContainer = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  padding: 16px 0px;
  border-bottom: 1px solid rgb(233, 233, 233);
`;

const StyledSingleCommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSingleCommentImgContainer = styled.label`
  display: flex;
  margin-right: 8px;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const StyledSingleCommentDetailContainer = styled.div`
  display: flex;
  min-width: 155px;
  align-items: flex-start;
  flex-grow: 1;
  flex-direction: column;
  font-weight: 500;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: -1px;
`;

const StyledCommentLikeButton = styled.button`
  outline: none;
  background: none;
  border: none;
`;

const StyledSingleCommenter = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: rgb(0, 0, 0);
`;

const StyledSingleCommentFloorAndTimeContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.5);
`;

const StyledCommentLikeIconContainer = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  svg:hover {
    fill: rgb(234, 92, 92);
  }
`;

const StyledSingleCommentBody = styled.div`
  padding-top: 20px;
  word-break: break-all;
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.75);
  line-height: 28px;
`;

const StyledSingleCommentBodyContainer = styled.div`
  white-space: break-spaces;
  word-break: break-word;
`;

const StyledSingleCommentBodyContent = styled.span``;

const StyledUnloadPreviewImgContainer = styled.div`
  margin: 20px 0px;
  display: inline-block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 60vh;
  cursor: zoom-in;
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 60vh;
  }
`;

export default ArticleComment;
