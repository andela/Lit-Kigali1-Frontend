import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DislikeCard from './DislikeCard';
import { fetchDislikes } from '../../redux/actions/articleActions';

export class Dislikes extends Component {
  componentDidMount() {
    const {
      match: {
        params: { articleSlug },
      },
      onFetchDislikes,
    } = this.props;
    onFetchDislikes(articleSlug);
  }

  renderLikes = () => {
    const { dislikes, history } = this.props;
    if (dislikes.length === 0) {
      history.push('*');
    }
    return dislikes.map(dislike => (
      <DislikeCard dislike={dislike} key={dislikes.indexOf(dislike)} />
    ));
  };

  render() {
    const { article } = this.props;
    return (
      <div className="main-content">
        <div className="ratings-container">
          <h1 className="color-primary">{article.title}</h1>
          <h2>Dislikes</h2>
          {this.renderLikes()}
        </div>
      </div>
    );
  }
}

Dislikes.propTypes = {
  article: PropTypes.object,
  dislikes: PropTypes.array,
  onFetchDislikes: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
};

Dislikes.defaultProps = {
  article: {},
  dislikes: [],
};

export const mapStateToProps = ({ article: { article, dislikes } }) => ({
  article,
  dislikes,
});

export const mapDispatchToProps = dispatch => ({
  onFetchDislikes: articleSlug => dispatch(fetchDislikes(articleSlug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dislikes);
