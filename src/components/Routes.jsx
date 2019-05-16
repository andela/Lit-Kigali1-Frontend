import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Home from './Home/Home';
import ResetPassword from './ForgotPassword/ResetPassword';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ForgotPasswordMessage from './ForgotPassword/ForgotPasswordMessage';
import Auth from './Auth';
import ConfirmedEmailMessage from './Auth/ConfirmedEmailMessage';
import ProfileView from './Profile/ProfileView';
import Article from './Article/Article';
import Articles from './Article/Articles';
import ArticlesCurrentUser from './Article/ArticlesCurrentUser';
import ErrorPage from './common/ErrorPage/ErrorPage';
import Likes from './Likes/Likes';
import Dislikes from './Dislikes/Dislikes';
import Ratings from './Rating/Ratings';
import ProfileEdit from './Profile/ProfileEdit';
import ArticleCreate from './Article/ArticleCreate';
import NotificationView from './Notification/NotificationView';

export const Routes = ({ isLoggedIn }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/forgot-password"
      render={props => (isLoggedIn ? <ForgotPassword {...props} /> : <Redirect to="/" />)}
    />
    <Route
      exact
      path="/auth"
      render={props => (!isLoggedIn ? <Auth {...props} /> : <Redirect to="/" />)}
    />
    <Route
      exact
      path="/forgot-password-message"
      render={props => (!isLoggedIn ? <ForgotPasswordMessage {...props} /> : <Redirect to="/" />)}
    />
    <Route
      exact
      path="/users/:userId/reset/:resetCode"
      render={props => (!isLoggedIn ? <ResetPassword {...props} /> : <Redirect to="/" />)}
    />
    <Route
      exact
      path="/users/:userId/confirm_email/:confirmationCode"
      component={ConfirmedEmailMessage}
    />
    <Route exact path="/articles/create" component={ArticleCreate} />
    <Route exact path="/profiles/:username" component={ProfileView} />
    <Route exact path="/articles" component={Articles} />
    <Route exact path="/articles/:articleSlug" component={Article} />
    <Route
      exact
      path="/my-articles"
      render={props => (isLoggedIn ? <ArticlesCurrentUser {...props} /> : <Redirect to="/auth" />)}
    />
    <Route exact path="/articles/:articleSlug" component={Article} />
    <Route exact path="/articles/:articleSlug/ratings" component={Ratings} />
    <Route exact path="/articles" component={Articles} />
    <Route exact path="/articles/:articleSlug/likes" component={Likes} />
    <Route exact path="/articles/:articleSlug/dislikes" component={Dislikes} />
    <Route exact path="/profile" component={ProfileEdit} />
    <Route path="/error" component={ErrorPage} />
    <Route exact path="/my-articles" component={ArticlesCurrentUser} />
    <Route exact path="/articles/:articleSlug/edit" component={ArticleCreate} />
    <Route exact path="/notifications" component={NotificationView} />
    <Route path="*" component={ErrorPage} />
  </Switch>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Routes.defaultProps = {
  isLoggedIn: false,
};

export const mapStateToProps = ({ currentUser: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Routes);
