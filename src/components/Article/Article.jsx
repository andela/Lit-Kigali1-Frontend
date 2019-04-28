import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parser as HtmlToReact } from 'html-to-react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Editor, EditorState, convertFromRaw, CompositeDecorator,
} from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import { fetchArticle } from '../../redux/actions/articleActions';
import { mediaBlockRenderer } from '../../helpers/editorPlugins/mediaBlockRenderer';
import addLinkPlugin from '../../helpers/editorPlugins/addLink';
import createHighlightPlugin from '../../helpers/editorPlugins/highlight';
import Comment from '../Comment/Comment';

const highlightPlugin = createHighlightPlugin();
export class Article extends Component {
  constructor() {
    super();
    this.decorator = new MultiDecorator(
      [new CompositeDecorator(addLinkPlugin.decorators)],
    );
  }

  componentDidMount() {
    const {
      match: {
        params: { articleSlug },
      },
      getArticle,
    } = this.props;
    getArticle(articleSlug);
  }

  renderBody = () => {
    const {
      singleArticle: { body },
    } = this.props;
    if (body.match(/blocks/)) {
      const editorObject = convertFromRaw(JSON.parse(body));
      const editorState = EditorState.createWithContent(editorObject, this.decorator);
      return (
        <Editor
          className="article-text"
          name="body"
          editorState={editorState}
          blockRendererFn={mediaBlockRenderer}
          customStyleMap={highlightPlugin.customStyleMap}
          readOnly
        />
      );
    }
    return new HtmlToReact().parse(body);
  };

  renderDate = () => {
    const {
      singleArticle: { createdAt },
    } = this.props;
    return `Published On: ${moment(createdAt).format('LLLL')}`;
  };

  renderTags = () => {
    const {
      singleArticle: { tagList },
    } = this.props;
    return (
      <div className="row">
        <div className="col-12 content-center">
          {tagList.map(tag => (
            <span key={tag} className="tagged">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  renderCover = () => {
    const {
      singleArticle: { cover },
    } = this.props;
    if (!cover) return '';
    return (
      <div className="col-12">
        <div
          className="article-image"
          style={{
            backgroundImage: `url("${cover}")`,
          }}
        />
      </div>
    );
  };

  render() {
    const { singleArticle, history } = this.props;
    return (
      <section className="main-content">
        <div className="container content-margin">
          <br />
          <h1 className="article-view-title">{singleArticle.title}</h1>
          <div className="row">
            {this.renderCover()}
            <div className="col-12">
              {this.renderBody()}
              <p className="article-date">{this.renderDate()}</p>

              <div className="row">
                <div className="article-side-actions">
                  <span>{singleArticle.readingTime}</span>
                  <span className="article-icon hover-primary margin-top">
                    {singleArticle.rating}
                    <i className="fa fa-star-o ml-5" />
                  </span>
                  <button className="article-icon hover-primary margin-top">
                    <i className="fa fa-thumbs-up" />
                  </button>
                  <button className="article-icon hover-primary margin-top">
                    <i className="fa fa-thumbs-down article-icon" />
                  </button>
                  <button className="article-icon hover-primary margin-top">
                    <i className="fa fa-bookmark article-icon" title="bookmark this article" />
                  </button>
                </div>
                <div className="article-share">
                  <p>Share this article</p>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-facebook-square" title="Share via Facebook" />
                  </button>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-twitter-square" title="Share via Twitter" />
                  </button>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-linkedin-square" title="Share via LinkedIn" />
                  </button>
                  <button className="article-icon hover-primary">
                    <i className="fa fa-envelope" title="Share via Mail " />
                  </button>
                </div>
                <div className="rating-wrapper">
                  <p>Rate this article</p>
                  <div className="rate">
                    <label htmlFor="star5" title="text">
                      5 stars
                      <input type="radio" id="star5" name="rate" value="5" />
                    </label>

                    <label htmlFor="star4" title="text">
                      4 stars
                      <input type="radio" id="star4" name="rate" value="4" />
                    </label>

                    <label htmlFor="star3" title="text">
                      3 stars
                      <input type="radio" id="star3" name="rate" value="3" />
                    </label>

                    <label htmlFor="star2" title="text">
                      2 stars
                      <input type="radio" id="star2" name="rate" value="2" />
                    </label>

                    <label htmlFor="star1" title="text">
                      1 star
                      <input type="radio" id="star1" name="rate" value="1" />
                    </label>
                  </div>
                </div>
                <div className="items-center">
                  <a href="#modal-report" className="hover-primary">
                    <i className="fa fa-file" />
                    {' '}
                    Report
                  </a>
                </div>
              </div>
            </div>
            {this.renderTags()}
          </div>
          <Comment articleSlug={singleArticle.slug} history={history} />
        </div>
        <a className="go-top-btn" href="/#">
          <i className="fa fa-angle-up" />
        </a>
      </section>
    );
  }
}

export const mapStateToProps = ({
  article: { loading, singleArticle, submitting },
  currentUser: { profile },
}) => ({
  loading,
  singleArticle,
  submitting,
  currentUser: profile,
});

export const mapDispatchToProps = dispatch => ({
  getArticle: slug => dispatch(fetchArticle(slug)),
});

Article.propTypes = {
  singleArticle: PropTypes.object,
  match: PropTypes.any.isRequired,
  getArticle: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
};

Article.defaultProps = {
  singleArticle: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
