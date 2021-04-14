import React from 'react';
import { render } from '../../../__tests__/test.utils';
import '@testing-library/jest-dom';

import Footer from './index';

describe('Footer', () => {
    test('then link to RSS cource is presented', () => {
        const { container } = render(<Footer />);

        expect(container.querySelectorAll('a')[0].getAttribute('href')).toEqual('https://rs.school/react/');
    });

    test('then links team members rendered', () => {
        const { container } = render(<Footer />);

        expect(container.querySelectorAll('a')[1].getAttribute('href')).toEqual('https://github.com/spaceragga');
        expect(container.querySelectorAll('a')[2].getAttribute('href')).toEqual('https://github.com/aleksei-bulgak-study');
        expect(container.querySelectorAll('a')[3].getAttribute('href')).toEqual('https://github.com/Kvadeck');
        expect(container.querySelectorAll('a')[4].getAttribute('href')).toEqual('https://github.com/natein');
        expect(container.querySelectorAll('a')[5].getAttribute('href')).toEqual('https://github.com/kvalexandr');
    });
});
