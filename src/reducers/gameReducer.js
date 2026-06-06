export const GAME_CONFIG = {
  min: 1,
  max: 10,
  maxGuesses: 3,
};

export const initialState = {
  winningNumber: null,
  guess: '',
  guessesLeft: GAME_CONFIG.maxGuesses,
  status: 'playing', // playing | won | lost
  message: '',
  messageType: '', // success | error
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_GUESS':
      return {
        ...state,
        guess: action.payload,
      };

    case 'INVALID_GUESS':
      return {
        ...state,
        message: `Please enter a number between ${GAME_CONFIG.min} and ${GAME_CONFIG.max}`,
        messageType: 'error',
      };

    case 'WIN':
      return {
        ...state,
        guess: '',
        status: 'won',
        message: `${state.winningNumber} is correct, YOU WIN!`,
        messageType: 'success',
      };

    case 'WRONG_GUESS':
      return {
        ...state,
        guess: '',
        guessesLeft: state.guessesLeft - 1,
        message: `${action.payload} is not correct. ${
          state.guessesLeft - 1
        } guesses left.`,
        messageType: 'error',
      };

    case 'LOSE':
      return {
        ...state,
        guess: '',
        status: 'lost',
        message: `Game Over. The correct number was ${state.winningNumber}.`,
        messageType: 'error',
      };

    case 'RESET':
      return {
        ...initialState,
        winningNumber: action.payload,
      };

    default:
      return state;
  }
}