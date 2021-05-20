import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import "./reset.css";
import ArticlesPage from "./pages/HomePage/ArticlesPage";
import ArticlePage from "./pages/article/ArticlePage";
import PostPage from "./pages/post/PostPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        {/* <ArticlesPage /> */}
        <Switch>
          <Route path='/article/:id'>
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
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
