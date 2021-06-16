import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import HotSortIcon from "../icons/HotSortIcon";
import TickIcon from "../icons/TickIcon";

export default function DropDownMenu(props) {
  const { setPostsSort } = props;
  const [buttonText, setButtonText] = useState("熱門");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuItemClick, setMenuItemClick] = useState("");

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles({
    menu: {
      "& .MuiPaper-root ul li": {
        display: "flex",
      },
    },
  });

  const classes = useStyles();

  return (
    <StyledDropDownMenu>
      <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
        {buttonText}
      </Button>
      <Menu
        className={classes.menu}
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <StyledMenuItem
          style={{ color: isMenuItemClick === "熱門" ? "rgb(51, 151, 207)" : " rgba(0, 0, 0, 0.75)" }}
          onClick={(e) => {
            isMenuItemClick === "熱門" ? setMenuItemClick("") : setMenuItemClick("熱門");
            setPostsSort(e.target.textContent);
            setButtonText(e.target.textContent);
            handleClose();
          }}>
          <FontAwesomeIcon
            icon={faFire}
            size='sm'
            style={{ color: isMenuItemClick === "熱門" ? "rgb(51, 151, 207)" : " rgba(0, 0, 0, 0.35)" }}
          />
          熱門
          <StyledTickIconContainer style={{ display: isMenuItemClick === "熱門" ? "flex" : "none" }}>
            <TickIcon />
          </StyledTickIconContainer>
        </StyledMenuItem>
        <StyledMenuItem
          style={{ color: isMenuItemClick === "最新" ? "rgb(51, 151, 207)" : " rgba(0, 0, 0, 0.75)" }}
          onClick={(e) => {
            isMenuItemClick === "最新" ? setMenuItemClick("") : setMenuItemClick("最新");
            setPostsSort(e.target.textContent);
            setButtonText(e.target.textContent);
            handleClose();
          }}>
          <HotSortIcon isMenuItemClick={isMenuItemClick} />
          最新
          <StyledTickIconContainer style={{ display: isMenuItemClick === "最新" ? "flex" : "none" }}>
            <TickIcon />
          </StyledTickIconContainer>
        </StyledMenuItem>
      </Menu>
    </StyledDropDownMenu>
  );
}

const StyledDropDownMenu = styled.div`
  display: flex;
  padding: 4px;
  line-height: 0;
  button {
    min-width: 0px;
    padding: 0px;
    color: rgba(0, 0, 0, 0.75);
  }
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;

  width: 100%;
  min-width: 160px;
  height: 40px;
  cursor: pointer;

  svg {
    width: 18px !important;
    height: 18px !important;
    margin-right: 10px;
  }
`;

const StyledTickIconContainer = styled.div`
  display: flex;
  flex-grow: 1;

  svg {
    display: flex;
    flex-grow: 1;
    width: 18px;
    height: 18px;
    padding-left: 40px;
    fill: rgb(51, 151, 207);
  }
`;
