import React, { FC } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_USER_ANSWER,
  SET_POINTS,
  SET_REMOVE_LIFE,
  SET_QUESTION_ANSWERED,
  gameSelector,
  Game,
} from '../../features/game/gameSlice';
import { wordsSelector, WordObject } from '../../features/words/wordsSlice';
// Styling
import { StyledTrueButton } from './answers-styling';

export const AnswerTrueButton: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const word: WordObject = useSelector(wordsSelector);
  const game: Game = useSelector(gameSelector);
  const clickHandler = (): void => {
    dispatch(SET_USER_ANSWER(true));
    dispatch(SET_QUESTION_ANSWERED());
    if (word.word.wordExists === true) dispatch(SET_POINTS(5 * game.time_left));
    else dispatch(SET_REMOVE_LIFE());
  };
  return <StyledTrueButton onClick={clickHandler}>Real Word</StyledTrueButton>;
};

export default AnswerTrueButton;