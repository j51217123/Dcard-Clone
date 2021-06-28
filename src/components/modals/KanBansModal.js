import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { getKanBansData } from "../../utils/firebase";
import TickIcon from "../icons/TickIcon";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 7, 3),
    maxWidth: "522px",
    width: "100%",
  },
}));

export default function KanBansModal(props) {
  const { setSelectedKanBan } = props;
  const [open, setOpen] = useState(false);
  const [kanBans, setKanBan] = useState("");
  const [SelectedModalKanBan, setSelectedModalKanBan] = useState("");

  const classes = useStyles();

  useEffect(() => {
    getKanBansDataToPostPage();
  }, []);

  const getKanBansDataToPostPage = async () => {
    const getFireStoreKanBansData = await getKanBansData();
    // console.log(getFireStoreKanBansData);
    setKanBan(getFireStoreKanBansData);
  };

  const saveSelectKanBanToState = (e) => {
    // console.log(e.target.outerText);
    setSelectedKanBan(e.target.outerText);
    setSelectedModalKanBan(e.target.outerText);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledSelectKanBanButton type='button' onClick={handleOpen}>
        {SelectedModalKanBan ? SelectedModalKanBan : "點此選擇發文看板"}
        <StyledCaretDownIconContainer>
          <FontAwesomeIcon icon={faCaretDown} />
        </StyledCaretDownIconContainer>
      </StyledSelectKanBanButton>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <StyledKanBansModalContainer>
              <StyledKanBansModalHeader>
                <StyledKanBansModalHeaderTitleContainer>
                  <StyledKanBansModalHeaderTitle className='StyledKanBansModalHeaderTitle'>
                    選擇發文看板
                  </StyledKanBansModalHeaderTitle>
                </StyledKanBansModalHeaderTitleContainer>
              </StyledKanBansModalHeader>
              <StyledKanBansModalBody>
                <StyledKanBansModalBodyContainer>
                  <div data-simplebar className='simplebar'></div>

                  {kanBans &&
                    kanBans.map((kanBan) => {
                      return (
                        <>
                          <StyledKanBansOption
                            style={
                              ({
                                color:
                                  kanBan.name === SelectedModalKanBan ? "rgb(51, 151, 207)" : " rgba(0, 0, 0, 0.75)",
                              },
                              {
                                background:
                                  kanBan.name === SelectedModalKanBan ? "rgb(242, 243, 244)" : "rgb(255,255,255)",
                              })
                            }
                            onClick={(e) => {
                              saveSelectKanBanToState(e);
                              handleClose();
                            }}
                            value={kanBan.name}>
                            {kanBan.name}
                            <StyledTickIconContainer
                              style={{ display: kanBan.name === SelectedModalKanBan ? "flex" : "none" }}>
                              <TickIcon />
                            </StyledTickIconContainer>
                          </StyledKanBansOption>
                        </>
                      );
                    })}
                </StyledKanBansModalBodyContainer>
              </StyledKanBansModalBody>
            </StyledKanBansModalContainer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const StyledSelectKanBanButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const StyledCaretDownIconContainer = styled.div`
  display: flex;
  margin-left: 8px;
  svg {
    width: 24px;
    height: 24px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const StyledKanBansModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 522px;
  width: 100%;
  height: 612px;
`;

const StyledKanBansModalHeader = styled.header`
  display: flex;
  align-items: flex-start;
  padding: 20px 60px 12px 60px;
`;

const StyledKanBansModalHeaderTitleContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: center;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
`;

const StyledKanBansModalHeaderTitle = styled.div``;

const StyledKanBansModalBody = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 547px;
`;

const StyledKanBansModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 8px 0px 4px;
`;

const StyledKanBansOption = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  padding: 0px 14px;
  align-items: center;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  background: rgb(255, 255, 255);

  :hover {
    background: rgb(242, 243, 244) !important;
  }
`;

const StyledTickIconContainer = styled.div`
  display: flex;

  svg {
    width: 24px;
    height: 24px;
    fill: rgb(51, 151, 207);
  }
`;
