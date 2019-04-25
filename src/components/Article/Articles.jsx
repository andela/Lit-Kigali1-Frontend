import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import qs from 'query-string';
import { fetchArticles } from '../../redux/actions/articleActions';
import ArticleCard from './ArticleCard';
import SearchInput from '../common/Input/SearchInput';

export class Articles extends Component {
  state = {
    filterBy: 'title',
    words: '',
  };

  componentDidMount() {
    const { location } = this.props;
    const obj = qs.parse(location.search);
    const filterBy = Object.keys(obj)[0];
    const words = obj[Object.keys(obj)[0]];
    this.setState({ words, filterBy });
    this.filterArticles();
  }

  redirectTo = () => {
    const { history } = this.props;
    const { filterBy, words } = this.state;
    let url = '/articles';
    if (words) {
      url = `${url}/?${filterBy || 'title'}=${words}`;
    }
    history.push(url);
  };

  filterArticles = () => {
    const { filterBy, words } = this.state;
    const { getArticles } = this.props;
    this.redirectTo();
    getArticles({ filterBy, words });
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
  article: { loading, articles, submitting },
  currentUser: { profile },
}) => ({
  loading,
  articles,
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
};

Articles.defaultProps = {
  location: { params: {} },
  articles: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Articles);
