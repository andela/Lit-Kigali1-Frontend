import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';
import { fetchCurrentUser } from '../../redux/actions/currentUserActions';
import ArticleCard from '../Article/ArticleCard';
import { fetchArticlesHome, fetchRecommendedArticle } from '../../redux/actions/articleActions';

const defaultImage = 'https://picsum.photos/200/300?grayscale';
const slideProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};
export class Home extends Component {
  state = {
    page: 1,
  };

  componentWillMount() {
    const { getCurrentUser, location } = this.props;
    const parsed = queryString.parse(location.search);

    if (parsed.token) {
      localStorage.setItem('token', parsed.token);
      window.location.href = '/';
    }
    getCurrentUser();
    this.getAllArticles();
    this.getRecommendsArticles();

    document.addEventListener('scroll', () => this.handleScroll(), true);
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      const {
        feed: { page, pages },
      } = this.props;
      if (pages > page) {
        this.setState({ page: page + 1 }, () => this.getAllArticles());
      }
    }
  };

  getAllArticles = () => {
    const { page } = this.state;
    const { getArticles } = this.props;
    getArticles({ page });
  };

  getRecommendsArticles = () => {
    const { getRecommends } = this.props;
    getRecommends();
  };

  renderSlideShow = () => {
    const {
      feed: { articles },
      recommends,
      isLoggedIn,
    } = this.props;
    let articlesList = [];
    if (isLoggedIn) {
      articlesList = recommends;
    } else {
      articlesList = articles.slice(0, 6);
    }
    return (
      <Slide {...slideProperties} className="slide-area">
        {articlesList.map(feed => (
          <div key={feed.slug} className="slide-block">
            <div
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${feed.cover
                  || defaultImage}")`,
              }}
            >
              <div>
                <h1>
                  <Link to={`/articles/${feed.slug}`} className="color-white">
                    {feed.title}
                  </Link>
                </h1>
                <Link to={`/profiles/${feed.author.username}`} className="color-white">
                  <span className="author">
                    {`${feed.author.firstName} ${feed.author.lastName}`}
                  </span>
                </Link>
                <span className="views">
                  {feed.viewsCount}
                  <i className="fa fa-eye" />
                </span>
                <span>{feed.readingTime}</span>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    );
  };

  renderArticles = () => {
    const {
      feed: { articles },
      history,
    } = this.props;
    return articles.map(article => (
      <div className="col-6" key={article.slug}>
        <ArticleCard
          className="medium"
          history={history}
          url={`/articles/${article.slug}`}
          article={article}
        />
      </div>
    ));
  };

  render() {
    return (
      <section className="main-content">
        {this.renderSlideShow()}
        <div styles={{ clear: 'both;' }} />
        <div className="container">
          <div className="main-article-container row">{this.renderArticles()}</div>
        </div>
        <a className="go-top-btn" href="##">
          <i className="fa fa-angle-up" />
        </a>
      </section>
    );
  }
}

export const mapStateToProps = ({
  article: { feed, recommends },
  currentUser: { isLoggedIn },
}) => ({
  feed,
  recommends,
  isLoggedIn,
});

export const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(fetchCurrentUser()),
  getArticles: payload => dispatch(fetchArticlesHome(payload)),
  getRecommends: () => dispatch(fetchRecommendedArticle()),
});

Home.propTypes = {
  feed: PropTypes.object,
  getCurrentUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
  getRecommends: PropTypes.func.isRequired,
  history: PropTypes.object,
  recommends: PropTypes.array,
  isLoggedIn: PropTypes.bool,
};

Home.defaultProps = {
  feed: {
    page: 1,
    pages: 1,
    articles: [],
  },
  history: {},
  recommends: [],
  isLoggedIn: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
