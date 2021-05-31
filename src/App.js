import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./reset.css";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import ArticlePage from "./pages/article/ArticlePage";
import PostPage from "./pages/post/PostPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <StyledApp>
        <Header />
        <Switch>
          <Route path='/article/:articleId'>
            <ArticlePage />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
          </Route>
          <Route path='/post'>
            <PostPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </StyledApp>
    </BrowserRouter>
  );
}

const StyledApp = styled.div`
  /* width: 100%;
  margin: 0 auto; */
`;

export default App;
