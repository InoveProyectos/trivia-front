import Header from "../Header/Header";
import "./Layout.scss";
import LoadScreen from "../../views/LoadScreen/LoadScreen";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import ErrorScreen from "../../views/ErrorScreen/ErrorScreen";

interface intLayout {
  children?: React.ReactNode;
}

function Layout({ children }: intLayout) {
  const { loaderScreen, errorScreen } = useContext(AppContext);

  const getSpecialScreen = () => {};

  if (loaderScreen) return <LoadScreen />;
  if (errorScreen) return <ErrorScreen />;
  return (
    <>
      <Header />
      <div className="contenedorPP">{children}</div>
    </>
  );
}

export default Layout;
