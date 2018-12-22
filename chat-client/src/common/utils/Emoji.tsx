import * as React from 'react';
import styled from 'styled-components';

interface IEmojiProps {
  symbol: string;
  label?: string;
}

export const Emoji = styled(({ symbol, label, ...props }: IEmojiProps) => {
  return (
    <span {...props} className="emoji" role="img" aria-label={label ? label : ''} aria-hidden={label ? 'false' : 'true'}>
      {symbol}
    </span>
  );
})``;
