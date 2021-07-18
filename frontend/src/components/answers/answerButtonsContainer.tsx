import React, { FC } from 'react';
// Redux
import { useSelector } from 'react-redux';
import { gameSelector, Game } from '../../features/game/gameSlice';
import { wordsSelector, WordObject } from '../../features/words/wordsSlice';
// Components
import { AnswerButton } from './AnswerButton';
// Styling
import { StyledAnswerButtonsContainer } from './answers-styling';

export const AnswerButtonsContainer: FC = (): JSX.Element | null => {
  const game: Game = useSelector(gameSelector);
  const word: WordObject = useSelector(wordsSelector);
  if (
    game.is_question_answered === false &&
    game.isGameStarted === true &&
    word.wordLoading === false
  )
    return (
      <StyledAnswerButtonsContainer data-testid={'answerbuttons'}>
        <AnswerButton isTrue={true} />
        <AnswerButton isTrue={false} />
      </StyledAnswerButtonsContainer>
    );
  else return null;
};

export default AnswerButtonsContainer;
