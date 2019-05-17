import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  EditorState, convertFromRaw, CompositeDecorator, RichUtils,
} from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import ContentLoader from 'react-content-loader';
import Editor from 'draft-js-plugins-editor';
import { getSelectedBlocksList, getSelectionText } from 'draftjs-utils';
import {
  fetchArticle,
  likeArticle,
  dislikeArticle,
  share,
  reportArticle,
  reportInputHandler,
  setReportValidToFalse,
} from '../../redux/actions/articleActions';
import { mediaBlockRenderer } from '../../helpers/editorPlugins/mediaBlockRenderer';
import addLinkPlugin from '../../helpers/editorPlugins/addLink';
import createHighlightPlugin from '../../helpers/editorPlugins/highlight';
import { onUserRateArticle, setNextPath } from '../../redux/actions/currentUserActions';
import Comment from '../Comment/Comment';
import { setHiglightedText } from '../../redux/actions/commentAction';
import addToolTip from '../../helpers/editorPlugins/displayToolTip';
import getToolTip from '../../helpers/getToolTip';
import addStyleHighlighter from '../../helpers/editorPlugins/addStyleHightlighter';
import Toast from '../common/Toast/Toast';

const highlightPlugin = createHighlightPlugin();
export class Article extends Component {
  state = {
    editorFromState: {},
    isCommentingMode: false,
    showToast: false,
    status: 'success',
    message: '',
  };

  decorator = new MultiDecorator([new CompositeDecorator(addStyleHighlighter.decorators)]);

  componentDidMount() {
    const {
      match: {
        params: { articleSlug },
      },
      getArticle,
    } = this.props;
    if (articleSlug) {
      getArticle(articleSlug).then(({ article }) => {
        const editorObject = convertFromRaw(JSON.parse(article.body));
        const editorState = EditorState.createWithContent(editorObject, this.decorator);
        this.setState({
          editorFromState: editorState,
        });
      });
    }
  }

  showToast = (status, message) => {
    this.setState(
      {
        showToast: true,
        status,
        message,
      },
      () => {
        setTimeout(() => {
          this.setState({ showToast: false, status: 'success', message: '' });
        }, 5000);
      },
    );
  };

  renderBody = () => {
    const {
      singleArticle: { body },
    } = this.props;
    const { editorFromState, isCommentingMode } = this.state;
    if (body && body.blocks && Object.getOwnPropertyNames(editorFromState).length) {
      return (
        <Editor
          className="article-text"
          name="body"
          editorState={editorFromState}
          blockRendererFn={mediaBlockRenderer}
          plugins={[addLinkPlugin, addToolTip, addStyleHighlighter]}
          customStyleMap={highlightPlugin.customStyleMap}
          onChange={this.onChange}
          readOnly={isCommentingMode}
          data-test="article-text"
        />
      );
    }
    return (
      <ContentLoader
        height={200}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="75" y="0" rx="3" ry="3" width="250" height="6" />
        <rect x="0" y="20" rx="3" ry="3" width="350" height="3" />
        <rect x="0" y="30" rx="3" ry="3" width="380" height="3" />
        <rect x="0" y="40" rx="3" ry="3" width="201" height="3" />
        <rect x="-2" y="50" rx="3" ry="3" width="350" height="3" />
        <rect x="-13" y="60" rx="3" ry="3" width="380" height="3" />
        <rect x="-3" y="70" rx="3" ry="3" width="380" height="3" />
        <rect x="-7" y="80" rx="3" ry="3" width="380" height="3" />
        <rect x="-7" y="90" rx="3" ry="3" width="380" height="3" />
        <rect x="-10" y="100" rx="3" ry="3" width="380" height="3" />
        <rect x="0" y="110" rx="3" ry="3" width="350" height="3" />
        <rect x="0" y="120" rx="3" ry="3" width="350" height="3" />
        <rect x="0" y="130" rx="3" ry="3" width="380" height="3" />
        <rect x="0" y="140" rx="3" ry="3" width="201" height="3" />
        <rect x="-2" y="150" rx="3" ry="3" width="350" height="3" />
        <rect x="-13" y="160" rx="3" ry="3" width="380" height="3" />
        <rect x="-3" y="170" rx="3" ry="3" width="380" height="3" />
        <rect x="-7" y="180" rx="3" ry="3" width="380" height="3" />
        <rect x="-7" y="190" rx="3" ry="3" width="380" height="3" />
        <rect x="-10" y="200" rx="3" ry="3" width="380" height="3" />
      </ContentLoader>
    );
  };

  renderDate = () => {
    const {
      singleArticle: { createdAt },
    } = this.props;
    return `Published On: ${moment(createdAt).format('LLLL')}`;
  };

  onSelectedRating = (e) => {
    e.stopPropagation();
    const {
      rateArticle,
      singleArticle: { slug },
    } = this.props;
    const { value } = e.target.dataset;
    rateArticle({ articleSlug: slug, rate: value });
  };

  navigateToArticles = (e) => {
    const { history } = this.props;
    history.push(`/articles?page1&tag=${e.target.dataset.value}`);
  };

  renderTags = () => {
    const {
      singleArticle: { tagList },
    } = this.props;
    return (
      <div className="row">
        <div className="col-12 content-center">
          {tagList.map(tag => (
            <span
              key={tag}
              className="tagged"
              data-value={tag}
              onClick={this.navigateToArticles}
              role="presentation"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  renderCover = () => {
    const {
      singleArticle: { cover },
    } = this.props;
    if (!cover) return '';
    return (
      <div className="col-12">
        <div
          className="article-image"
          style={{
            backgroundImage: `url("${cover}")`,
          }}
        />
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
      singleArticle: { slug },
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
      singleArticle: { slug },
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

  SocialShare = (on) => {
    const {
      onShare,
      article: { slug },
    } = this.props;

    onShare({ on, articleSlug: slug });
  };

  onChange = (editorState) => {
    if (getSelectedBlocksList(editorState).size !== 1) {
      this.setState({
        editorFromState: EditorState.undo(editorState),
      });
      return;
    }
    this.highlight(editorState);
  };

  highlight = (editorState) => {
    const { isCommentingMode } = this.state;
    if (!getSelectionText(editorState) && !isCommentingMode) {
      this.setState({
        editorFromState: EditorState.undo(editorState),
      });
      return;
    }
    const {
      onHighlight,
      singleArticle: { slug },
      history,
    } = this.props;
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const getSelectedText = currentContentBlock.getText().slice(start, end);
    if (getSelectedText.length) {
      onHighlight(getSelectedText);
    }
    const highlighted = {
      slug,
      text: getSelectedText,
      startPoint: start,
      endPoint: end,
    };
    const { newEditorState, selectedText, entityKey } = getToolTip(
      editorState,
      this.toggleMode,
      highlighted,
      history,
      anchorKey,
    );
    const newState = isCommentingMode
      ? editorState
      : RichUtils.toggleLink(newEditorState, selectedText, entityKey);
    this.setState({
      editorFromState: newState,
    });
  };

  toggleMode = () => {
    this.setState({
      isCommentingMode: true,
    });
  };

  handleInput = (e) => {
    const { handleInput } = this.props;
    handleInput({ field: e.target.name, value: e.target.value });
  };

  onReportSubmit = (e) => {
    const {
      report: { reason, description },
      singleArticle: { slug },
      onReportArticle,
      onInvalid,
    } = this.props;
    if (reason) {
      onReportArticle(slug, { reason, description }).then((res) => {
        window.location.href = '#';
        this.showToast('success', res.message);
      });
    } else {
      onInvalid(false);
    }

    e.preventDefault();
  };

  render() {
    const {
      singleArticle, liked, disliked, likeCount, dislikeCount, history, report,
    } = this.props;
    const { showToast, status, message } = this.state;

    return (
      <section className="main-content">
        <div className="container content-margin">
          <Toast show={showToast} type={status} message={message} />
          <br />
          <h1 className="article-view-title">{singleArticle.title}</h1>
          <div className="row">
            {this.renderCover()}
            <div className="col-12">
              {this.renderBody()}
              <p className="article-date">{this.renderDate()}</p>

              <div className="row content-space-between">
                <div className="article-side-actions">
                  <span>{singleArticle.readingTime}</span>
                  <span
                    data-name="rate-btn"
                    className={`article-icon-right hover-primary margin-top ${
                      singleArticle.rated ? 'rated' : ''
                    }`}
                    role="presentation"
                    data-url={`/articles/${singleArticle.slug}/ratings`}
                    onClick={this.navigateToRatings}
                  >
                    {singleArticle.rating}
                    <i className={`fa fa-star${singleArticle.rated ? '' : '-o'} ml-5`} />
                  </span>
                  <span className="article-icon-right margin-top">
                    <span
                      className="hover-primary margin-top"
                      role="presentation"
                      data-url={`/articles/${singleArticle.slug}/likes`}
                      onClick={this.navigateToRatings}
                    >
                      {likeCount === 0 ? '' : likeCount}
                    </span>
                    <button
                      className="article-icon-right hover-primary favorites"
                      data-value="like"
                      onClick={this.onLikeArticleClicked}
                    >
                      <i className={`fa fa-thumbs-${liked ? '' : 'o-'}up article-icon-right`} />
                    </button>
                  </span>
                  <span className="article-icon-right margin-top">
                    <span
                      className="hover-primary margin-top"
                      role="presentation"
                      data-url={`/articles/${singleArticle.slug}/dislikes`}
                      onClick={this.navigateToRatings}
                    >
                      {dislikeCount === 0 ? '' : dislikeCount}
                    </span>
                    <button
                      className="article-icon-right hover-primary favorites"
                      data-value="dislike"
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
                  <button
                    id="fb"
                    className="article-icon hover-primary"
                    onClick={() => this.SocialShare('facebook')}
                  >
                    <i className="fa fa-facebook-square" title="Share via Facebook" />
                  </button>
                  <button
                    id="tw"
                    className="article-icon hover-primary"
                    onClick={() => this.SocialShare('twitter')}
                  >
                    <i className="fa fa-twitter-square" title="Share via Twitter" />
                  </button>
                  <button
                    id="e"
                    className="article-icon hover-primary"
                    onClick={() => this.SocialShare('email')}
                  >
                    <i className="fa fa-envelope" title="Share via Mail " />
                  </button>
                </div>
                <div className="rating-wrapper">
                  <p>Rate this article</p>
                  <div className="rate">
                    <button
                      className={singleArticle.rated === 5 ? 'selected' : ''}
                      data-value="5"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 4 ? 'selected' : ''}
                      data-value="4"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 3 ? 'selected' : ''}
                      data-value="3"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 2 ? 'selected' : ''}
                      data-value="2"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 1 ? 'selected' : ''}
                      data-value="1"
                      onClick={this.onSelectedRating}
                    />
                  </div>
                </div>
                <div className="items-center" id="hello">
                  <a href="#modal-report" className="hover-primary gray-icon">
                    <i className="fa fa-file mr-5 gray-icon" />
                    Report
                  </a>
                </div>
              </div>
            </div>
            {this.renderTags()}
          </div>
          <Comment articleSlug={singleArticle.slug} history={history} />
        </div>
        <button className="go-top-btn" href="">
          <i className="fa fa-angle-up" />
        </button>
        <div id="modal-report" className="modal">
          <div className="modal__wrap">
            <div className="modal__title content-center">
              <i className="fa fa-file mr-5 gray-icon" />
              Report:
              {`  ${singleArticle.title}`}
            </div>
            <div className="modal__content content-center items-center">
              <div className="report-form">
                <div className="small-input">
                  <div className="single-input">
                    <select
                      style={!report.valid ? { color: 'red' } : { color: '#c4c4c4' }}
                      name="reason"
                      id="reason"
                      onChange={this.handleInput}
                    >
                      <option value="">Select Reason</option>
                      <option value="Plagiarism">Plagiarism</option>
                      <option value="Harassment">Harassment</option>
                      <option value="Rules Violation">Rules Violation</option>
                    </select>
                  </div>
                </div>
                <div className="small-input">
                  <div className="single-input">
                    <textarea
                      name="description"
                      type="text"
                      className="large-input"
                      placeholder=" Description"
                      onChange={this.handleInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal__actions">
              <button className="button primary report-btn" onClick={this.onReportSubmit}>
                Submit
              </button>
              <a href="#" className="button primary">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const mapStateToProps = ({
  article: {
    loading, singleArticle, submitting, liked, disliked, likeCount, dislikeCount, report,
  },
  currentUser: { profile, rating, isLoggedIn },
  comment: { highlightArticle },
}) => ({
  loading,
  rating,
  singleArticle,
  submitting,
  liked,
  disliked,
  likeCount,
  dislikeCount,
  currentUser: profile,
  isLoggedIn,
  highlightArticle,
  report,
});

export const mapDispatchToProps = dispatch => ({
  getArticle: articleSlug => dispatch(fetchArticle(articleSlug)),
  rateArticle: payload => dispatch(onUserRateArticle(payload)),
  onShare: payload => dispatch(share(payload)),
  onLikeArticle: articleSlug => dispatch(likeArticle(articleSlug)),
  onDislikeArticle: articleSlug => dispatch(dislikeArticle(articleSlug)),
  nextPath: url => dispatch(setNextPath(url)),
  onHighlight: text => dispatch(setHiglightedText(text)),
  handleInput: ({ field, value }) => dispatch(reportInputHandler({ field, value })),
  onReportArticle: (articleSlug, { reason, description }) => dispatch(reportArticle(articleSlug, { reason, description })),
  onInvalid: value => dispatch(setReportValidToFalse(value)),
});

Article.propTypes = {
  singleArticle: PropTypes.object,
  match: PropTypes.any,
  getArticle: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  history: PropTypes.object,
  liked: PropTypes.bool,
  disliked: PropTypes.bool,
  likeCount: PropTypes.number,
  dislikeCount: PropTypes.number,
  onLikeArticle: PropTypes.func.isRequired,
  onDislikeArticle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  nextPath: PropTypes.func.isRequired,
  article: PropTypes.object,
  onHighlight: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  report: PropTypes.object,
  onReportArticle: PropTypes.func.isRequired,
  onInvalid: PropTypes.func.isRequired,
};

Article.defaultProps = {
  singleArticle: {},
  liked: false,
  disliked: false,
  likeCount: 0,
  dislikeCount: 0,
  article: {},
  match: {
    params: {},
  },
  history: { push: () => '' },
  report: {
    valid: true,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
