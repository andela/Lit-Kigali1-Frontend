import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import ResetPassword from './ForgotPassword/ResetPassword';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ForgotPasswordMessage from './ForgotPassword/ForgotPasswordMessage';
import Auth from './Auth';
import ConfirmedEmailMessage from './Auth/ConfirmedEmailMessage';
import ProfileView from './Profile/ProfileView';
import ErrorPage from './common/ErrorPage/ErrorPage';
import Article from './Article/Article';
import Ratings from './Rating/Ratings';
import Articles from './Article/Articles';
import Likes from './Likes/Likes';
import Dislikes from './Dislikes/Dislikes';
import ProfileEdit from './Profile/ProfileEdit';
import ArticleCreate from './Article/ArticleCreate';
import Articles from './Article/Articles';
import ArticlesCurrentUser from './Article/ArticlesCurrentUser';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/auth" component={Auth} />
    <Route exact path="/forgot-password-message" component={ForgotPasswordMessage} />
    <Route exact path="/users/:userId/reset/:resetCode" component={ResetPassword} />
    <Route
      exact
      path="/users/:userId/confirm_email/:confirmationCode"
      component={ConfirmedEmailMessage}
    />
    <Route exact path="/articles/create" component={ArticleCreate} />
    <Route exact path="/profiles/:username" component={ProfileView} />
    <Route exact path="/articles/create" component={ArticleCreate} />
    <Route exact path="/articles/:articleSlug" component={Article} />
    <Route exact path="/articles/:articleSlug/ratings" component={Ratings} />
    <Route exact path="/articles" component={Articles} />
    <Route exact path="/articles/:articleSlug/likes" component={Likes} />
    <Route exact path="/articles/:articleSlug/dislikes" component={Dislikes} />
    <Route path="*" component={ErrorPage} />
    <Route exact path="/profile" component={ProfileEdit} />
    <Route path="/error" component={ErrorPage} />
    <Route exact path="/my-articles" component={ArticlesCurrentUser} />
    <Route exact path="/articles/:articleSlug/edit" component={ArticleCreate} />
    <Route path="*" component={ErrorPage} />
  </Switch>
);

export default Routes;
