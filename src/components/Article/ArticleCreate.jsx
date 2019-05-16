import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import BoldButton from '../../assets/images/format-bold.svg';
import ItalicButton from '../../assets/images/format-italic.svg';
import UnderlinedButton from '../../assets/images/format-underlined.svg';
import LinkButton from '../../assets/images/format-link.svg';
import ImageButton from '../../assets/images/format-image.svg';
import VideoButton from '../../assets/images/format-video.svg';
import TitleButton from '../../assets/images/format-size.svg';
import {
  clearArticleForm,
  onArticleFormInput,
  addTag,
  removeTag,
  updateEditorState,
  submitArticle,
  fetchAndUpdateArticle,
  updateArticle,
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
import getCover from '../../helpers/getCover';
import Toast from '../common/Toast/Toast';

const highlightPlugin = createHighlightPlugin();
export class ArticleCreate extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      tag: '',
      isModel: false,
      link: '',
      isEdit: false,
    };
    this.plugins = [
      highlightPlugin,
      addLinkPlugin,
    ];
    this.uploadImageButton = React.createRef();
    this.uploadVideoButton = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      const { history, isLoggedIn } = this.props;
      if (!isLoggedIn) {
        history.push('/auth');
      }
    }, 1000);
    const {
      match: {
        params: { articleSlug },
      },
      getArticle,
    } = this.props;
    if (articleSlug) {
      getArticle(articleSlug).then(({ article }) => {
        const newEditorState = convertFromRaw(JSON.parse(article.body));
        const editor = EditorState.createWithContent(newEditorState);
        this.setState({ editorState: editor });
      });
      this.setState({ isEdit: true });
    }
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

  handleHeader = () => {
    const { editorState } = this.state;
    this.onBodyChange(RichUtils.toggleBlockType(editorState, 'header-two'));
  };

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

  addLink = (e) => {
    const { editorState, link } = this.state;
    const { newEditorState, selectedText, entityKey } = getLink(editorState, link);
    this.onBodyChange(RichUtils.toggleLink(newEditorState, selectedText, entityKey));
    this.setState({ isModel: false });
    e.preventDefault();
    return 'handled';
  }

  addImage = e => upLoadFile(e.target.files[0]).then((url) => {
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
  })

  addVideo = e => upLoadFile(e.target.files[0]).then((url) => {
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
  })

  publish = (status) => {
    const { createArticle, postArticle } = this.props;
    const description = getDescription(createArticle.body.blocks);
    const cover = getCover(createArticle.body.entityMap);
    const article = {
      ...createArticle,
      body: JSON.stringify(createArticle.body),
      description,
      status,
      cover,
    };
    postArticle(article);
  }

  edit = () => {
    const {
      onUpdateArticle,
      createArticle,
      match: {
        params: { articleSlug },
      },
    } = this.props;
    const description = getDescription(createArticle.body.blocks);
    const cover = getCover(createArticle.body.entityMap);
    const article = {
      ...createArticle,
      body: JSON.stringify(createArticle.body),
      description,
      cover,
    };
    onUpdateArticle(articleSlug, article);
  }

  openModel = () => (
    <div className="my-article-modal active">
      <div className="create-article-wrap">
        <form onSubmit={this.addLink}>
          <input type="text" placeholder="paste a link" className="bg-primary-light" name="url" onChange={e => this.setState({ link: e.target.value })} data-el="link-input" />
        </form>
      </div>
    </div>
  );

  showToast = () => {
    const { message } = this.props;
    if (message.length) {
      return <Toast show type="error" message={message} />;
    }
    return '';
  };

  render() {
    const {
      onInputChange,
      createArticle,
      message,
      history,
    } = this.props;
    const {
      editorState,
      tag,
      isModel,
      isEdit,
    } = this.state;
    if (message === 'Article created successfully' || message === 'Article updated successfully') {
      history.push(`/articles/${createArticle.slug}`);
    }
    return (
      <section className="main-content">
        { isModel ? this.openModel() : ''}
        <div className="container content-margin">
          {this.showToast()}
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
                  dataTest="article-input"
                  data-el="article-input"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2-mob">
              <div className="article-actions">
                <Button classes="transparent" onClick={this.handleHeader} data-el="title-btn">
                  <TitleButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={this.handleBold} data-el="bold-btn">
                  <BoldButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={this.handleItalic} data-el="italic-btn">
                  <ItalicButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={this.handleUnderline} data-el="underline-btn">
                  <UnderlinedButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={() => this.setState({ isModel: !isModel })} data-el="link-btn">
                  <LinkButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={() => this.uploadImageButton.current.click()} data-el="image-btn">
                  <input type="file" ref={this.uploadImageButton} hidden onChange={this.addImage} name="image" data-el="image-input" />
                  <ImageButton className="logo" width={25} height={25} />
                </Button>
                <Button classes="transparent" onClick={() => this.uploadVideoButton.current.click()} data-el="video-btn">
                  <input type="file" ref={this.uploadVideoButton} hidden onChange={this.addVideo} name="video" data-el="video-input" />
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
              <div className="tags">
                {this.displayTag()}
                <form onSubmit={this.handleTagSubmit} className="width-100" data-test="tag-form">
                  <input
                    type="text"
                    name="tag"
                    onChange={this.handleTag}
                    value={tag}
                    placeholder="Add a tag..."
                    data-test="tag-input"
                  />
                </form>
              </div>
            </div>
            <div className="col-2 content-right">
              <div>
                { isEdit ? <Button classes="primary save-article-btn" onClick={this.edit} data-el="edit-btn">Save</Button>
                  : (
                    <Button classes="primary save-article-btn">
                      Save
                      <div className="options">
                        <ul>
                          <li>
                            <a href="#/draft" onClick={() => { this.publish('unpublished'); }} data-el="draft-btn">Save as Draft</a>
                          </li>
                          <li>
                            <a href="#/publish" onClick={() => { this.publish('published'); }} data-el="publish-btn">Publish</a>
                          </li>
                        </ul>
                      </div>
                    </Button>
                  )
                }
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
  currentUser: { isLoggedIn },
}) => ({
  createArticle,
  loading,
  submitting,
  message,
  isLoggedIn,
});

export const mapDispatchToProps = dispatch => ({
  onInputChange: ({ target }) => dispatch(
    onArticleFormInput({
      field: target.name,
      value: target.value,
    }),
  ),
  onClearForm: () => dispatch(clearArticleForm()),
  onTagFormSubmit: tag => dispatch(addTag(tag)),
  onTagRemove: index => dispatch(removeTag(index)),
  onUpdateEditorState: newState => dispatch(updateEditorState(newState)),
  postArticle: article => dispatch(submitArticle({ article })),
  getArticle: slug => dispatch(fetchAndUpdateArticle(slug)),
  onUpdateArticle: (slug, article) => dispatch(updateArticle(slug, article)),
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
  match: PropTypes.any,
  getArticle: PropTypes.func.isRequired,
  onUpdateArticle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

ArticleCreate.defaultProps = {
  createArticle: {},
  message: '',
  match: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleCreate);
