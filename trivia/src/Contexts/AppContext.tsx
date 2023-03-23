import React, { useContext } from "react";
import { createContext, useState } from "react";
import { intTrivia } from "../interfaces";

type AppContextData = {
  trivia: intTrivia;
  setTrivia: React.Dispatch<React.SetStateAction<intTrivia>>;
  hasLink?: boolean;
  setHasLink: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextData>({} as AppContextData);

export const useMyAppContext = () => {
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
  const [hasLink, setHasLink] = useState<boolean>(false);

  const values: AppContextData = {
    trivia,
    setTrivia: setTrivia,
    hasLink,
    setHasLink,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
