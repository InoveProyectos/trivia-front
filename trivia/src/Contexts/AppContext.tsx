import React, { useContext } from "react";
import { createContext, useState } from "react";

type AppContextData = {
  isModerate?: boolean;
  hasLink?: boolean;
  setIsModerate: React.Dispatch<React.SetStateAction<boolean>>;
  setHasLink: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextData | null>(null);

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
  const [isModerate, setIsModerate] = useState(false);
  const [hasLink, setHasLink] = useState(false);

  const values: AppContextData = {
    isModerate,
    setIsModerate,
    hasLink,
    setHasLink,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
