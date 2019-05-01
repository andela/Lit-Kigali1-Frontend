import React, { Component } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { PropTypes } from 'prop-types';
import {
  handleCommentInput,
  submitComment,
  deleteComment,
  updateComment,
  setUpdateCommentBody,
} from '../../redux/actions/commentAction';
import CommentRender from './CommentRender';

export class Comment extends Component {
  addComment = () => {
    const { body, articleSlug, onSubmitComment } = this.props;
    onSubmitComment(body, articleSlug);
  }

  onChange = (e) => {
    const { onCommentInput } = this.props;
    onCommentInput({ body: e.target.value });
    e.preventDefault();
  }

  displayComments = () => {
    const {
      commentList,
      currentUser,
      onDeleteComment,
      articleSlug,
      onUpdateCommentInput,
    } = this.props;
    if (commentList.length) {
      const newList = commentList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return (
        newList.map(comment => (
          <CommentRender
            commentList={commentList}
            currentUser={currentUser}
            onDeleteComment={onDeleteComment}
            articleSlug={articleSlug}
            comment={comment}
            key={comment.id}
            enterPress={this.onEnterPress}
            updateComment={this.onEditComment}
            inputHandler={onUpdateCommentInput}
          />
        ))
      );
    }
    return '';
  }

  commentForm = () => {
    const { body } = this.props;
    return (
      <form>
        <Textarea
          className="comment-textarea new"
          placeholder="Add your comment..."
          type="text"
          value={body}
          onChange={this.onChange}
          onKeyDown={e => this.onEnterPress(e, this.addComment)}
          data-el="comment-input"
        />
      </form>
    );
  }

  onEnterPress = (e, fun, id) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (!e.target.value.trim()) {
        e.preventDefault();
        return;
      }
      const { isLoggedIn, history } = this.props;
      if (!isLoggedIn) {
        e.preventDefault();
        history.push('/auth');
        return;
      }
      fun(id);
      e.preventDefault();
    }
  }

  onEditComment = (id) => {
    const { articleSlug, updateBody, onUpdateComment } = this.props;
    onUpdateComment(id, articleSlug, updateBody);
  }

  render() {
    return (
      <div className="article-comment">
        <div className="article-comment__center">
          {this.commentForm()}
          {this.displayComments()}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  body: PropTypes.string.isRequired,
  onCommentInput: PropTypes.func.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  articleSlug: PropTypes.string.isRequired,
  commentList: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  onDeleteComment: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
  updateBody: PropTypes.string.isRequired,
  onUpdateCommentInput: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.any.isRequired,
};

Comment.defaultProps = {
  currentUser: {},
};

export const mapStateToProps = ({
  comment: { body, commentList, updateBody },
  currentUser: {
    profile,
    isLoggedIn,
  },
}) => ({
  body,
  currentUser: profile,
  commentList,
  updateBody,
  isLoggedIn,
});

export const mapDispatchToProps = dispatch => ({
  onCommentInput: ({ body }) => dispatch(handleCommentInput({ body })),
  onSubmitComment: (comment, articleSlug) => dispatch(submitComment(comment, articleSlug)),
  onDeleteComment: (id, articleSlug) => dispatch(deleteComment(id, articleSlug)),
  onUpdateComment: (id, articleSlug, body) => dispatch(updateComment(id, articleSlug, body)),
  onUpdateCommentInput: value => dispatch(setUpdateCommentBody(value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);
