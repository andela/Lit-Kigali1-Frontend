import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import {
  RichUtils,
  convertToRaw,
} from 'draft-js';
import {
  submitCommentOnText,
  handleHighlightedTextCommentInput,
} from '../../redux/actions/commentAction';
import {
  updateArticle,
} from '../../redux/actions/articleActions';
import styleHighlitedText from '../../helpers/styleHiglightedText';

class CommentToolTip extends React.Component {
  state = {
    hasCommentBox: false,
    hasCommentButton: true,
  }

  showCommentBox = () => {
    const { contentState, entityKey } = this.props;
    const { hasCommentBox } = this.state;
    const { toggleMode } = contentState.getEntity(entityKey).getData();
    this.setState({
      hasCommentBox: !hasCommentBox,
    });
    toggleMode();
  }

  addComment = () => {
    const {
      contentState,
      entityKey,
      onUpdateArticle,
      currentUser,
    } = this.props;
    const { highlighted, article, anchorKey } = contentState.getEntity(entityKey).getData();
    const {
      text, startPoint, endPoint, slug,
    } = highlighted;
    const { body, onSubmitComment } = this.props;
    onSubmitComment(body, slug, text, startPoint, endPoint, anchorKey).then((result) => {
      const comment = { ...result.comment, author: currentUser };
      const res = styleHighlitedText(article, anchorKey, comment, slug);
      const newEditor = RichUtils.toggleLink(res.newEditorState, res.selectedText, res.entityKey);
      const newArticle = convertToRaw(newEditor.getCurrentContent());
      onUpdateArticle(slug, { body: JSON.stringify(newArticle) });
    });
  }

  onChange = (e) => {
    const { onCommentInput } = this.props;
    onCommentInput({ body: e.target.value });
    e.preventDefault();
  }

  onEnterPress = (e) => {
    const { contentState, entityKey } = this.props;
    const { history } = contentState.getEntity(entityKey).getData();
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (!e.target.value.trim()) {
        e.preventDefault();
        return;
      }
      const { isLoggedIn } = this.props;
      if (!isLoggedIn) {
        e.preventDefault();
        history.push('/auth');
        return;
      }
      this.addComment(e);
      this.showCommentBox();
      this.setState({
        hasCommentButton: false,
      });
      e.preventDefault();
    }
  }

  render() {
    const { hasCommentBox, hasCommentButton } = this.state;
    const { children } = this.props;
    return (
      <span>
        <span
          className="hightlightedText"
        >
          {hasCommentButton && (
          <span className="tooltip">
            <button onClick={this.showCommentBox}>
              <i className="fa fa-comments-o" aria-hidden="true" />
            </button>
          </span>
          )}
          {children}
        </span>
        {!hasCommentBox
          ? (
            <span />
          ) : (
            <Textarea
              className="comment-wrapper"
              placeholder="Add your comment..."
              type="text"
              data-el="comment-input"
              onChange={this.onChange}
              onKeyDown={this.onEnterPress}
            />
          )}
      </span>
    );
  }
}
CommentToolTip.propTypes = {
  contentState: PropTypes.any.isRequired,
  entityKey: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  body: PropTypes.string.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  onCommentInput: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onUpdateArticle: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  onSubmitComment: (
    body,
    articleSlug,
    higlightedText,
    startPoint,
    endPoint,
    anchorKey,
  ) => dispatch(submitCommentOnText(
    body,
    articleSlug,
    higlightedText,
    startPoint,
    endPoint,
    anchorKey,
  )),
  onCommentInput: ({ body }) => dispatch(handleHighlightedTextCommentInput({ body })),
  onUpdateArticle: (slug, article) => dispatch(updateArticle(slug, article)),
});

export const mapStateToProps = ({
  comment: {
    hbody,
  },
  currentUser: {
    isLoggedIn,
    profile: {
      id,
      firstName,
      lastName,
      username,
      image,
      email,
    },
  },
}) => ({
  body: hbody,
  isLoggedIn,
  currentUser: {
    id,
    firstName,
    lastName,
    username,
    image,
    email,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentToolTip);
