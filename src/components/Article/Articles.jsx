import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import qs from 'query-string';
import { fetchArticles } from '../../redux/actions/articleActions';
import ArticleCard from './ArticleCard';
import SearchInput from '../common/Input/SearchInput';
import Pagination from '../../components/common/Pagination';

const allowedParams = ['title', 'author', 'tag'];
export class Articles extends Component {
  state = {
    filterBy: '',
    words: '',
  };

  componentDidMount() {
    const { location } = this.props;
    const obj = qs.parse(location.search);
    const filterBy = Object.keys(obj).find(val => allowedParams.indexOf(val) !== -1);
    const words = obj[filterBy] || '';
    this.setState({ words, filterBy }, () => this.filterArticles());
  }

  redirectTo = () => {
    const { history, location } = this.props;
    const { filterBy, words } = this.state;
    const parsed = qs.parse(location.search);
    let url = `/articles?page=${parsed.page || 1}`;
    if (words) {
      url = `${url}&${filterBy || 'title'}=${words}`;
    }
    history.push(url);
  };

  filterArticles = () => {
    const { filterBy, words } = this.state;
    const { getArticles, location } = this.props;
    const parsed = qs.parse(location.search);

    this.redirectTo();
    getArticles({ filterBy, words, page: parsed.page });
  };

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

  onSelectFilter = (e) => {
    const { filterBy } = e.target.dataset;
    this.setState({ filterBy }, () => this.filterArticles());
  };

  onSearch = (words) => {
    this.setState({ words }, () => this.filterArticles());
  };

  render() {
    const { filterBy, words } = this.state;
    const { history, page, pages } = this.props;
    return (
      <section className="main-content">
        <div className="container">
          <div className="row content-margin">
            <div className="col-1" />
            <div className="col-10 mt-10">
              <form action="">
                <div className="input">
                  <SearchInput
                    type="text"
                    value={words}
                    placeholder="Search for ..."
                    onChange={this.onSearch}
                  />
                </div>

                <div className="articles-filter">
                  <span
                    data-el="span-title"
                    role="presentation"
                    className={`filter-by ${filterBy === 'title' ? 'active' : ''}`}
                    data-filter-by="title"
                    onClick={this.onSelectFilter}
                  >
                    Article
                  </span>
                  <span
                    data-el="span-author"
                    role="presentation"
                    className={`filter-by ${filterBy === 'author' ? 'active' : ''}`}
                    data-filter-by="author"
                    onClick={this.onSelectFilter}
                  >
                    Author
                  </span>
                  <span
                    data-el="span-tag"
                    role="presentation"
                    className={`filter-by ${filterBy === 'tag' ? 'active' : ''}`}
                    data-filter-by="tag"
                    onClick={this.onSelectFilter}
                  >
                    Tag
                  </span>
                </div>
              </form>

              <h3>ARTICLES</h3>
              {this.renderArticles()}
              <Pagination totalPages={pages} currentPage={page} history={history} url="/articles" />
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
    loading, articlesList, page, pages, submitting,
  },
  currentUser: { profile },
}) => ({
  loading,
  page,
  pages,
  articles: articlesList,
  submitting,
  currentUser: profile,
});

export const mapDispatchToProps = dispatch => ({
  getArticles: payload => dispatch(fetchArticles(payload)),
});

Articles.propTypes = {
  location: PropTypes.object,
  articles: PropTypes.array,
  getArticles: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  page: PropTypes.number,
  pages: PropTypes.number,
};

Articles.defaultProps = {
  location: { params: {} },
  articles: [],
  page: 1,
  pages: 1,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Articles);
