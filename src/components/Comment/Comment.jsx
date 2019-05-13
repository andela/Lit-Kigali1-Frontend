import React, { Component } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { PropTypes } from 'prop-types';
import ContentLoader from 'react-content-loader';
import {
  handleCommentInput,
  submitComment,
  deleteComment,
  updateComment,
  setUpdateCommentBody,
  commentLike,
  commentDislike,
} from '../../redux/actions/commentAction';
import CommentRender from './CommentRender';

export class Comment extends Component {
  addComment = () => {
    const { body, articleSlug, onSubmitComment } = this.props;
    onSubmitComment(body, articleSlug);
  };

  onChange = (e) => {
    const { onCommentInput } = this.props;
    onCommentInput({ body: e.target.value });
    e.preventDefault();
  };

  displayComments = () => {
    const {
      commentList,
      currentUser,
      onDeleteComment,
      articleSlug,
      onUpdateCommentInput,
      fetching,
      onLikeComment,
      onDislikeComment,
    } = this.props;
    if (!commentList.length && fetching) {
      return (
        <ContentLoader
          height={160}
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="80" rx="3" ry="3" width="350" height="6" />
          <rect x="0" y="95" rx="3" ry="3" width="380" height="6" />
          <rect x="0" y="110" rx="3" ry="3" width="201" height="6" />
          <circle cx="22" cy="50" r="21" />
        </ContentLoader>
      );
    }
    const newList = commentList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return newList.map(comment => (
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
        onLikeComment={onLikeComment}
        onDislikeComment={onDislikeComment}
      />
    ));
  };

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
  };

  onEnterPress = (e, func, id) => {
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
      func(id);
      e.preventDefault();
    }
  };

  onEditComment = (id) => {
    const { articleSlug, updateBody, onUpdateComment } = this.props;
    onUpdateComment(id, articleSlug, updateBody);
  };

  render() {
    const { body } = this.props;
    return (
      <div className="article-comment">
        <div className="article-comment__center">
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
  fetching: PropTypes.bool,
  onLikeComment: PropTypes.func.isRequired,
  onDislikeComment: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  currentUser: {},
  fetching: false,
};

export const mapStateToProps = ({
  comment: {
    body, commentList, updateBody, fetching,
  },
  currentUser: { profile, isLoggedIn },
}) => ({
  body,
  currentUser: profile,
  commentList,
  updateBody,
  isLoggedIn,
  fetching,
});

export const mapDispatchToProps = dispatch => ({
  onCommentInput: ({ body }) => dispatch(handleCommentInput({ body })),
  onSubmitComment: (comment, articleSlug) => dispatch(submitComment(comment, articleSlug)),
  onDeleteComment: (id, articleSlug) => dispatch(deleteComment(id, articleSlug)),
  onUpdateComment: (id, articleSlug, body) => dispatch(updateComment(id, articleSlug, body)),
  onUpdateCommentInput: value => dispatch(setUpdateCommentBody(value)),
  onLikeComment: (articleSlug, commentId) => dispatch(commentLike(articleSlug, commentId)),
  onDislikeComment: (articleSlug, commentId) => dispatch(commentDislike(articleSlug, commentId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);
