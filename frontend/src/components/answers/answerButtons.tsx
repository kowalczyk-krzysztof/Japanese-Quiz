import React, { FC } from 'react';
// Redux
import { useSelector } from 'react-redux';
import { gameSelector, Game } from '../../features/game/gameSlice';
import { wordsSelector, WordObject } from '../../features/words/wordsSlice';
// Components
import { AnswerTrueButton } from './answerTrueButton';
import { AnswerFalseButton } from './answerFalseButton';

export const AnswerButtons: FC = (): JSX.Element | null => {
  const game: Game = useSelector(gameSelector);
  const word: WordObject = useSelector(wordsSelector);
  if (
    game.is_question_answered === false &&
    game.isGameStarted === true &&
    word.wordLoading === false
  )
    return (
      <div
        style={{
          gridArea: 'buttons',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AnswerTrueButton />
        <AnswerFalseButton />
      </div>
    );
  else return null;
};

export default AnswerButtons;
