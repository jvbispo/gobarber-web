import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  border: 0;
  height: 56px;
  padding: 0 16px;
  width: 100%;
  border-radius: 5px;
  margin-top: 16px;
  transition: background-color 0.2s;
  color: #312e38;
  font-weight: 500;

  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
  }
`;
