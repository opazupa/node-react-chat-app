import { Typography } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

/**
 * ILoadingProps
 *
 * @interface ILoadingProps
 */
interface ILoadingProps {
  text: string;
}

/**
 * Loading component with blink animation.
 */
const Loading = styled(({ text, ...props }: ILoadingProps) => {
  return (
    <Typography variant="h6" color="textPrimary" {...props}>
      {text}
    </Typography>
  );
})`
  animation: blinker 2s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

export default Loading;
