import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Title from './Title';

describe('Title', () => {
    describe('when data provided', () => {
        test('then component rendered wrapped in h2', () => {
            const { container } = render(
                <Title>
                    <span className="test">Test message</span>
                </Title>,
            );

            expect(container.querySelector('h2>span.test').textContent).toEqual('Test message');
        });
    });
});
