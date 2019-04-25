import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="main-content">
    <div className="container is-column content-center">
      <h1 style={{ background: 'gray', color: 'white' }}>Home Component</h1>
      <div className="align-center color-primary">
        <Link className="title-1 color-primary" to="/profiles/olivier">
          Go to -&gt;
          <span className="color-green">Profile</span>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
