import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import BackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  max-width: 100vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

const animationKeyFrame = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: 1s ${animationKeyFrame};

  form {
    margin-top: 50px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4edd8;
      display: block;
      margin-top: 16px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4edd8')};
      }
    }
  }
  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    margin-top: 25px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

const animationBackground = keyframes`
  from{
    opacity: 0;

  }
  to{
    opacity: 1;

  }
  `;

export const Background = styled.div`
  background: url(${BackgroundImg}) no-repeat center;
  flex: 1;
  background-size: cover;
  animation: 2s ${animationBackground};
`;
