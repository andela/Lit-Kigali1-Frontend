import React, { Component } from 'react';
import { Link } from 'react-dom';
import { PropTypes } from 'prop-types';

class ArticleCard extends Component {
  navigateTo = () => {
    const { history, url } = this.props;
    if (history && url) {
      history.push(url);
    }
  };

  render() {
    const { article, classes } = this.props;
    return (
      <div
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
          <div className="article-card__content-text">{article.body}</div>
          <div className="article-card__content-meta">
            <span>{article.readingTime}</span>
            <span>
              <i className="fa fa-eye" />
              200
            </span>
            <span>
              <i className="fa fa-thumbs-up" />
              15k
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
  history: PropTypes.object,
};

ArticleCard.defaultProps = {
  classes: '',
  url: '',
<<<<<<< HEAD
  history: {},
=======
  history: '',
>>>>>>> feat: complete view all articles
};

export default ArticleCard;
