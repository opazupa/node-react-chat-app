import { IUser } from '@app/common/models';
import { Emoji } from '@app/common/utils';
import * as React from 'react';

interface IInfoBlockProps {
  user?: IUser;
}

const InfoBlock = (props: IInfoBlockProps) => {
  const { user } = props;

  return (
    <span>
      {user && user.userName ? (
        <span>
          {user.userName}&nbsp;
          <Emoji symbol="💥" />
        </span>
      ) : (
        <span>
          Hi there mate!&nbsp;
          <Emoji symbol="💣" />
        </span>
      )}
    </span>
  );
};

export default InfoBlock;
