import * as React from 'react';
import styled from 'styled-components';

/**
 * Logo with spinning animation
 */
const SpinningLogo = styled(props => (
  <span style={{ flexGrow: 1 }}>
    <img {...props} />
  </span>
))`
  animation: logo-spin infinite 20s linear;
  height: 60px;

  &:hover {
    animation-direction: alternate;
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default SpinningLogo;
