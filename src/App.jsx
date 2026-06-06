import { useReducer } from "react";
import "./App.css";

import { gameReducer, initialState, GAME_CONFIG } from "./reducers/gameReducer";

const { min, max } = GAME_CONFIG;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGameState() {
  return {
    ...initialState,
    winningNumber: getRandomNumber(min, max),
  };
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createGameState);

  const { guess, winningNumber, guessesLeft, status, message, messageType } =
    state;

  const isGameOver = status !== "playing";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isGameOver) {
      dispatch({
        type: "RESET",
        payload: getRandomNumber(min, max),
      });

      return;
    }

    const currentGuess = Number(guess);

    if (guess.trim() === "" || currentGuess < min || currentGuess > max) {
      dispatch({
        type: "INVALID_GUESS",
      });

      return;
    }

    if (currentGuess === winningNumber) {
      dispatch({
        type: "WIN",
      });

      return;
    }

    if (guessesLeft === 1) {
      dispatch({
        type: "LOSE",
      });

      return;
    }

    dispatch({
      type: "WRONG_GUESS",
      payload: currentGuess,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Number Guesser</h1>

        <p className="description">
          Guess a number between <strong>{min}</strong> and{" "}
          <strong>{max}</strong>
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="number"
            readOnly={isGameOver}
            value={guess}
            placeholder="Enter your guess..."
            onChange={(e) =>
              dispatch({
                type: "SET_GUESS",
                payload: e.target.value,
              })
            }
            className={messageType === "error" ? "input-error" : ""}
          />

          <button type="submit">{isGameOver ? "Play Again" : "Submit"}</button>
        </form>

        {message && <p className={`message ${messageType}`}>{message}</p>}

        {!isGameOver && (
          <p className="attempts">
            Attempts Left:
            <span>{guessesLeft}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
