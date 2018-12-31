import { ButtonBase } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Logo with spinning animation
 */
const SpinningLogo = styled(props => (
  <span style={{ flexGrow: 1 }}>
    <ButtonBase>
      <Link to="/">
        <img {...props} />
      </Link>
    </ButtonBase>
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
