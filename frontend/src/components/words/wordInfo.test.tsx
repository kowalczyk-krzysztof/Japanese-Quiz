import '@testing-library/jest-dom/extend-expect';
import { createTestStore } from '../../app/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { WordInfo } from './WordInfo';
import {
  SET_GAME_STARTED,
  SET_IS_GAME_OVER,
  SET_QUESTION_ANSWERED,
} from '../../features/game/gameSlice';
import { SET_NEW_WORD, WordProps } from '../../features/words/wordsSlice';

let store = createTestStore();

beforeEach(() => {
  store = createTestStore();
});

describe('testing word info container', () => {
  const realWord: WordProps = {
    word: '勝負',
    wordExists: true,
    reading: 'しょうぶ',
    definitions: ['victory or defeat'],
  };
  test('word info container rendering properly when the word has not been answered', () => {
    let state = store.getState();
    store.dispatch(SET_GAME_STARTED(true));
    store.dispatch(SET_NEW_WORD(realWord));
    state = store.getState();
    expect(state.game.isGameStarted).toEqual(true);
    expect(state.words.word).toEqual(realWord);
    expect(state.game.is_question_answered).toEqual(false);

    render(
      <Provider store={store}>
        <WordInfo />
      </Provider>
    );
    const definitions: HTMLElement | null = screen.queryByTestId('definitions');
    const word: HTMLElement = screen.getByText('勝負', {
      exact: true,
    });

    expect(word).toBeInTheDocument();
    expect(definitions).toEqual(null);
  });
  test('word info container rendering properly when the word has been answered', () => {
    let state = store.getState();
    store.dispatch(SET_GAME_STARTED(true));
    store.dispatch(SET_NEW_WORD(realWord));
    store.dispatch(SET_QUESTION_ANSWERED(true));
    state = store.getState();
    expect(state.game.isGameStarted).toEqual(true);
    expect(state.words.word).toEqual(realWord);
    expect(state.game.is_question_answered).toEqual(true);

    render(
      <Provider store={store}>
        <WordInfo />
      </Provider>
    );
    const definitions: HTMLElement = screen.getByText('victory or defeat', {
      exact: true,
    });
    const word: HTMLElement = screen.getByText('勝負', {
      exact: true,
    });

    expect(word).toBeInTheDocument();
    expect(definitions).toBeInTheDocument();
  });
  test('word info container rendering game over screen when the game is over', () => {
    let state = store.getState();
    store.dispatch(SET_GAME_STARTED(true));
    store.dispatch(SET_NEW_WORD(realWord));
    store.dispatch(SET_IS_GAME_OVER(true));
    state = store.getState();
    expect(state.game.isGameStarted).toEqual(true);
    expect(state.words.word).toEqual(realWord);
    expect(state.game.isGameOver).toEqual(true);

    render(
      <Provider store={store}>
        <WordInfo />
      </Provider>
    );
    const definitions: HTMLElement = screen.getByText('victory or defeat', {
      exact: true,
    });
    const word: HTMLElement = screen.getByText('勝負', {
      exact: true,
    });

    const gameOver: HTMLElement = screen.getByText('FINAL SCORE', {
      exact: true,
    });

    expect(word).toBeInTheDocument();
    expect(definitions).toBeInTheDocument();
    expect(gameOver).toBeInTheDocument();
  });
});
