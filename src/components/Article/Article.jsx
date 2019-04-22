import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parser as HtmlToReact } from 'html-to-react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { fetchArticle } from '../../redux/actions/articleActions';
import { onUserRateArticle } from '../../redux/actions/currentUserActions';

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

  render() {
    const { article } = this.props;
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
                  <button className="article-icon-right hover-primary margin-top">
                    <i className="fa fa-thumbs-up" />
                  </button>
                  <button className="article-icon-right hover-primary margin-top">
                    <i className="fa fa-thumbs-down article-icon-right" />
                  </button>
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
  article: { loading, article, submitting },
  currentUser: { profile, rating },
}) => ({
  loading,
  rating,
  article,
  submitting,
  currentUser: profile,
});

export const mapDispatchToProps = dispatch => ({
  getArticle: articleSlug => dispatch(fetchArticle(articleSlug)),
  rateArticle: payload => dispatch(onUserRateArticle(payload)),
});

Article.propTypes = {
  article: PropTypes.object,
  match: PropTypes.any.isRequired,
  getArticle: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

Article.defaultProps = {
  article: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
