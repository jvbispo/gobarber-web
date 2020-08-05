import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, inputRef, registerField]);

  return (
    <Container
    isFocused={isFocused}
    isFilled={isFilled}
    isErrored={!!error}
    data-testid='input-Container'
    >
      {Icon && <Icon />}
      <input
        {...rest}
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
