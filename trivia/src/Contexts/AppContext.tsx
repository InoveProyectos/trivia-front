import React, { useContext, createContext, useState, Children } from "react";

type AppContextData = {
  loaderScreen: boolean;
  setLoaderScreen: React.Dispatch<React.SetStateAction<boolean>>;
  errorScreen: boolean;
  setErrorScreen: React.Dispatch<React.SetStateAction<boolean>>;
  errorMensaje: string;
  setErrorMensaje: React.Dispatch<React.SetStateAction<string>>;
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
  const [loaderScreen, setLoaderScreen] = useState<boolean>(true);
  const [errorScreen, setErrorScreen] = useState<boolean>(false);
  const [errorMensaje, setErrorMensaje] = useState<string>("");

  const values: AppContextData = {
    loaderScreen,
    setLoaderScreen,
    errorScreen,
    setErrorScreen,
    errorMensaje,
    setErrorMensaje,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
