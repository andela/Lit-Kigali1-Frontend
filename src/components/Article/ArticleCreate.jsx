import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import BoldButton from '../../assets/images/format-bold.svg';
import ItalicButton from '../../assets/images/format-italic.svg';
import UnderlinedButton from '../../assets/images/format-underlined.svg';
import LinkButton from '../../assets/images/format-link.svg';
import ImageButton from '../../assets/images/format-image.svg';
import VideoButton from '../../assets/images/format-video.svg';
import {
  clearArticleForm,
  onArticleFormInput,
  addTag,
  removeTag,
} from '../../redux/actions/articleActions';
import createHighlightPlugin from '../../helpers/editorPlugins/highlight';
import addLinkPlugin from '../../helpers/editorPlugins/addLink';
import addImagePlugin from '../../helpers/editorPlugins/addImage';
import Tag from '../Tag/Tag';
import { mediaBlockRenderer } from '../../helpers/editorPlugins/mediaBlockRenderer';

const highlightPlugin = createHighlightPlugin();
export class ArticleCreate extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      tag: '',
    };
    this.plugins = [
      highlightPlugin,
      addLinkPlugin,
      addImagePlugin,
    ];
  }

  componentDidMount() {
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  onBodyChange = (editorState) => {
    this.setState({ editorState });
  };

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onBodyChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleItalic = () => {
    const { editorState } = this.state;
    this.onBodyChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  handleBold = () => {
    const { editorState } = this.state;
    this.onBodyChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  handleUnderline = () => {
    const { editorState } = this.state;
    this.onBodyChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  handleTag = (e) => {
    this.setState({ tag: e.target.value });
  }

  handleTagSubmit = (e) => {
    const { onTagFormSubmit } = this.props;
    const { tag } = this.state;
    if (tag.length === 0) {
      e.preventDefault();
      return;
    }
    onTagFormSubmit({ tag });
    this.setState({ tag: '' });
    e.preventDefault();
  }

  displayTag = () => {
    const { singleArticle: { tagList }, onTagRemove } = this.props;
    return tagList.map(
      (tag, index) => <Tag key={index} onClick={() => onTagRemove({ index })}>{tag}</Tag>,
    );
  }

  addLink = () => {
    const { editorState } = this.state;
    const selectedText = editorState.getSelection();
    const link = window.prompt('Enter a link...');

    if (!link) {
      this.onBodyChange(RichUtils.toggleLink(editorState, selectedText, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onBodyChange(RichUtils.toggleLink(newEditorState, selectedText, entityKey));
    return 'handled';
  }

  addImage= () => {
    const { editorState } = this.state;
    const urlValue = window.prompt('Paste Image Link');
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: urlValue },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      'create-entity',
    );
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' ',
        ),
      },
    );
  }

  render() {
    const { onInputChange, singleArticle } = this.props;
    const { editorState, tag } = this.state;
    return (
      <section className="main-content">
        <div className="container content-margin">
          <div className="row">
            <div className="col-2-mob" />
            <div className="col-10-mob mt-10">
              <div className="input primary-border">
                <Input
                  type="text"
                  name="title"
                  onChange={onInputChange}
                  value={singleArticle.title}
                  placeholder="Enter Title Here"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2-mob">
              <div className="article-actions">
                <Button classes="transparent" onClick={this.handleBold}>
                  <BoldButton className="logo" width={30} height={30} />
                </Button>
                <Button classes="transparent" onClick={this.handleItalic}>
                  <ItalicButton className="logo" width={30} height={30} />
                </Button>
                <Button classes="transparent" onClick={this.handleUnderline}>
                  <UnderlinedButton className="logo" width={30} height={30} />
                </Button>
                <Button classes="transparent" onClick={this.addLink}>
                  <LinkButton className="logo" width={30} height={30} />
                </Button>
                <Button classes="transparent" onClick={this.addImage}>
                  <ImageButton className="logo" width={30} height={30} />
                </Button>
                <Button classes="transparent">
                  <VideoButton className="logo" width={30} height={30} />
                </Button>
                {/* <img src="../images/format-bold.svg" className="article-icon margin-top" />
                <img src="../images/format-italic.svg" className="article-icon" />
                <img src="../images/format-underlined.svg" className="article-icon" />
                <img src="../images/format-link.svg" className="article-icon margin-top" />
                <img src="../images/format-image.svg" className="article-icon" />
                <img src="../images/format-video.svg" className="article-icon" /> */}
              </div>
            </div>
            <div className="col-10-mob">
              <div className="text-area">
                <Editor
                  className="article-text"
                  name="body"
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  plugins={this.plugins}
                  onChange={this.onBodyChange}
                  blockRendererFn={mediaBlockRenderer}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 content-left">
              <div id="tags">
                {this.displayTag()}
                <form onSubmit={this.handleTagSubmit} className="width-100">
                  <input
                    type="text"
                    name="tag"
                    onChange={this.handleTag}
                    value={tag}
                    placeholder="Add a tag"
                  />
                </form>
              </div>
            </div>
            <div className="col-6 content-right">
              <div>
                <Button classes="primary save-article-btn">
                  Save
                  <div className="options">
                    <ul>
                      <li>
                        <a href="/#">Save as Draft</a>
                      </li>
                      <li>
                        <a href="/#">Publish</a>
                      </li>
                    </ul>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const mapStateToProps = ({ article: { loading, singleArticle, submitting } }) => ({
  singleArticle,
  loading,
  submitting,
});

export const mapDispatchToProps = dispatch => ({
  onInputChange: ({ target }) => dispatch(
    onArticleFormInput({
      field: target.name,
      value: target.value,
    }),
  ),
  onClearForm: () => dispatch(clearArticleForm()),
  onTagFormSubmit: (tag) => { dispatch(addTag(tag)); },
  onTagRemove: (index) => { dispatch(removeTag(index)); },
});

ArticleCreate.propTypes = {
  singleArticle: PropTypes.object,
  onInputChange: PropTypes.func.isRequired,
  onTagFormSubmit: PropTypes.func.isRequired,
  onTagRemove: PropTypes.func.isRequired,
};

ArticleCreate.defaultProps = {
  singleArticle: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleCreate);
