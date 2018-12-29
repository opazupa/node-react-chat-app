import { IUser } from '@app/common/models';
import { Emoji } from '@app/common/utils';
import * as React from 'react';

/**
 * IDrawerContentProps
 *
 * @interface IInfoBlockProps
 */
interface IInfoBlockProps {
  user?: IUser;
}

/**
 * Info block component.
 * @param props
 */
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
