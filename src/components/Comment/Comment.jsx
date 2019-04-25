import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  handleCommentInput,
  submitComment,
  deleteComment,
  updateComment,
} from '../../redux/actions/commentAction';
import Button from '../common/Button/Button';

class Comment extends Component {
  state = {
    isEdit: false,
  }

  addComment = (e) => {
    const { body, articleSlug, onSubmitComment } = this.props;
    onSubmitComment(body, articleSlug);
    e.preventDefault();
  }

  onChange = (e) => {
    const { onCommentInput } = this.props;
    onCommentInput({ body: e.target.value });
    e.preventDefault();
  }

  // updateComment = () => {
  //   const { body, articleSlug, onUpdateComment } = this.props;
  //   onUpdateComment(id, articleSlug, body);
  // }

  displayComments = () => {
    const {
      commentList,
      currentUser,
      onDeleteComment,
      articleSlug,
      onUpdateComment,
    } = this.props;
    const { isEdit } = this.state;
    if (commentList.length) {
      return (
        commentList.map(comment => (
          isEdit ? this.commentForm(onUpdateComment) : (
            <div key={comment.id} className="box">
              <p>{comment.body}</p>
              {(comment.userId === currentUser.id) && (
              <span>
                <Button
                  classes="my-article-delete"
                  onClick={() => onDeleteComment(comment.id, articleSlug)}
                >
                  <i className="fa fa-trash" />
                </Button>
                <Button
                  classes="my-comment-update"
                  onClick={this.onEditComment}
                >
                  <i className="fa fa-edit" />
                </Button>
              </span>
              ) }
            </div>
          )))
      );
    }
    return '';
  }

  commentForm = () => {
    const { body } = this.props;
    return (
      <form onSubmit={this.addComment}>
        <textarea
          className="comment-textarea"
          placeholder="Add your comment.."
          type="text"
          value={body}
          onChange={this.onChange}
        />
        <Button classes="primary comment-button" onClick={this.addComment}>Comment</Button>
      </form>
    );
  }

  onEditComment = () => {
    this.setState({
      isEdit: true,
    });
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
  currentUser: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
};

export const mapStateToProps = ({
  comment: { body, commentList },
  currentUser: {
    profile,
  },
}) => ({
  body,
  currentUser: profile,
  commentList,
});

export const mapDispatchToProps = dispatch => ({
  onCommentInput: ({ body }) => { dispatch(handleCommentInput({ body })); },
  onSubmitComment: (comment, articleSlug) => { dispatch(submitComment(comment, articleSlug)); },
  onDeleteComment: (id, articleSlug) => { dispatch(deleteComment(id, articleSlug)); },
  onUpdateComment: (id, articleSlug, body) => { dispatch(updateComment(id, articleSlug, body)); },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);
