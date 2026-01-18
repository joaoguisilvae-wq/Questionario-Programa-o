import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./Option.css";

const Option = ({ option, onSelectOption, ansewer }) => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="option" onClick={() => onSelectOption({})}>
      <p>{option}</p>
    </div>
  );
};

export default Option;
