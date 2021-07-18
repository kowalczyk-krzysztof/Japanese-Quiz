import '@testing-library/jest-dom/extend-expect';
import { createTestStore } from '../../app/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PointsContainer } from './pointsContainer';
import { SET_GAME_STARTED } from '../../features/game/gameSlice';

let store = createTestStore();

beforeEach(() => {
  store = createTestStore();
});

describe('testing points container', () => {
  test('points container rendering properly', () => {
    let state = store.getState().game;
    store.dispatch(SET_GAME_STARTED(true));
    state = store.getState().game;
    expect(state.isGameStarted).toEqual(true);
    expect(state.points).toEqual(0);
    expect(state.points_gained).toEqual(0);

    const { queryByTestId } = render(
      <Provider store={store}>
        <PointsContainer />
      </Provider>
    );
    expect(queryByTestId('pointscontainer')).toBeInTheDocument();
  });
});
