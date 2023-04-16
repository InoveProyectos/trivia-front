import React, { useContext } from "react";
import { createContext, useState } from "react";
import { intAnswer, intTrivia, intUser } from "../interfaces";

type AppContextData = {
  trivia: intTrivia;
  setTrivia: React.Dispatch<React.SetStateAction<intTrivia>>;
  user: intUser;
  setUser: React.Dispatch<React.SetStateAction<intUser>>;
  answers: intAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<intAnswer[]>>;
  hasLink?: boolean;
  setHasLink: React.Dispatch<React.SetStateAction<boolean>>;
  idChallengeActual: number;
  setIdChallengeActual: React.Dispatch<React.SetStateAction<number>>;
  countUsersConected: number;
  setCountUsersConected: React.Dispatch<React.SetStateAction<number>>;
};

export const AppContext = createContext<AppContextData>({} as AppContextData);

export const useTriviaContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useMyContext debe usarse dentro de un MyContext.Provider");
  }
  return context;
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [trivia, setTrivia] = useState<intTrivia>({
    id: null,
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
  const [answers, setAnswers] = useState<Array<intAnswer>>([] ?? []);
  const [hasLink, setHasLink] = useState<boolean>(false);
  const [idChallengeActual, setIdChallengeActual] = useState<number>(0);
  const [countUsersConected, setCountUsersConected] = useState<number>(0);

  const values: AppContextData = {
    trivia,
    setTrivia: setTrivia,
    user,
    setUser: setUser,
    answers,
    setAnswers: setAnswers,
    hasLink,
    setHasLink,
    idChallengeActual,
    setIdChallengeActual,
    countUsersConected,
    setCountUsersConected,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
