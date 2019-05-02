import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Slide } from 'react-slideshow-image';
import { fetchCurrentUser } from '../../redux/actions/currentUserActions';
import ArticleCard from '../Article/ArticleCard';
import { fetchArticlesHome } from '../../redux/actions/articleActions';

const defaultImage = 'https://picsum.photos/200/300?grayscale';
const slideProperties = {
  duration: 50000,
  transitionDuration: 5000,
  infinite: true,
  indicators: true,
  arrows: true,
};
export class Home extends Component {
  state = {
    page: 1,
  };

  componentWillMount() {
    const {
      location,
      feed: { page, pages },
    } = this.props;
    const parsed = queryString.parse(location.search);
    const { getCurrentUser } = this.props;

    if (parsed.token) {
      localStorage.setItem('token', parsed.token);
      window.location.href = '/';
    }
    getCurrentUser();
    this.getAllArticles();

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        if (pages > page) {
          this.setState({ page: page + 1 }, () => this.getAllArticles());
        }
      }
    };
  }

  getAllArticles = () => {
    const { page } = this.state;
    const { getArticles } = this.props;
    getArticles({ page });
  };

  renderSlideShow = () => {
    const {
      feed: { articles },
    } = this.props;
    const articlesList = articles.slice(0, 5);
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
                <h1>{feed.title}</h1>
                <span className="author">{`${feed.author.firstName} ${feed.author.lastName}`}</span>
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
        <a className="go-top-btn content-center" href="#">
          <i className="fa fa-angle-up" />
        </a>
      </section>
    );
  }
}

export const mapStateToProps = ({ article: { feed } }) => ({
  feed,
});

export const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(fetchCurrentUser()),
  getArticles: payload => dispatch(fetchArticlesHome(payload)),
});

Home.propTypes = {
  feed: PropTypes.object,
  getCurrentUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
  history: PropTypes.object,
};

Home.defaultProps = {
  feed: {
    page: 1,
    pages: 1,
    articles: [],
  },
  history: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
