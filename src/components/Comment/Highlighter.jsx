import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HighlighterButton from '../../assets/images/highlighter-solid.svg';
import Button from '../common/Button/Button';
import CommentRender from './CommentRender';

export class Highlighter extends Component {
  state = {
    showComment: false,
  };

  changeState = () => {
    this.setState(prevState => ({ showComment: !prevState.showComment }));
  };

  render() {
    const {
      contentState, entityKey, children, currentUser,
    } = this.props;
    const {
      anchorKey, comment, articleSlug,
    } = contentState
      .getEntity(entityKey)
      .getData();
    const { showComment } = this.state;
    return (
      <span>
        <span id={anchorKey} className="positioner" />
        <span className="hightlightedText">
          {currentUser.id === comment.userId && (
            <Button
              classes="transparent comment-trigger"
              onClick={this.changeState}
            >
              <HighlighterButton className="logo" width={12} height={12} />
            </Button>
          )}
          {showComment && (
            <div className="article-comment article-comment__obsolute">
              <CommentRender
                comment={comment}
                articleSlug={articleSlug}
                currentUser={currentUser}
                onDeleteComment={this.changeState}
                updateComment={this.changeState}
                enterPress={this.changeState}
                inputHandler={this.changeState}
                onLikeComment={this.changeState}
                onDislikeComment={this.changeState}
              />
            </div>
          )}
          {children}
        </span>
      </span>
    );
  }
}

Highlighter.propTypes = {
  contentState: PropTypes.any.isRequired,
  entityKey: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export const mapStateToProps = ({
  currentUser: {
    profile,
  },
}) => ({
  currentUser: profile,
});

export default connect(mapStateToProps)(Highlighter);
