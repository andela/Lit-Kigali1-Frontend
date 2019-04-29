import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import defaultAvatar from '../../assets/images/avatar.png';

class ArticleCard extends Component {
  navigateTo = e => {
    const { history, url } = this.props;
    const { el } = e.target.dataset;
    if (el === 'username') {
      this.toProfile();
      e.preventDefault();
      return;
    }
    if (history && url) {
      history.push(url);
    }
  };

  toProfile = () => {
    const {
      article: { author },
      history
    } = this.props;
    history.push(`/profiles/${author.username}`);
  };

  renderAuthor = () => {
    const {
      article: { author }
    } = this.props;
    if (!author) return '';
    return (
      <button
        data-el="username"
        onClick={this.toProfile}
        className="article-card__content-author"
      >
        {`@ ${author.username}`}
        <div className="user">
          <div className="user-info">
            <div
              role="presentation"
              className="user-info__header"
              data-el="username"
              onClick={this.toProfile}
            >
              <img src={author.image || defaultAvatar} alt="user avatar" />
              {`${author.firstName} ${author.lastName}`}
            </div>
          </div>
        </div>
      </button>
    );
  };

  render() {
    const { article, classes } = this.props;
    return (
      <div
        data-el="main-container"
        role="presentation"
        className={`article-card ${classes}`}
        key={article.slug}
        onClick={this.navigateTo}
      >
        <div
          className="article-card__image"
          style={{ backgroundImage: `url("${article.cover}")` }}
        />
        <div className="article-card__content">
          <h3 className="article-card__content-title">{article.title}</h3>
          <div className="article-card__content-text">
            {article.description || article.body}
          </div>
          {this.renderAuthor()}
          <div className="article-card__content-meta">
            <span>{article.readingTime}</span>
            <span>
              {article.viewsCount}
              <i className="fa fa-eye" />
            </span>
            <span>
              {article.rating}
              <i className="fa fa-star" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
  classes: PropTypes.string,
  url: PropTypes.string,
  history: PropTypes.object
};

ArticleCard.defaultProps = {
  classes: '',
  url: '',
  history: {}
};

export default ArticleCard;
