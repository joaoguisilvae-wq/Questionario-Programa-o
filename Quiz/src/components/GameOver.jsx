import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import WellDone from "../img/WellDone.svg";

import "./GameOver.css";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div id="gameover">
      <h2>Fim de jogo!</h2>
      <p>Pontuação: {quizState.score}</p>
      <p>
        vc acertou {quizState.score} de {quizState.questions.length}
      </p>
      <img src={WellDone} alt="Fim de quiz" />
      <button
        onClick={() => {
          dispatch({ type: "NEW_GAME" });
        }}
      >
        Reiniciar
      </button>
    </div>
  );
};

export default GameOver;
