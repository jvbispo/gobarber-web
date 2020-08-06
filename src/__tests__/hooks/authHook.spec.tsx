import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
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
});
