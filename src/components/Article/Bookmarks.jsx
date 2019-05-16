import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getBookmarks } from '../../redux/actions/currentUserActions';
import ArticleCard from './ArticleCard';
import Pagination from '../common/Pagination';

export class Bookmarks extends Component {
  componentDidMount() {
    const { onGetBookmarks } = this.props;
    onGetBookmarks();
  }

  renderArticles = () => {
    const { bookmarks, history } = this.props;
    return bookmarks.map(bookmark => (
      <ArticleCard
        history={history}
        url={`/articles/${bookmark.article.slug}`}
        key={bookmark.article.slug}
        article={bookmark.article}
      />
    ));
  };

  render() {
    const { history } = this.props;
    return (
      <section className="main-content">
        <div className="container">
          <div className="row content-margin">
            <div className="col-1" />
            <div className="col-10 mt-10">
              <h3>BOOKMARKED ARTICLES</h3>
              {this.renderArticles()}
              <Pagination history={history} url="/articles" />
            </div>
          </div>
        </div>
        <button className="go-top-btn" href="#">
          <i className="fa fa-angle-up" />
        </button>
      </section>
    );
  }
}

export const mapStateToProps = ({
  currentUser: {
    message, profile, bookmarked, bookmarkedArticles,
  },
}) => ({
  message,
  currentUser: profile,
  bookmarked,
  bookmarks: bookmarkedArticles,
});

export const mapDispatchToProps = dispatch => ({
  onGetBookmarks: () => dispatch(getBookmarks()),
});

Bookmarks.propTypes = {
  onGetBookmarks: PropTypes.func.isRequired,
  bookmarks: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmarks);
