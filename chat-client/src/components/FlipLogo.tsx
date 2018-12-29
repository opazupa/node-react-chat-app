import fireLogo from '@app/logos/fireLogo.png';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

/**
 * Filpping logo on hover.
 */
const FlipLogo = styled(props => (
  <div {...props}>
    <div className="flip-container">
      <div className="flipper">
        <div className="front">
          <img src={fireLogo} />
        </div>
        <div className="back">
          <Typography variant="h6">Hi 🐑!</Typography>
        </div>
      </div>
    </div>
  </div>
))`
  /* entire container, keeps perspective */
  .flip-container {
    perspective: 1000px;
  }
  /* flip the pane when hovered */
  .flip-container:hover .flipper,
  .flip-container.hover .flipper {
    transform: rotateY(180deg);
  }

  .flip-container,
  .front,
  .back {
    width: 150px;
    height: 150px;
  }

  /* flip speed goes here */
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;

    position: relative;
  }

  /* hide back of pane during swap */
  .front,
  .back {
    backface-visibility: hidden;
    padding: 15px;
    border-radius: 100px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 0;
    left: 0;
  }

  /* front pane, placed above back */
  .front {
    z-index: 2;
    /* for firefox 31 */
    transform: rotateY(0deg);
  }

  /* back, initially hidden pane */
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateY(180deg);
  }
`;

export default FlipLogo;
