import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parser as HtmlToReact } from 'html-to-react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { fetchArticle, likeArticle, dislikeArticle } from '../../redux/actions/articleActions';
import { onUserRateArticle, setNextPath } from '../../redux/actions/currentUserActions';

export class Article extends Component {
  componentDidMount() {
    const {
      match: {
        params: { articleSlug },
      },
      getArticle,
    } = this.props;
    getArticle(articleSlug);
  }

  renderBody = () => {
    const {
      article: { body },
    } = this.props;
    return new HtmlToReact().parse(body);
  };

  renderDate = () => {
    const {
      article: { createdAt },
    } = this.props;
    return `Published On: ${moment(createdAt).format('LLLL')}`;
  };

  onSelectedRating = (e) => {
    e.stopPropagation();
    const {
      rateArticle,
      article: { slug },
    } = this.props;
    const { value } = e.target.dataset;
    rateArticle({ articleSlug: slug, rate: value });
  };

  renderTags = () => {
    const {
      article: { tagList },
    } = this.props;
    return (
      <div className="row">
        <div className="col-12 content-center">
          {tagList.map(tag => (
            <span key={tag} className="tagged">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  navigateToRatings = (e) => {
    const { url } = e.target.dataset;
    const { history } = this.props;
    history.push(url);
  };

  onLikeArticleClicked = (e) => {
    const {
      article: { slug },
      onLikeArticle,
      history,
      isLoggedIn,
      nextPath,
    } = this.props;
    if (isLoggedIn) {
      onLikeArticle(slug);
    } else {
      nextPath(`/articles/${slug}`);
      history.push('/auth');
    }
    e.preventDefault();
  };

  onDislikeArticleClicked = (e) => {
    const {
      article: { slug },
      onDislikeArticle,
      history,
      isLoggedIn,
      nextPath,
    } = this.props;
    if (isLoggedIn) {
      onDislikeArticle(slug);
    } else {
      nextPath(`/articles/${slug}`);
      history.push('/auth');
    }

    e.preventDefault();
  };

  render() {
    const {
      article, liked, disliked, likeCount, dislikeCount,
    } = this.props;
    return (
      <section className="main-content">
        <div className="container content-margin">
          <br />
          <h1 className="article-view-title">{article.title}</h1>
          <div className="row">
            <div className="col-12">
              <div
                className="article-image"
                style={{
                  backgroundImage: `url("${article.cover}")`,
                }}
              />
            </div>
            <div className="col-12">
              {this.renderBody()}
              <p className="article-date">{this.renderDate()}</p>

              <div className="row content-space-between">
                <div className="article-side-actions">
                  <span>{article.readingTime}</span>
                  <span
                    data-name="rate-btn"
                    className={`article-icon-right hover-primary margin-top ${
                      article.rated ? 'rated' : ''
                    }`}
                    role="presentation"
                    data-url={`/articles/${article.slug}/ratings`}
                    onClick={this.navigateToRatings}
                  >
                    {article.rating}
                    <i className={`fa fa-star${article.rated ? '' : '-o'} ml-5`} />
                  </span>
                  <span className="article-icon-right margin-top">
                    <span
                      className="hover-primary margin-top"
                      role="presentation"
                      data-url={`/articles/${article.slug}/likes`}
                      onClick={this.navigateToRatings}
                    >
                      {likeCount === 0 ? '' : likeCount}
                    </span>
                    <button
                      className="article-icon-right hover-primary favorites"
                      onClick={this.onLikeArticleClicked}
                    >
                      <i className={`fa fa-thumbs-${liked ? '' : 'o-'}up article-icon-right`} />
                    </button>
                  </span>
                  <span className="article-icon-right margin-top">
                    <span
                      className="hover-primary margin-top"
                      role="presentation"
                      data-url={`/articles/${article.slug}/dislikes`}
                      onClick={this.navigateToRatings}
                    >
                      {dislikeCount === 0 ? '' : dislikeCount}
                    </span>
                    <button
                      className="article-icon-right hover-primary favorites"
                      onClick={this.onDislikeArticleClicked}
                    >
                      <i
                        className={`fa fa-thumbs-${disliked ? '' : 'o-'}down article-icon-right`}
                      />
                    </button>
                  </span>
                  <button className="article-icon-right hover-primary margin-top">
                    <i
                      className="fa fa-bookmark-o article-icon-right"
                      title="bookmark this article"
                    />
                  </button>
                </div>
                <div className="article-share">
                  <p>Share this article</p>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-facebook-square" title="Share via Facebook" />
                  </button>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-twitter-square" title="Share via Twitter" />
                  </button>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-linkedin-square" title="Share via LinkedIn" />
                  </button>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-envelope" title="Share via Mail " />
                  </button>
                </div>
                <div className="rating-wrapper">
                  <p>Rate this article</p>
                  <div className="rate">
                    <button
                      className={article.rated === 5 ? 'selected' : ''}
                      data-value="5"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={article.rated === 4 ? 'selected' : ''}
                      data-value="4"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={article.rated === 3 ? 'selected' : ''}
                      data-value="3"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={article.rated === 2 ? 'selected' : ''}
                      data-value="2"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={article.rated === 1 ? 'selected' : ''}
                      data-value="1"
                      onClick={this.onSelectedRating}
                    />
                  </div>
                </div>
                <div className="items-center">
                  <a href="#modal-report" className="hover-primary">
                    <i className="fa fa-file mr-5" />
                    Report
                  </a>
                </div>
              </div>
            </div>
            {this.renderTags()}
          </div>
        </div>
        <a className="go-top-btn" href="#">
          <i className="fa fa-angle-up" />
        </a>
      </section>
    );
  }
}

export const mapStateToProps = ({
  article: {
    loading, article, submitting, liked, disliked, likeCount, dislikeCount,
  },
  currentUser: { profile, rating, isLoggedIn },
}) => ({
  loading,
  rating,
  article,
  submitting,
  liked,
  disliked,
  likeCount,
  dislikeCount,
  currentUser: profile,
  isLoggedIn,
});

export const mapDispatchToProps = dispatch => ({
  getArticle: articleSlug => dispatch(fetchArticle(articleSlug)),
  rateArticle: payload => dispatch(onUserRateArticle(payload)),
  onLikeArticle: articleSlug => dispatch(likeArticle(articleSlug)),
  onDislikeArticle: articleSlug => dispatch(dislikeArticle(articleSlug)),
  nextPath: url => dispatch(setNextPath(url)),
});

Article.propTypes = {
  article: PropTypes.object,
  match: PropTypes.any.isRequired,
  getArticle: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
<<<<<<< HEAD
  currentUser: PropTypes.object,
=======
  liked: PropTypes.bool,
  disliked: PropTypes.bool,
  likeCount: PropTypes.number,
  dislikeCount: PropTypes.number,
  onLikeArticle: PropTypes.func.isRequired,
  onDislikeArticle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  nextPath: PropTypes.func.isRequired,
>>>>>>> feat(like/dislike): add like and dislike functionality
};

Article.defaultProps = {
  article: {},
  liked: false,
  disliked: false,
  likeCount: 0,
  dislikeCount: 0,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
