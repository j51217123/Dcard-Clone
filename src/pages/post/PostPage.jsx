import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { handleUpload, getMemberInfo } from "../../utils/firebase";
import { GenderDIcon } from "../../components/icons/GenderIcons";
import UploadImgIcon from "../../components/icons/UploadImgIcon";
import KanBansModal from "../../components/modals/KanBansModal";

const PostPage = (props) => {
  const history = useHistory();
  const time = moment().format("YYYY MMMM Do , h:mm a");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [selectedKanBan, setSelectedKanBan] = useState("");

  useEffect(() => {
    const unsubscribe = getMemberInfo(({ email, uid }) => {
      setEmail(email);
      setUid(uid);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const savePostContentToState = (e) => {
    setContent(e.target.value);
  };

  const savePostTitleToState = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    const objURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImgUrl(objURL);
  };

  return (
    <StyledMain>
      <StyledMainContainer>
        <StyledForm action=''>
          <StyledFormHeader>
            <StyledPostFeature>發表文章</StyledPostFeature>
          </StyledFormHeader>
          <StyledSelectKanBanOuterContainer>
            <StyledSelectKanBanInnerContainer>
              <StyledKanBansDes>
                <KanBansModal setSelectedKanBan={setSelectedKanBan}></KanBansModal>
              </StyledKanBansDes>
            </StyledSelectKanBanInnerContainer>
          </StyledSelectKanBanOuterContainer>
          <StyledFormBody>
            <StyledFormOwnerInfoContainer>
              <StyledGenderIconContainer>{<GenderDIcon />}</StyledGenderIconContainer>
              <StyledOwnerNameAndPostTimeContainer>
                <StyledEmailDiv>{email}</StyledEmailDiv>
                <StyledTimeDiv>{time}</StyledTimeDiv>
              </StyledOwnerNameAndPostTimeContainer>
            </StyledFormOwnerInfoContainer>
            <StyledFormTitleInput placeholder='標題' onChange={savePostTitleToState} />
            <StyledContentContainer>
              <StyledTextarea
                placeholder='內容...'
                rows='10'
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
          </StyledFormBody>
          <StyledFormFooter>
            <StyledFormFooterContainer>
              <StyledUploadImgButton>
                <StyledUploadImgLabel htmlFor='uploadImgId'>
                  <UploadImgIcon />
                  <StyledUploadImgInput type='file' id='uploadImgId' onChange={handleChange} multiple />
                </StyledUploadImgLabel>
              </StyledUploadImgButton>
              <StyledPostButton
                disabled={title.length === 0 || content.length === 0 || selectedKanBan.length === 0 ? "disabled" : ""}
                onClick={(e) => {
                  handleUpload(e, image, title, content, uid, email, selectedKanBan, time, history);
                }}>
                發佈文章
              </StyledPostButton>
            </StyledFormFooterContainer>
          </StyledFormFooter>
        </StyledForm>
      </StyledMainContainer>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
`;

const StyledMainContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 100%;
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

const StyledPostFeature = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 19px 17px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
`;

const StyledSelectKanBanOuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 680px;
  margin: 20px auto;
`;

const StyledSelectKanBanInnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  border-radius: 8px;
  padding: 6px 4px 6px 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  background-color: rgba(0, 16, 32, 0.06);
  color: rgba(0, 0, 0, 0.5);
`;

const StyledKanBansDes = styled.div`
  margin-right: 4px;

  div > button {
    outline: none;
    border: none;
  }
`;

const StyledFormBody = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0px auto;
`;

const StyledFormOwnerInfoContainer = styled.div`
  display: flex;
`;

const StyledTimeDiv = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.35);
`;

const StyledEmailDiv = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.75);
  margin-left: 2px;
`;

const StyledGenderIconContainer = styled.div`
  svg {
    width: 32px;
    height: 32px;
  }
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

  ::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }
`;

const StyledPreviewImgContainer = styled.div`
  display: flex;
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
  font-size: 18px;
  line-height: 1.6;
  border: none;
  resize: none;
  ::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }
`;

const StyledFormFooter = styled.div`
  position: fixed;
  width: 100%;
  left: 0px;
  bottom: 0px;
  background-color: rgb(255, 255, 255);
`;

const StyledFormFooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0px 24px;
  max-width: 680px;
  margin: 20px auto auto auto;
`;

const StyledUploadImgButton = styled.div`
  outline: none;
  background: none;
  border: none;
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

const StyledPostButton = styled.button`
  padding: 0 8px;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  height: 44px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export default PostPage;
