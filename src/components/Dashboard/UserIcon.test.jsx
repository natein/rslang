import React from 'react';
import { render } from '../../../__tests__/test.utils';
import '@testing-library/jest-dom';

import UserIcon from './UserIcon';

describe('UserIcon', () => {
    describe('when user token provided', () => {
        test('and avatar is empty then component rendered with ExitToAppIcon', () => {
            const onLogout = jest.fn();
            const user = {
                token: 'test token',
            };
            const { container } = render(<UserIcon user={user} onLogout={onLogout} />, { initialState: { user } });
            expect(container.querySelectorAll('button').length).toBe(1);
        });
    });
});
