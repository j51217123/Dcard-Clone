import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import ArticlePage from "../../pages/article/ArticlePage";

function Modal() {
  const history = useHistory();

  const setCloseHidden = () => {
    document.body.style.overflow = "auto";
  };

  const modalClose = (e) => {
    e.stopPropagation();
    history.goBack();
    setCloseHidden();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)",
      }}>
      <StyledModal
        className="modal"
        style={{
          position: "absolute",
          background: "rgb(255, 255, 255)",
          top: "50%",
          left: "50%",
          maxWidth: "800px",
          minHeight: "100%",
          width: "65%",
          height: "100%",
          overflowY: "scroll",
          transform: "translate(-50%, -50%)",
        }}>
        <ArticlePage modalClose={modalClose}></ArticlePage>
      </StyledModal>
    </div>
  );
}

const StyledModal = styled.div`
  @media screen and (max-width: 650px) {
    width: 100% !important;
  }
`;

export default Modal;
