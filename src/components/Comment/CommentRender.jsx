import React, { Component } from 'react';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Button from '../common/Button/Button';
import avatar from '../../assets/images/avatar.png';

export class CommentRender extends Component {
  state = {
    isEdit: false,
  };

  commentBox = () => {
    const { isEdit } = this.state;
    const {
      comment, currentUser, onDeleteComment, articleSlug, originalComment,
    } = this.props;
    return (
      <div key={comment.id} className="comment-box">
        <div className="comment-header">
          <a className="author-name" href={`../profiles/${comment.author.username}`}>
            <img
              src={comment.author.image ? comment.author.image : avatar}
              alt=""
              className="profile-avatar"
            />
            {comment.author.username}
          </a>
          {comment.userId === currentUser.id ? (
            <span className="control-btn">
              <Button
                classes="my-article-delete"
                data-el="delete-btn"
                onClick={() => onDeleteComment(comment.id, articleSlug)}
              >
                <i className="fa fa-trash" />
              </Button>
              <Button
                data-el="edit-btn"
                classes="my-comment-update"
                onClick={() => this.onEditComment(comment.body)}
              >
                <i className="fa fa-edit" />
              </Button>
            </span>
          ) : null}
        </div>
        <div
          onDoubleClick={() => comment.userId === currentUser.id && this.onEditComment(comment.body)
          }
          data-el="comment-container"
        >
          {isEdit ? this.commentForm(comment.id) : comment.body}
          <button
            className="comment-time tooltip"
            onClick={() => this.originalComment(articleSlug, comment.id)}
          >
            {comment.version === 'edited' && ` (${comment.version})`}
            <span className="tooltip">
              <h4>{originalComment.commentId === comment.id && originalComment.body}</h4>
              {moment().fromNow()}
            </span>
          </button>
        </div>
        <span />
        <div className="comment-time">{moment(comment.createdAt).fromNow()}</div>
        <div />
      </div>
    );
  };

  originalComment = (art, id) => {
    const { onFetchHistory } = this.props;
    onFetchHistory(art, id);
  };

  commentForm = (id) => {
    const { updateComment, enterPress, updateBody } = this.props;
    return (
      <form>
        <Textarea
          className="comment-textarea"
          placeholder="Update your comment..."
          type="text"
          value={updateBody}
          onKeyDown={(e) => {
            enterPress(e, updateComment, id);
            this.closeCommentInput(e);
          }}
          onBlur={this.onFocusOut}
          onChange={this.onChange}
          autoFocus
        />
      </form>
    );
  };

  onEditComment = (body) => {
    const { inputHandler } = this.props;
    this.setState({
      isEdit: true,
    });
    inputHandler(body);
  };

  onFocusOut = () => {
    this.setState({
      isEdit: false,
    });
  };

  closeCommentInput = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (!e.target.value.trim()) {
        e.preventDefault();
        return;
      }
      this.onFocusOut();
      e.preventDefault();
    }
  };

  onChange = (e) => {
    const { inputHandler } = this.props;
    inputHandler(e.target.value);
  };

  render() {
    return this.commentBox();
  }
}

CommentRender.propTypes = {
  articleSlug: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  enterPress: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  updateBody: PropTypes.string.isRequired,
  onFetchHistory: PropTypes.func.isRequired,
  originalComment: PropTypes.object.isRequired,
};

export const mapStateToProps = ({ comment: { updateBody, originalComment } }) => ({
  updateBody,
  originalComment,
});

export default connect(mapStateToProps)(CommentRender);
