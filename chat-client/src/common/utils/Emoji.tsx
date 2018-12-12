import * as React from 'react';

interface IEmojiProps {
  symbol: string;
  label?: string;
}

export const Emoji = (props: IEmojiProps) => {
  return (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ''} aria-hidden={props.label ? 'false' : 'true'}>
      {props.symbol}
    </span>
  );
};
