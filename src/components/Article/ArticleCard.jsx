import React from 'react';
import { PropTypes } from 'prop-types';

const ArticleCard = ({ article, classes }) => (
  <div className={`article-card ${classes}`} key={article.slug}>
    <div className="article-card__image" style={{ backgroundImage: `url("${article.cover}")` }} />
    <div className="article-card__content">
      <h3 className="article-card__content-title">
        <a href="./articles-view.html">{article.title}</a>
      </h3>
      <p className="article-card__content-text">{article.body}</p>
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

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
  classes: PropTypes.string,
};

ArticleCard.defaultProps = {
  classes: '',
};

export default ArticleCard;
