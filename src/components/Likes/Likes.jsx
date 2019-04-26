import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LikeCard from './LikeCard';
import { fetchLikes } from '../../redux/actions/articleActions';

export class Likes extends Component {
  componentDidMount() {
    const {
      match: {
        params: { articleSlug },
      },
      onFetchLikes,
    } = this.props;
    onFetchLikes(articleSlug);
  }

  renderLikes = () => {
    const { likes } = this.props;
    if (likes.length === 0) {
      return console.log('404 Page');
    }
    return likes.map(like => <LikeCard like={like} key={likes.indexOf(like)} />);
  };

  render() {
    const { article } = this.props;
    return (
      <div className="main-content">
        <div className="ratings-container">
          <h1 className="color-primary">{article.title}</h1>
          <h2>Likes</h2>
          {this.renderLikes()}
        </div>
      </div>
    );
  }
}

Likes.propTypes = {
  article: PropTypes.object,
  likes: PropTypes.array,
  onFetchLikes: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
};

Likes.defaultProps = {
  article: {},
  likes: [],
};

export const mapStateToProps = ({ article: { article, likes } }) => ({
  article,
  likes,
});

export const mapDispatchToProps = dispatch => ({
  onFetchLikes: articleSlug => dispatch(fetchLikes(articleSlug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Likes);
