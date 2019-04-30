import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import { fetchArticles } from '../../redux/actions/articleActions';
import ArticleCard from './ArticleCard';
import Pagination from '../common/Pagination';

export class Articles extends Component {
  componentDidMount() {
    const { getArticles } = this.props;
    const parsed = queryString.parse(this.props.location.search);
    getArticles({ page: parsed.page });
  }

  renderArticles = () => {
    const { articles, history } = this.props;
    return articles.map(article => (
      <ArticleCard
        history={history}
        url={`/articles/${article.slug}`}
        key={article.slug}
        article={article}
      />
    ));
  };

  render() {
    const {
      articles, history, page, pages,
    } = this.props;
    return (
      <section className="main-content">
        <div className="container">
          <div className="row content-margin">
            <div className="col-1" />
            <div className="col-10 mt-10">
              <form action="">
                <div className="input">
                  <input type="text" placeholder="Search for ..." />
                </div>

                <div className="articles-filter">
                  <input type="checkbox" id="articles" className="filter-by" />
                  <label htmlFor="articles">Articles</label>

                  <input type="checkbox" id="author" className="filter-by" />
                  <label htmlFor="author">Author</label>

                  <input type="checkbox" id="tag" className="filter-by" />
                  <label htmlFor="tag">Tag</label>

                  <input type="checkbox" id="favorited" className="filter-by" />
                  <label htmlFor="favorited">Favorited</label>
                </div>
              </form>

              <h3>ARTICLES</h3>
              {articles.map(article => (
                <ArticleCard
                  history={history}
                  url={`/articles/${article.slug}`}
                  key={article.slug}
                  article={article}
                />
              ))}
              <Pagination totalPages={pages} currentPage={page} history={history} url="/articles" />
              {this.renderArticles()}
              <div className="pagination">
                <span>First</span>
                <span>
                  <i className="fa fa-angle-left" />
                </span>
                <ul className="pages">
                  <li className="page current">1</li>
                  <li className="page">2</li>
                  <li className="page">3</li>
                  <li className="page">4</li>
                  <li className="page">5</li>
                </ul>
                <span>
                  <i className="fa fa-angle-right" />
                </span>
                <span>Last</span>
              </div>
            </div>
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
    loading, articleList, submitting, page, pages,
  },
  currentUser: { profile },
}) => ({
  loading,
  articles: articleList,
  page,
  pages,
  submitting,
  currentUser: profile,
});

export const mapDispatchToProps = dispatch => ({
  getArticles: payload => dispatch(fetchArticles(payload)),
});

Articles.propTypes = {
  articles: PropTypes.array,
  getArticles: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

Articles.defaultProps = {
  articles: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Articles);
