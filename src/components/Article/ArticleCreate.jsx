import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
} from 'draft-js';
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
  updateEditorState,
  submitArticle,
} from '../../redux/actions/articleActions';
import createHighlightPlugin from '../../helpers/editorPlugins/highlight';
import addLinkPlugin from '../../helpers/editorPlugins/addLink';
import Tag from '../Tag/Tag';
import { mediaBlockRenderer } from '../../helpers/editorPlugins/mediaBlockRenderer';
import getImage from '../../helpers/getImage';
import upLoadFile from '../../helpers/upLoadFile';
import getLink from '../../helpers/getLink';
import getVideo from '../../helpers/getVideo';
import getDescription from '../../helpers/getDescription';

const highlightPlugin = createHighlightPlugin();
export class ArticleCreate extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      tag: '',
      status: 'published',
    };
    this.plugins = [
      highlightPlugin,
      addLinkPlugin,
    ];
    this.uploadImageButton = React.createRef();
    this.uploadVideoButton = React.createRef();
  }

  componentDidMount() {
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  onBodyChange = (editorState) => {
    const { onUpdateEditorState } = this.props;
    this.setState({ editorState });
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
    onUpdateEditorState(rawEditorContent);
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
    const { createArticle: { tagList }, onTagRemove } = this.props;
    return tagList.map(
      (tag, index) => <Tag key={index} onClick={() => onTagRemove({ index })}>{tag}</Tag>,
    );
  }

  addLink = () => {
    const { editorState } = this.state;
    const { newEditorState, selectedText, entityKey } = getLink(editorState);
    this.onBodyChange(RichUtils.toggleLink(newEditorState, selectedText, entityKey));
    return 'handled';
  }

  addImage = (e) => {
    upLoadFile(e.target.files[0]).then((url) => {
      const { editorState } = this.state;
      const { newEditorState, entityKey } = getImage(editorState, url);
      this.setState(
        {
          editorState: AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' ',
          ),
        },
      );
    });
  }

  addVideo = (e) => {
    upLoadFile(e.target.files[0]).then((url) => {
      const { editorState } = this.state;
      const { newEditorState, entityKey } = getVideo(editorState, url);
      this.setState(
        {
          editorState: AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' ',
          ),
        },
      );
    });
  }

  publish = () => {
    const { createArticle, postArticle } = this.props;
    const { status } = this.state;
    const description = getDescription(createArticle.body.blocks);
    const article = {
      ...createArticle,
      body: JSON.stringify(createArticle.body),
      description,
      status,
    };
    postArticle(article);
  }

  render() {
    const {
      onInputChange,
      createArticle,
      message,
      history,
    } = this.props;
    const { editorState, tag } = this.state;
    if (message === 'Article created successfully') {
      history.push(`${createArticle.slug}`);
    }
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
                  value={createArticle.title}
                  placeholder="Enter Title Here"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2-mob">
              <div className="article-actions">
                <Button classes="transparent" onClick={this.handleBold}>
                  <BoldButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={this.handleItalic}>
                  <ItalicButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={this.handleUnderline}>
                  <UnderlinedButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={this.addLink}>
                  <LinkButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={() => this.uploadImageButton.current.click()}>
                  <input type="file" ref={this.uploadImageButton} hidden onChange={this.addImage} name="image" />
                  <ImageButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={() => this.uploadVideoButton.current.click()}>
                  <input type="file" ref={this.uploadVideoButton} hidden onChange={this.addVideo} name="video" />
                  <VideoButton className="logo" width={25} height={25} />
                </Button>
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
            <div className="col-10 content-left">
              <div id="tags">
                {this.displayTag()}
                <form onSubmit={this.handleTagSubmit} className="width-100">
                  <input
                    type="text"
                    name="tag"
                    onChange={this.handleTag}
                    value={tag}
                    placeholder="Add a tag..."
                  />
                </form>
              </div>
            </div>
            <div className="col-2 content-right">
              <div>
                <Button classes="primary save-article-btn">
                  Save
                  <div className="options">
                    <ul>
                      <li>
                        <a href="#/draft" onClick={() => { this.setState({ status: 'unpublished' }); this.publish(); }}>Save as Draft</a>
                      </li>
                      <li>
                        <a href="#/publish" onClick={() => { this.setState({ status: 'published' }); this.publish(); }}>Publish</a>
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

export const mapStateToProps = ({
  article: {
    loading,
    createArticle,
    submitting,
    message,
  },
}) => ({
  createArticle,
  loading,
  submitting,
  message,
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
  onUpdateEditorState: (newState) => { dispatch(updateEditorState(newState)); },
  postArticle: (article) => { dispatch(submitArticle({ article })); },
});

ArticleCreate.propTypes = {
  createArticle: PropTypes.object,
  onInputChange: PropTypes.func.isRequired,
  onTagFormSubmit: PropTypes.func.isRequired,
  onTagRemove: PropTypes.func.isRequired,
  onUpdateEditorState: PropTypes.func.isRequired,
  postArticle: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
  message: PropTypes.string,
};

ArticleCreate.defaultProps = {
  createArticle: {},
  message: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleCreate);
