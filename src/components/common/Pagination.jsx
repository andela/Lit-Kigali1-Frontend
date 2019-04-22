import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Pagination extends Component {
  navigateTo = (e) => {
    const { history, url } = this.props;
    console.log(e.target.dataset);
    if (history && url) {
      history.push(`${url}?page=${e.target.dataset.value}`);
      window.location.reload();
    }
  };

  PaginationIcon = () => {
    const { totalPages, currentPage } = this.props;
    const icon = [];
    if (totalPages <= 5) {
    }
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        icon.push(
          <li data-value={i} className="page current" onClick={this.navigateTo}>
            {i}
          </li>,
        );
      } else {
        icon.push(
          <li data-value={i} className="page" onClick={this.navigateTo}>
            {i}
          </li>,
        );
      }
    }
    return icon;
  };

  render() {
    const { totalPages } = this.props;
    return (
      <div className="pagination">
        <span data-value={1} className="page" onClick={this.navigateTo}>
          First
        </span>
        <span>
          <i className="fa fa-angle-left" />
        </span>
        <ul className="pages">{this.PaginationIcon()}</ul>
        <span>
          <i className="fa fa-angle-right" />
        </span>
        <span data-value={totalPages} className="page" onClick={this.navigateTo}>
          Last
        </span>
      </div>
    );
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  url: PropTypes.string,
  history: PropTypes.object,
};

Pagination.defaultProps = {
  totalPages: 1,
  currentPage: 1,
  url: '',
  history: {},
};

export default Pagination;
