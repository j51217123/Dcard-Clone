import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

// import Header from "../../components/Header";

import { handleUpload, getMemberInfo, getKanBansData } from "../../utils/firebase";

const PostPage = () => {
  const time = moment().format("YYYY MMMM Do , h:mm a");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [kanBans, setKanBan] = useState("");
  const [selectKanBan, setSelectKanBan] = useState("");

  useEffect(() => {
    getMemberInfo(({ email, uid }) => {
      setEmail(email);
      setUid(uid);
    });
    getKanBansDataToPostPage();
  }, []);

  const getKanBansDataToPostPage = async () => {
    const getFireStoreKanBansData = await getKanBansData();
    console.log(getFireStoreKanBansData);
    setKanBan(getFireStoreKanBansData);
  };

  const savePostContentToState = (e) => {
    setContent(e.target.value);
    console.log(content);
  };

  const savePostTitleToState = (e) => {
    setTitle(e.target.value);
  };

  const saveSelectKanBanToState = (e) => {
    setSelectKanBan(e.target.value);
    console.log(selectKanBan);
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
    <StyledMain>
      <StyledForm action=''>
        <StyledFormHeader>發表文章</StyledFormHeader>
        <StyledSelectKanBanContainer>
          <select onChange={saveSelectKanBanToState}>
            看板選擇
            {kanBans &&
              kanBans.map((kanBan) => {
                console.log(kanBan);
                return <option value={kanBan.name}>{kanBan.name}</option>;
              })}
          </select>
        </StyledSelectKanBanContainer>
        <StyledFormBody>
          <StyledFormOwnerInfoContainer>
            <img alt='' width='32px' height='32px' />
            <StyledOwnerNameAndPostTimeContainer>
              <div>姓名：{email}</div>
              <div>時間：{time}</div>
            </StyledOwnerNameAndPostTimeContainer>
          </StyledFormOwnerInfoContainer>
          <StyledFormTitleInput placeholder='title' onChange={savePostTitleToState} />
          <StyledContentContainer>
            <StyledTextarea placeholder='content' rows='8' cols='41' onChange={savePostContentToState}></StyledTextarea>
            <StyledPreviewImgContainer>
              <StyledUnloadPreviewImg
                style={{ display: previewImgUrl ? "block" : "none" }}
                src={previewImgUrl}
                alt=''
              />
            </StyledPreviewImgContainer>
          </StyledContentContainer>
        </StyledFormBody>
        <StyledFormFooter>
          <button>
            <input type='file' onChange={handleChange} multiple />
          </button>
          <StyledPostButton
            disabled={title.length === 0 || content.length === 0 ? "disabled" : ""}
            onClick={(e) => {
              handleUpload(e, image, title, content, uid, email, selectKanBan, time);
            }}>
            送出
          </StyledPostButton>
        </StyledFormFooter>
      </StyledForm>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  overflow: auto;
  min-height: 100vh;
  width: 100%;
  padding-top: 48px;
  background-color: rgb(255, 255, 255);
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 840px;
  min-height: calc(100vh - 48px);
  padding: 20px 80px 0px;
`;

const StyledFormHeader = styled.div`
  display: flex;
  margin: 0px auto;
  width: 100%;
  max-width: 680px;
  font-size: 16px;
  align-items: center;
  height: 60px;
  padding: 19px 17px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  color: rgb(0, 0, 0);
`;

const StyledSelectKanBanContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 680px;
  margin: 20px auto;
`;

const StyledFormBody = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0px auto;
`;

const StyledFormOwnerInfoContainer = styled.div`
  display: flex;
`;

const StyledOwnerNameAndPostTimeContainer = styled.div`
  padding: 0 8px;
`;

const StyledFormTitleInput = styled.input`
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  overflow: hidden;
  width: 100%;
  margin-top: 24px;
  border: none;
  padding: 0px;
  outline: none;
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
  display: flex;
  width: 100%;
  max-width: 680px;
  margin: 16px auto;
  font-size: 18px;
  line-height: 1.6;
  border: none;
`;

const StyledFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 680px;
  margin: 0px auto;
`;

const StyledPostButton = styled.button`
  padding: 0 8px;
`;

export default PostPage;
