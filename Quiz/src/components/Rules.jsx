import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./Rules.css";

const Rules = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div id="rules">
      <div id="table">
        {!quizState.agreeRules ? (
          <>
            <h2>As regras são as seguintes:</h2>
            <p>Uma resposta por questão</p>
            <p>Uma ajuda por questão</p>
            <p>As questões variam de 3 a 5 pontos</p>
            <p>As ajudas reduzem a pontuação da questão em 2</p>
            <p>Todas questões devem ser respondidas</p>
            <button onClick={() => dispatch({ type: "AGREE_RULES" })}>
              Eu concordo com as regras
            </button>
          </>
        ) : (
          <>
            <h3>Bom jogo!</h3>
            <p>Para iniciar clique no botão abaixo</p>
          </>
        )}
      </div>
      {quizState.agreeRules && (
        <button onClick={() => dispatch({ type: "CHOSE_CATEGORY" })}>
          Iniciar
        </button>
      )}
    </div>
  );
};

export default Rules;
