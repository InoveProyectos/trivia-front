import React, { useContext, createContext, useState } from "react";
import { intAnswer, intTrivia, intUser } from "../interfaces";

type TriviaContextData = {
  trivia: intTrivia;
  setTrivia: React.Dispatch<React.SetStateAction<intTrivia>>;
  user: intUser;
  setUser: React.Dispatch<React.SetStateAction<intUser>>;
  answers: intAnswer;
  setAnswers: React.Dispatch<React.SetStateAction<intAnswer>>;
  hasLink?: boolean;
  setHasLink: React.Dispatch<React.SetStateAction<boolean>>;
  idChallengeActual: number;
  setIdChallengeActual: React.Dispatch<React.SetStateAction<number>>;
  countUsersConected: number;
  setCountUsersConected: React.Dispatch<React.SetStateAction<number>>;
  correctAnswer?: number;
  setCorrectAnswer: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const TriviaContext = createContext<TriviaContextData>(
  {} as TriviaContextData
);

export const useTriviaContext = () => {
  const context = useContext(TriviaContext);
  if (!context) {
    throw new Error("useMyContext debe usarse dentro de un MyContext.Provider");
  }
  return context;
};

export const TriviaContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [trivia, setTrivia] = useState<intTrivia>({
    id: undefined,
    name: "",
    description: "",
    moderated: null,
    end_date: "",
  });
  const [user, setUser] = useState<intUser>({
    username: "",
    name: "",
    is_staff: null,
    role: "",
    score: null,
    bonus: null,
  });
  const [answers, setAnswers] = useState<intAnswer>({
    name: "",
    description: "",
    options: [],
  });
  const [hasLink, setHasLink] = useState<boolean>(false);
  const [idChallengeActual, setIdChallengeActual] = useState<number>(0);
  const [countUsersConected, setCountUsersConected] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number | undefined>();

  const values: TriviaContextData = {
    trivia,
    setTrivia,
    user,
    setUser,
    answers,
    setAnswers,
    hasLink,
    setHasLink,
    idChallengeActual,
    setIdChallengeActual,
    countUsersConected,
    setCountUsersConected,
    correctAnswer,
    setCorrectAnswer,
  };
  return (
    <TriviaContext.Provider value={values}>{children}</TriviaContext.Provider>
  );
};
