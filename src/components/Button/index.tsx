import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => {
  return (
    <Container {...rest}>{loading ? 'carregando...' : children}</Container>
  );
};

export default Button;
