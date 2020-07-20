/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/singIn';

const mockedHistoryPush = jest.fn();

jest.mock('../../hooks/authContext', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

jest.mock('../../hooks/toastContext', () => {
  return {
    useToast: () => ({
      addToast: jest.fn(),
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Sign In page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const email = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Password');
    const buttonElement = getByText('Entrar');

    fireEvent.change(email, { target: { value: 'joao@teste.com' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const email = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Password');
    const buttonElement = getByText('Entrar');

    fireEvent.change(email, { target: { value: 'fail-test' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
