import React from 'react';
import Input  from '../../components/Input';
import { render, fireEvent, wait } from '@testing-library/react';

jest.mock('@unform/core', () => {
  return {
    useField(){
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    }
  }
})

describe('input component', async () => {
  it('should be able to render a input', () => {
    const { getByPlaceholderText } = render(<Input name='email' placeholder="E-mail" />)

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('it should render a highlight when input on focus', async () =>{
    const { getByPlaceholderText, getByTestId } = render(<Input name='email' placeholder="E-mail" />)

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-Container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
    })

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
    })
  });

  it('it should keep border highlight when input is filled', async () =>{
    const { getByPlaceholderText, getByTestId } = render(<Input name='email' placeholder="E-mail" />)

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-Container');

    fireEvent.focus(inputElement);

    fireEvent.change(inputElement, {target: {value: 'algo'}});
    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
    })
  });
});
