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
import { onUserRateArticle } from '../../redux/actions/currentUserActions';

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

  onSelectedRating = (e) => {
    e.stopPropagation();
    const {
      rateArticle,
      singleArticle: { slug },
    } = this.props;
    const { value } = e.target.dataset;
    rateArticle({ articleSlug: slug, rate: value });
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

  navigateToRatings = (e) => {
    const { url } = e.target.dataset;
    const { history } = this.props;
    history.push(url);
  };

  render() {
    const { singleArticle } = this.props;
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

              <div className="row content-space-between">
                <div className="article-side-actions">
                  <span>{singleArticle.readingTime}</span>
                  <span
                    data-name="rate-btn"
                    className={`article-icon-right hover-primary margin-top ${
                      singleArticle.rated ? 'rated' : ''
                    }`}
                    role="presentation"
                    data-url={`/articles/${singleArticle.slug}/ratings`}
                    onClick={this.navigateToRatings}
                  >
                    {singleArticle.rating}
                    <i className={`fa fa-star${singleArticle.rated ? '' : '-o'} ml-5`} />
                  </span>
                  <button className="article-icon-right hover-primary margin-top">
                    <i className="fa fa-thumbs-up" />
                  </button>
                  <button className="article-icon-right hover-primary margin-top">
                    <i className="fa fa-thumbs-down article-icon-right" />
                  </button>
                  <button className="article-icon-right hover-primary margin-top">
                    <i
                      className="fa fa-bookmark-o article-icon-right"
                      title="bookmark this article"
                    />
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
                    <button
                      className={singleArticle.rated === 5 ? 'selected' : ''}
                      data-value="5"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 4 ? 'selected' : ''}
                      data-value="4"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 3 ? 'selected' : ''}
                      data-value="3"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 2 ? 'selected' : ''}
                      data-value="2"
                      onClick={this.onSelectedRating}
                    />

                    <button
                      className={singleArticle.rated === 1 ? 'selected' : ''}
                      data-value="1"
                      onClick={this.onSelectedRating}
                    />
                  </div>
                </div>
                <div className="items-center">
                  <a href="#modal-report" className="hover-primary gray-icon">
                    <i className="fa fa-file mr-5 gray-icon" />
                    Report
                  </a>
                </div>
              </div>
            </div>
            {this.renderTags()}
          </div>
        </div>
        <a className="go-top-btn" href="#">
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
  getArticle: articleSlug => dispatch(fetchArticle(articleSlug)),
  rateArticle: payload => dispatch(onUserRateArticle(payload)),
});

Article.propTypes = {
  singleArticle: PropTypes.object,
  match: PropTypes.any.isRequired,
  getArticle: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  history: PropTypes.object.isRequired,
  rateArticle: PropTypes.func.isRequired,
};

Article.defaultProps = {
  singleArticle: {},
  currentUser: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
