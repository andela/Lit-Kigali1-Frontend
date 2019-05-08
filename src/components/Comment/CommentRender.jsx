import React from 'react';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Button from '../common/Button/Button';
import avatar from '../../assets/images/avatar.png';

export class CommentRender extends React.Component {
  state = {
    isEdit: false,
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
          onKeyDown={(e) => { enterPress(e, updateComment, id); this.closeCommentInput(e); }}
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
  }

  onFocusOut = () => {
    this.setState({
      isEdit: false,
    });
  }

  closeCommentInput = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (!e.target.value.trim()) {
        e.preventDefault();
        return;
      }
      this.onFocusOut();
      e.preventDefault();
    }
  }

  onChange = (e) => {
    const { inputHandler } = this.props;
    inputHandler(e.target.value);
  }

  render() {
    const { isEdit } = this.state;
    const {
      comment,
      currentUser,
      onDeleteComment,
      articleSlug,
    } = this.props;
    return (
      <div key={comment.id} className="comment-box">
        <div className="comment-header">
          <a className="author-name" href={`../profiles/${comment.author.username}`}>
            <img src={comment.author.image ? comment.author.image : avatar} alt="" className="profile-avatar" />
            {comment.author.username}
          </a>
          {(comment.userId === currentUser.id) && (
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
          onDoubleClick={
          () => comment.userId === currentUser.id && this.onEditComment(comment.body)
          }
          data-el="comment-container"
        >
          {comment.highlightedText && (
          <div className="box">
            <a className="hightlightedText" href={`#${comment.anchorKey}`}>{`"${comment.highlightedText}"`}</a>
          </div>
          )}
          { isEdit ? this.commentForm(comment.id) : comment.body }
          <span className="comment-time">{comment.version === 'edited' && ` (${comment.version})`}</span>
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
};

export const mapStateToProps = ({
  comment: { updateBody },
}) => ({
  updateBody,
});

export default connect(mapStateToProps)(CommentRender);
