import { Switch, Route, useLocation } from "react-router-dom";
import styled from "styled-components";

import "./reset.css";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import ArticlePage from "./pages/article/ArticlePage";
import PostPage from "./pages/post/PostPage";
import LoginPage from "./pages/login/LoginPage";
import MobileKanBansPage from "./pages/homePage/MobileKanBansPage";
import Header from "./components/common/Header";
import ArticleModal from "./components/modals/ArticleModal";

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    <StyledApp>
      <Header />
      <Switch location={background || location}>
        <Route path='/article/:articleId'>
          <ArticlePage />
        </Route>
        <Route path='/post'>
          <PostPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/:kanBanName'>
          <HomePage />
        </Route>
        <Route path='/:kanBanName'>
          <MobileKanBansPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
      {background && <Route path='/article/:articleId' children={<ArticleModal />} />}
    </StyledApp>
  );
}

const StyledApp = styled.div``;

export default App;
