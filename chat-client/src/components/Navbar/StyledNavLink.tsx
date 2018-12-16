import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface IStyledNavLinkProps extends NavLinkProps {
  highlightColor: string;
}
const StyledNavLink = styled(({ highlightColor, ...props }: IStyledNavLinkProps) => <NavLink {...props} />)`
  text-decoration: none;
  display: flex;
  box-sizing: border-box;
  border-bottom: 3px solid transparent;
  border-right: 3px solid transparent;
  transition: border 0.5s ease-in-out;

  button {
    box-sizing: border-box;
    border-bottom: 3px solid transparent;
    margin-bottom: -3px;
    font-size: 1.25rem;

    p {
      display: flex;
      align-items: flex-end;
    }
  }

  .button-icon {
    margin-left: 5px;
  }

  &.active {
    border-bottom-color: ${props => props.highlightColor};
  }

  &.drawer-active {
    border-right-color: ${props => props.highlightColor};
  }
`;

export default StyledNavLink;
