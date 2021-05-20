import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { registerMember, loginMember } from "../../utils/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getRegisterAndLoginEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const getRegisterAndLoginPassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  return (
    <>
      <div>
        <label>信箱</label>
        <input
          placeholder='輸入信箱'
          onChange={(e) => {
            getRegisterAndLoginEmail(e);
          }}></input>
      </div>
      <div>
        <label>密碼</label>
        <input
          placeholder='輸入密碼'
          onChange={(e) => {
            getRegisterAndLoginPassword(e);
          }}></input>
      </div>
      <button
        onClick={(e) => {
          loginMember(e, email, password);
        }}>
        註冊/登入
      </button>
    </>
  );
};

export default LoginPage;
