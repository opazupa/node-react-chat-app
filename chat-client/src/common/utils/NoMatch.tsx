import * as React from 'react';

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for: <code style={{ color: 'grey' }}>{location.pathname}</code>
    </h3>
  </div>
);

export default NoMatch;
