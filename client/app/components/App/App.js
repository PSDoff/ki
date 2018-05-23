import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => (
  <div className="container">
    <main>
      {children}
    </main>

    <br />
  </div>
);

App.defaultProps = {
  children: '',
};
App.propTypes = {
  children: PropTypes.node,
};

export default App;
