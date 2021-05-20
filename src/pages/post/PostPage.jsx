import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

// import Header from "../../components/Header";

import { handleUpload } from "../../utils/firebase";

const PostPage = () => {
  const intoPostPageTime = moment().format("MMMM Do , h:mm a");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  const savePostContentToState = (e) => {
    setContent(e.target.value);
    console.log(content);
    console.log(content.length);
  };

  const savePostTitleToState = (e) => {
    setTitle(e.target.value);
    console.log(title.length);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    const objURL = URL.createObjectURL(e.target.files[0]);
    console.log(objURL);
    setPreviewImgUrl(objURL);
  };

  return (
    <form action=''>
      <div>發表文章</div>
      <div>
        <div>看板選擇</div>
      </div>
      <div>
        <img alt='' width='32px' height='32px' />
        <div>
          <div>姓名：</div>
          <div>時間：{intoPostPageTime}</div>
        </div>
        <input placeholder='title' onChange={savePostTitleToState} />
        <StyledContentContainer>
          <StyledTextarea placeholder='content' rows='8' cols='41' onChange={savePostContentToState}></StyledTextarea>
          <StyledPreviewImgContainer>
            <StyledUnloadPreviewImg style={{ display: previewImgUrl ? "block" : "none" }} src={previewImgUrl} alt='' />
          </StyledPreviewImgContainer>
        </StyledContentContainer>
      </div>
      <div>
        <button>
          <input type='file' onChange={handleChange} multiple />
        </button>
        <button
          // disabled={title.length !== 0 && content.length !== 0 ? "" : "disabled"}
          disabled={title.length === 0 || content.length === 0 ? "disabled" : ""}
          onClick={(e) => {
            handleUpload(e, image, title, content);
          }}>
          送出
        </button>
      </div>
    </form>
  );
};

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

export default PostPage;
