import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastType {
  type?: string;
  hasDescription: boolean;
}

const toastVariation = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6ffcc;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ToastType>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  background: #ebf8ff;
  color: #3172b7;
  border-radius: 4px;

  ${(props) => props.type === 'info' && toastVariation.info}
  ${(props) => props.type === 'success' && toastVariation.success}
  ${(props) => props.type === 'error' && toastVariation.error}

  ${(props) =>
    props.hasDescription === false &&
    css`
      align-items: center;

      > svg {
        margin: 8px 12px 0 0;
      }
    `}

  & + div{
    margin-top: 8px;
  }

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      font-size: 14px;
      opacity: 0.8;
      margin-top: 4px;
      line-height: 20px;
    }
  }
  button {
    position: absolute;
    top: 20px;
    right: 16px;
    opacity: 0.6;
    background: transparent;
    border: none;
    color: inherit;
  }
`;
