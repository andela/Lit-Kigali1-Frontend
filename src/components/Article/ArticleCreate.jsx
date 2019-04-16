import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import BoldButton from '../../assets/images/format-bold.svg';
import ItalicButton from '../../assets/images/format-italic.svg';
import UnderlinedButton from '../../assets/images/format-underlined.svg';
import LinkButton from '../../assets/images/format-link.svg';
import ImageButton from '../../assets/images/format-image.svg';
import VideoButton from '../../assets/images/format-video.svg';
import { clearArticleForm, onArticleFormInput } from '../../redux/actions/articleActions';
import createHighlightPlugin from '../../helpers/editorPlugins';


export class ArticleCreate extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    const highlightPlugin = createHighlightPlugin();
    this.plugins = [
      highlightPlugin,
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

  render() {
    const { onInputChange, article } = this.props;
    const { editorState } = this.state;
    return (
      <section className="main-content">
        <div className="container content-margin">
          <div className="row">
            <div className="col-2-mob" />
            <div className="col-10-mob mt-10">
              <div className="input primary-border">
                <Input
                  type="text"
                  onChange={onInputChange}
                  value={article.title}
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
                <Button classes="transparent">
                  <LinkButton className="logo" width={30} height={30} />
                </Button>
                <Button classes="transparent">
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
                  onChange={this.onBodyChange}
                  handleKeyCommand={this.handleKeyCommand}
                  plugins={this.plugins}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 content-left">
              <div id="tags">
                <span className="tag">laborum</span>
                <span className="tag">lorem</span>
                <input
                  onChange={() => console.log('ooo')}
                  type="text"
                  value=""
                  placeholder="Add a tag"
                />
              </div>
            </div>
            <div className="col-6 content-right">
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
      </section>
    );
  }
}

export const mapStateToProps = ({ article: { loading, article, submitting } }) => ({
  article,
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
});

ArticleCreate.propTypes = {
  article: PropTypes.object,
  onInputChange: PropTypes.func.isRequired,
};

ArticleCreate.defaultProps = {
  article: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleCreate);
