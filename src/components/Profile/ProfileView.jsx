import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArticleCard from '../Article/ArticleCard';
import userAvatar from '../../assets/images/avatar.png';
import defaultCover from '../../assets/images/cover.jpg';
import { fetchUserProfile } from '../../redux/actions/userActions';
import { onFollow } from '../../redux/actions/currentUserActions';
import Button from '../common/Button/Button';

export class ProfileView extends Component {
  componentWillMount() {
    const {
      match: {
        params: { username },
      },
      getUserProfile,
    } = this.props;
    getUserProfile(username);
  }

  shouldComponentUpdate(nextProps) {
    const {
      match: { params },
    } = this.props;
    if (params.username !== nextProps.match.params.username) {
      const { getUserProfile } = this.props;
      getUserProfile(nextProps.match.params.username);
    }
    return true;
  }

  renderArticles = () => {
    const { profile, history } = this.props;
    return profile.articles.map(article => (
      <ArticleCard
        history={history}
        url={`/articles/${article.slug}`}
        key={article.slug}
        article={article}
      />
    ));
  };

  onFollowButton = () => {
    let method = 'POST';
    const {
      onFollowUser,
      match: {
        params: { username },
      },
      profile: { followed },
    } = this.props;
    if (followed) {
      method = 'DELETE';
    }
    onFollowUser({ username, method });
  };

  renderUserAction = () => {
    const {
      profile,
      currentUser: { username },
      following,
    } = this.props;
    if (profile.username === username) {
      return (
        <Link to="/profile" className="button primary profile-meta__button">
          Edit
        </Link>
      );
    }
    return (
      <Button
        classes={`${profile.followed ? 'secondary' : 'primary'} profile-meta__button ${
          following ? 'loading' : ''
        }`}
        onClick={this.onFollowButton}
      >
        {profile.followed ? 'Unfollow' : 'Follow'}
      </Button>
    );
  };

  render() {
    const { profile, loading } = this.props;
    if (loading) return <div />;
    return (
      <section className="main-content content-margin">
        <div className="container">
          <div className="profile-view">
            <div className="profile-cover" style={{ backgroundImage: `url("${defaultCover}")` }}>
              <div className="profile-avatar-wrapper">
                <img src={profile.image || userAvatar} className="profile-avatar" alt="" />
                <p>
                  {profile.firstName}
                  {' '}
                  {profile.lastName}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 content-right">
                <div className="profile-meta">
                  <div>
                    <span className="profile-meta__text">Followers</span>
                    <span className="profile-meta__count">{profile.followers}</span>
                  </div>
                  <div>
                    <span className="profile-meta__text">Following</span>
                    <span className="profile-meta__count">{profile.followees}</span>
                  </div>
                  <div>
                    <span className="profile-meta__text">Articles</span>
                    <span className="profile-meta__count">{profile.articles.length}</span>
                  </div>
                </div>
              </div>
              <div className="col-3 content-right">{this.renderUserAction()}</div>

              <div className="profile-bio">
                {profile.bio ? <div className="bio-header">Bio:</div> : ''}
                {profile.bio ? <div className="bio-text">{profile.bio}</div> : ''}
              </div>
            </div>
            <div className="row content-margin">
              <div className="col-1" />
              <div className="col-10 mt-10">
                <h3 className="profile-meta__text">ARTICLES</h3>
                {this.renderArticles()}
                <div className="col-12 content-right">
                  <Button classes="transparent title-3">More Articles...</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ProfileView.propTypes = {
  loading: PropTypes.bool,
  following: PropTypes.bool,
  profile: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  match: PropTypes.any,
  onFollowUser: PropTypes.func.isRequired,
  history: PropTypes.object,
};

ProfileView.defaultProps = {
  match: { params: {} },
  loading: true,
  following: false,
  history: {},
};

export const mapStateToProps = ({ user: { profile, loading }, currentUser }) => ({
  loading,
  profile,
  following: currentUser.following,
  currentUser: currentUser.profile,
});

export const mapDispatchToProps = dispatch => ({
  getUserProfile: username => dispatch(fetchUserProfile(username)),
  onFollowUser: payload => dispatch(onFollow(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileView);
