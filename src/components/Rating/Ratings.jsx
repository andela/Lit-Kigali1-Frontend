import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticleRatings } from '../../redux/actions/articleActions';
import RatingCard from './RatingCard';

export class Ratings extends Component {
  componentDidMount() {
    const {
      match: {
        params: { articleSlug },
      },
      fetchRatings,
    } = this.props;
    fetchRatings({ articleSlug });
  }

  renderRatings = () => {
    const { ratings } = this.props;
    return ratings.map(rate => <RatingCard rate={rate} key={rate.id} />);
  };

  render() {
    const { loadingRatings, article } = this.props;
    if (loadingRatings) return '';
    return (
      <div className="main-content">
        <div className="ratings-container">
          <h1 className="color-primary">{article.title}</h1>
          <h2>Ratings</h2>
          {this.renderRatings()}
        </div>
      </div>
    );
  }
}

Ratings.propTypes = {
  article: PropTypes.object,
  loadingRatings: PropTypes.bool,
  ratings: PropTypes.array,
  fetchRatings: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
};

Ratings.defaultProps = {
  article: {},
  loadingRatings: true,
  ratings: [],
};

export const mapStateToProps = ({ article: { article, loadingRatings, ratings } }) => ({
  article,
  loadingRatings,
  ratings,
});

export const mapDispatchToProps = dispatch => ({
  fetchRatings: payload => dispatch(fetchArticleRatings(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ratings);
