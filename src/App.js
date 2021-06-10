import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
// import SimpleBar from "simplebar";

import "./reset.css";
import "./App.css";
// import "simplebar/dist/simplebar.css";
import HomePage from "./pages/homePage/HomePage";
import ArticlePage from "./pages/article/ArticlePage";
import PostPage from "./pages/post/PostPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import MobileKanBansPage from "./pages/homePage/MobileKanBansPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticleModal from "./utils/articleModal";

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    // <BrowserRouter>
    <StyledApp>
      <Header />
      <Switch location={background || location}>
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
      <Footer />
    </StyledApp>
    // </BrowserRouter>
  );
}

const StyledApp = styled.div`
  /* width: 100%;
  margin: 0 auto; */
`;

export default App;
