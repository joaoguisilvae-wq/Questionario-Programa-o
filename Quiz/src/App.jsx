import "./App.css";

import { useContext } from "react";
import { QuizContext } from "./context/quiz";

import Welcome from "./components/Welcome";
import Rules from "./components/Rules";
import PickCategory from "./components/PickCategory";
import Question from "./components/Question";
import GameOver from "./components/GameOver";

function App() {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="app">
      <h1>Quiz de programação</h1>
      {quizState.gameStage === "Start" && <Welcome />}
      {quizState.gameStage === "Rules" && <Rules />}
      {quizState.gameStage === "Category" && <PickCategory />}
      {quizState.gameStage === "Playing" && <Question />}
      {quizState.gameStage === "End" && <GameOver />}
    </div>
  );
}

export default App;
