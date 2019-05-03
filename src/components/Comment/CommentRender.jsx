import React from 'react';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Button from '../common/Button/Button';
import avatar from '../../assets/images/avatar.png';
import { fetchCommentLikes, fetchCommentDislikes } from '../../redux/actions/commentAction';

export class CommentRender extends React.Component {
  state = {
    isEdit: false,
  };

  componentWillMount() {
    const {
      articleSlug,
      comment: { id },
      fetchLikes,
      fetchDislikes,
    } = this.props;
    fetchLikes(articleSlug, id);
    fetchDislikes(articleSlug, id);
  }

  commentBox = () => {
    const { isEdit } = this.state;
    const {
      comment,
      currentUser,
      onDeleteComment,
      articleSlug,
      onLikeComment,
      onDislikeComment,
    } = this.props;
    return (
      <div key={comment.id} className="comment-box">
        <div className="comment-header">
          <Link className="author-name" to={`../profiles/${comment.author.username}`}>
            <img
              src={comment.author.image ? comment.author.image : avatar}
              alt=""
              className="profile-avatar"
            />
            {comment.author.username}
          </Link>
          {comment.userId === currentUser.id && (
            <span className="control-btn">
              <Button
                classes="my-article-delete"
                data-el="delete-btn"
                onClick={() => onDeleteComment(comment.id, articleSlug)}
              >
                <i className="fa fa-trash" title="Delete" />
              </Button>
              <Button
                data-el="edit-btn"
                classes="my-comment-update"
                onClick={() => this.onEditComment(comment.body)}
              >
                <i className="fa fa-edit" title="Edit" />
              </Button>
            </span>
          )}
        </div>
        <div
          onDoubleClick={() => comment.userId === currentUser.id && this.onEditComment(comment.body)
          }
          data-el="comment-container"
        >
          {isEdit ? this.commentForm(comment.body, comment.id) : comment.body}
          <span className="comment-time">
            {comment.version === 'edited' && ` (${comment.version})`}
          </span>
        </div>
        <div className="comment-time">{moment(comment.createdAt).fromNow()}</div>
        <div className="comment-user-action">
          <button className="comment-action" onClick={() => onLikeComment(articleSlug, comment.id)}>
            <i className={`fa fa-thumbs-${comment.liked ? '' : 'o-'}up`} title="Like" />
          </button>
          <span className="comment-action-count">
            {comment.likesCount === 0 ? '' : comment.likesCount}
            <div className="comment-likers">
              {comment.likes
                ? comment.likes.map(like => (
                  <div className="comment-likers-data">
                    <img src={like.author.image || avatar} alt="" className="profile-avatar" />
                    <span>
                      {' '}
                      <a href={`../profiles/${like.author.username}`}>{like.author.username}</a>
                    </span>
                  </div>
                ))
                : ''}
            </div>
          </span>
          <button
            className="comment-action"
            onClick={() => onDislikeComment(articleSlug, comment.id)}
          >
            <i className={`fa fa-thumbs-${comment.disliked ? '' : 'o-'}down`} title="Dislike" />
          </button>
          <span className="comment-action-count">
            {comment.dislikesCount === 0 ? '' : comment.dislikesCount}
            <div className="comment-likers">
              {comment.dislikes
                ? comment.dislikes.map(dislike => (
                  <div className="comment-likers-data">
                    <img src={dislike.author.image || avatar} alt="" className="profile-avatar" />
                    <span>
                      {' '}
                      <a href={`../profiles/${dislike.author.username}`}>
                        {dislike.author.username}
                      </a>
                    </span>
                  </div>
                ))
                : ''}
            </div>
          </span>
        </div>
      </div>
    );
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
    const { isEdit } = this.state;
    const {
      comment, currentUser, onDeleteComment, articleSlug,
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
          {comment.userId === currentUser.id && (
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
          )}
        </div>
        <div
          onDoubleClick={() => comment.userId === currentUser.id && this.onEditComment(comment.body)
          }
          data-el="comment-container"
        >
          {isEdit ? this.commentForm(comment.id) : comment.body}
          <span className="comment-time">
            {comment.version === 'edited' && ` (${comment.version})`}
          </span>
        </div>
        <div className="comment-time">{moment(comment.createdAt).fromNow()}</div>
      </div>
    );
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
  fetchLikes: PropTypes.func.isRequired,
  fetchDislikes: PropTypes.func.isRequired,
  onLikeComment: PropTypes.func.isRequired,
  onDislikeComment: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ comment: { updateBody } }) => ({
  updateBody,
});

export const mapDispatchToProps = dispatch => ({
  fetchLikes: (articleSlug, commentId) => dispatch(fetchCommentLikes(articleSlug, commentId)),
  fetchDislikes: (articleSlug, commentId) => dispatch(fetchCommentDislikes(articleSlug, commentId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentRender);
