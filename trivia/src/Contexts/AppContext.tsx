import React, { useContext, createContext, useState, Children } from "react";

type AppContextData = {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextData>({} as AppContextData);

export const useAppContext = () => {
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
  const [loader, setLoader] = useState<boolean>(true);

  const values: AppContextData = {
    loader,
    setLoader,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
