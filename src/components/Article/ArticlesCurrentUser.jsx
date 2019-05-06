import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { onUserDeleteArticle } from '../../redux/actions';
import Toast from '../common/Toast/Toast';
import Button from '../common/Button/Button';
import DeleteModal from '../common/Modal/DeleteModal';

export class ArticlesCurrentUser extends Component {
  state = {
    articleStatus: 'unpublished',
    modalActive: false,
    showToast: false,
    articleIndex: 0,
    deleteStatus: 'success',
    deleteMessage: '',
  };

  renderDate = date => `Published On: ${moment(date).format('LLLL')}`;

  toggleArticleStatus = (e) => {
    const { status } = e.target.dataset;
    this.setState({ articleStatus: status, showToast: false });
  };

  openModal = (e) => {
    const { index } = e.target.dataset;
    const {
      currentUser: { articles },
    } = this.props;
    this.setState({
      article: articles[index],
      modalActive: true,
      showToast: false,
    });
  };

  closeModal = () => {
    this.setState({ modalActive: false });
  };

  onDeleteArticle = () => {
    const { article } = this.state;
    const { deleteArticle } = this.props;
    deleteArticle({ articleSlug: article.slug })
      .then((message) => {
        this.setState({
          modalActive: false,
          deleteStatus: 'success',
          deleteMessage: message,
          showToast: true,
        });
      })
      .catch((errMessage) => {
        this.setState({
          modalActive: false,
          deleteStatus: 'error',
          deleteMessage: errMessage,
          showToast: true,
        });
      });
  };

  renderModal = () => {
    const { modalActive, article } = this.state;
    const { deletingArticle } = this.props;
    if (!modalActive || !article) return '';
    return (
      <DeleteModal
        onDelete={this.onDeleteArticle}
        closeModal={this.closeModal}
        title={article.title}
        deleting={deletingArticle}
        dataEl={article.slug}
      />
    );
  };

  renderArticles = () => {
    const {
      currentUser: { articles },
    } = this.props;
    const { articleStatus } = this.state;
    return articles.map((article, index) => {
      if (articleStatus === article.status) {
        return (
          <div className="my-article" key={article.slug}>
            <div className="my-article__title">
              <Link to={`/articles/${article.slug}`}>{article.title}</Link>
              <Button
                data-name="delete-btn"
                classes="my-article-delete"
                data-index={index}
                onClick={this.openModal}
              >
                <i className="fa fa-trash" data-index={index} />
              </Button>
            </div>
            <p className="my-article__text">{article.description || article.body}</p>
            <p className="my-article__meta">{this.renderDate(article.createdAt)}</p>
          </div>
        );
      }
    });
  };

  renderToast = () => {
    const { showToast, deleteStatus, deleteMessage } = this.state;
    if (!showToast) return '';
    return <Toast show={showToast} type={deleteStatus} message={deleteMessage} />;
  };

  countArticlesStatus = (status) => {
    const {
      currentUser: { articles },
    } = this.props;
    return articles.filter(article => status.indexOf(article.status) !== -1).length;
  };

  render() {
    const { articleStatus } = this.state;
    return (
      <section className="main-content">
        <div className="container">
          {this.renderToast()}
          {this.renderModal()}
          <div className="row content-margin">
            <div className="col-1" />
            <div className="col-10 mt-10">
              <div className="row">
                <div className="col-6-mob">
                  <h3>My Articles</h3>
                </div>
                <div className="col-6-mob align-right">
                  <h3>
                    <Link to="/articles/create">New Article</Link>
                  </h3>
                </div>
              </div>
              <div className="my-articles-tab">
                <span
                  data-status="unpublished"
                  role="presentation"
                  className={articleStatus === 'unpublished' ? 'active' : ''}
                  onClick={this.toggleArticleStatus}
                >
                  Draft
                  {` (${this.countArticlesStatus(['draft', 'unpublished'])})`}
                </span>
                <span
                  data-status="published"
                  role="presentation"
                  className={articleStatus === 'published' ? 'active' : ''}
                  onClick={this.toggleArticleStatus}
                >
                  Published
                  {` (${this.countArticlesStatus(['published'])})`}
                </span>
              </div>
              <div className="my-articles row">
                <div className="col-12">{this.renderArticles()}</div>
              </div>
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
    message, following, profile, deletingArticle, articles,
  },
}) => ({
  message,
  deletingArticle,
  currentUser: profile,
  following,
  articles,
});

export const mapDispatchToProps = dispatch => ({
  deleteArticle: payload => dispatch(onUserDeleteArticle(payload)),
});

ArticlesCurrentUser.propTypes = {
  deletingArticle: PropTypes.bool,
  currentUser: PropTypes.object,
  deleteArticle: PropTypes.func.isRequired,
};

ArticlesCurrentUser.defaultProps = {
  deletingArticle: false,
  currentUser: {
    articles: [],
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesCurrentUser);
