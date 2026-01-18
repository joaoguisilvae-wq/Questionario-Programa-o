import { createContext, useReducer } from "react";
import questions from "../data/questions_complete";
import Question from "../components/Question";

const STAGES = ["Start", "Rules", "Category", "Playing", "End"];

const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  agreeRules: false,
  score: 0,
  hits: 0,
  answerSelected: false,
  help: false,
  optionToHide: false,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_STAGE":
      return {
        ...state,
        gameStage: STAGES[1],
      };

    case "AGREE_RULES":
      return {
        ...state,
        agreeRules: true,
      };

    case "CHOSE_CATEGORY":
      return {
        ...state,
        gameStage: STAGES[2],
      };

    case "START_GAME":
      let quizQuestions = null;

      state.questions.forEach((question) => {
        if (question.category === action.payload) {
          quizQuestions = question.questions;
        }
      });
      return {
        ...state,
        questions: quizQuestions,
        gameStage: STAGES[3],
      };

    case "REORDER_QUESTIONS":
      const reorderedQuestions = state.questions.sort(() => {
        return Math.random() - 0.5;
      });

      return {
        ...state,
        questions: reorderedQuestions,
      };

    case "CHANGE_QUESTION":
      const nextQuestion = state.currentQuestion + 1;

      let endGame = false;

      if (!state.questions[nextQuestion]) {
        endGame = true;
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[4] : state.gameStage,
        answerSelected: false,
        help: false,
      };

    case "NEW_GAME":
      return { ...initialState, gameStage: STAGES[2] };

    case "CHECK_ANSWER":
      if (state.answerSelected) return state;

      const answer = action.payload.answer;
      const option = action.payload.option;
      console.log(answer, option);
      let correctAnswer = 0;
      const currentQuestionData = state.questions[state.currentQuestion];
      let hits = 0;

      if (answer === option)
        ((hits = 1), (correctAnswer = currentQuestionData.value));

      return {
        ...state,
        score: state.score + correctAnswer,
        hits: state.hits + hits,
        answerSelected: option,
      };
    case "SHOW_TIP":
      return {
        ...state,
        help: "tip",
      };

    case "REMOVE_OPTION":
      const questionWithoutOption = state.questions[state.currentQuestion];

      let repeat = true;
      let optionToHide;

      questionWithoutOption.options.forEach((option) => {
        if (option !== questionWithoutOption.answer && repeat) {
          optionToHide = option;
          repeat = false;
        }
      });

      return {
        ...state,
        optionToHide,
        help: true,
      };

    default:
      return state;
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
