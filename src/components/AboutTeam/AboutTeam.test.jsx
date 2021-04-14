import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutTeam from './AboutTeam';

describe('AboutTeam', () => {
    describe('when team array provided', () => {
        test('then each team member is rendered', () => {
            const devMember = {
                name: 'developer name',
                github: 'githubNickName',
                photo: 'testPhoto',
                role: 'Разработчик',
                tasks: ['Игра «Саванна»', 'Общие компоненты для игр', 'Страница «404»'],
            };

            const { container } = render(<AboutTeam team={[devMember]} />);

            const developerComponents = container.getElementsByClassName('developer');
            expect(developerComponents.length).toBe(1);
            expect(developerComponents[0].getElementsByTagName('h3')[0].textContent).toEqual(devMember.name);
            expect(developerComponents[0].getElementsByTagName('a')[0].textContent).toEqual(devMember.github);
            expect(developerComponents[0].getElementsByTagName('p')[0].textContent).toEqual(devMember.role);
            expect(developerComponents[0].querySelectorAll('ul>li span').length).toEqual(3);
        });

        test('and array is empty then no developer components rendered', () => {
            const { container } = render(<AboutTeam team={[]} />);

            const developerComponents = container.getElementsByClassName('developer');
            expect(developerComponents.length).toBe(0);
        });
    });
});
