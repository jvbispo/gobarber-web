import styled, { css } from 'styled-components';
import ToolTip from '../toltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
 /*background: #232129;*/
 /* border-radius: 5px;*/
  border-bottom: 2px solid #aaa;
  padding: 8px;
  width: 100%;
  color: #f4edd8;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 20px;
  }

  svg {
    margin-right: 16px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      color: #cc3030;
      border-bottom: 2px solid #cc3030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-bottom: 2px solid #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
  input {
    background-color: transparent;
    flex: 1;
    border: none;
    color: #f4edd8;
  }
`;

export const Error = styled(ToolTip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
  }

  &::before {
    border-color: #cc3030 transparent;
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
