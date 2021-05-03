import commonReducer from './commonReducer';

describe('common reducer', () => {
    test('when ERROR action triggered then error populated', () => {
        const action = { type: 'ERROR', payload: 'test error' };
        const nextState = commonReducer({}, action);

        expect(nextState).toEqual({ error: 'test error' });
    });

    test('when SET_REVIEW action triggered then review populated', () => {
        const action = { type: 'SET_REVIEW', payload: 'test review message' };
        const nextState = commonReducer({}, action);

        expect(nextState).toEqual({ review: 'test review message' });
    });

    test('when SET_LOADER_REVIEW action triggered then review populated', () => {
        const action = { type: 'SET_LOADER_REVIEW', payload: true };
        const nextState = commonReducer({}, action);

        expect(nextState.loader).toBeTruthy();
    });

    test('when state is empty then default state is used', () => {
        const action = { type: 'SET_LOADER_REVIEW', payload: true };
        const nextState = commonReducer(undefined, action);

        expect(nextState).toEqual({
            error: null,
            review: [],
            loader: true,
        });
    });
});
