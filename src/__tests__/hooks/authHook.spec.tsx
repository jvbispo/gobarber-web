/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/authContext';
import { api } from '../../services/api';

const apiMock = new MockAdapter(api);

describe('authHook', () => {
  it('should be able to sign in', async () => {
    const apiResult = {
      user: { id: '123', name: 'john', email: 'example@example.com' },
      token: 'token',
    };
    apiMock.onPost('sessions').replyOnce(200, apiResult);
    const storageSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'example@example.com',
      password: '123123',
    });

    await waitForNextUpdate();

    expect(storageSpy).toHaveBeenCalledWith('@gobarber:token', apiResult.token);
    expect(storageSpy).toHaveBeenCalledWith(
      '@gobarber:user',
      JSON.stringify(apiResult.user),
    );
    expect(result.current.user.email).toEqual('example@example.com');
  });

  it('should restore data from storage when signing in', async () => {
    const apiResult = {
      user: { id: '123', name: 'john', email: 'example@example.com' },
      token: 'token',
    };
    // apiMock.onPost('sessions').replyOnce(200, apiResult);
    const storageSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key) => {
        switch (key) {
          case '@gobarber:token':
            return apiResult.token;
          case '@gobarber:user':
            return JSON.stringify(apiResult.user);
          default:
            return null;
        }
      });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(storageSpy).toHaveBeenCalledWith('@gobarber:token');
    expect(storageSpy).toHaveBeenCalledWith('@gobarber:user');
    expect(result.current.user.email).toEqual('example@example.com');
  });

  it('should be able to sign out', async () => {
    const storageSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(storageSpy).toHaveBeenCalledWith('@gobarber:token');
    expect(storageSpy).toHaveBeenCalledWith('@gobarber:user');
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user', async () => {
    const apiResult = {
      user: {
        id: '123',
        name: 'john',
        email: 'example@example.com',
        avatar_url: 'algo',
      },
    };
    // apiMock.onPost('sessions').replyOnce(200, apiResult);
    const storageSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(apiResult.user);
    });

    expect(storageSpy).toHaveBeenCalledWith(
      '@gobarber:user',
      JSON.stringify(apiResult.user),
    );
    expect(result.current.user.email).toEqual('example@example.com');
  });
});
