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
  correctAnswer: number | undefined;
  setCorrectAnswer: React.Dispatch<React.SetStateAction<number | undefined>>;
  wonScore?: number;
  setWonScore: React.Dispatch<React.SetStateAction<number | undefined>>;
  blockAnswers: boolean;
  setBlockAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  estadoTrivia: number;
  setEstadoTrivia: React.Dispatch<React.SetStateAction<number>>;
  estadoPregunta: number;
  setEstadoPregunta: React.Dispatch<React.SetStateAction<number>>;
  moreQuestions: boolean;
  setMoreQuestions: React.Dispatch<React.SetStateAction<boolean>>;
  cantResUsers: number;
  setCantResUsers: React.Dispatch<React.SetStateAction<number>>;
  ansSelected: number | undefined;
  setAnsSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
  cantResCorrectas: number | undefined;
  setCantResCorrectas: React.Dispatch<React.SetStateAction<number | undefined>>;
  cantOpciones: string[];
  setCantOpciones: React.Dispatch<React.SetStateAction<string[]>>;
  cantResOpciones: number[];
  setCantResOpciones: React.Dispatch<React.SetStateAction<number[]>>;
  cantQuestions: number;
  setCantQuestions: React.Dispatch<React.SetStateAction<number>>;
  firstData: boolean;
  setFirstData: React.Dispatch<React.SetStateAction<boolean>>;
  nameRoom: string;
  setNameRoom: React.Dispatch<React.SetStateAction<string>>;
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
  const [wonScore, setWonScore] = useState<number | undefined>();
  const [blockAnswers, setBlockAnswers] = useState<boolean>(false);
  const [estadoPregunta, setEstadoPregunta] = useState<number>(0);
  const [estadoTrivia, setEstadoTrivia] = useState<number>(0);
  const [moreQuestions, setMoreQuestions] = useState<boolean>(false);
  const [cantResUsers, setCantResUsers] = useState<number>(0);
  const [ansSelected, setAnsSelected] = useState<number>();
  const [cantResCorrectas, setCantResCorrectas] = useState<number>();
  const [cantOpciones, setCantOpciones] = useState<string[]>([]);
  const [cantResOpciones, setCantResOpciones] = useState<number[]>([]);
  const [cantQuestions, setCantQuestions] = useState<number>(0);
  const [firstData,setFirstData] = useState<boolean>(false)
  const [nameRoom,setNameRoom] = useState<string>("")

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
    wonScore,
    setWonScore,
    blockAnswers,
    setBlockAnswers,
    estadoPregunta,
    setEstadoPregunta,
    estadoTrivia,
    setEstadoTrivia,
    moreQuestions,
    setMoreQuestions,
    cantResUsers,
    setCantResUsers,
    ansSelected,
    setAnsSelected,
    cantResCorrectas,
    setCantResCorrectas,
    cantOpciones,
    setCantOpciones,
    cantResOpciones,
    setCantResOpciones,
    cantQuestions,
    setCantQuestions,
    firstData,
    setFirstData,
    nameRoom,
    setNameRoom
  };
  return (
    <TriviaContext.Provider value={values}>{children}</TriviaContext.Provider>
  );
};
