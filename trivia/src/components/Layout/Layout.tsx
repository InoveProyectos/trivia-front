import Header from "../Header/Header";
import "./Layout.scss";
import LoadScreen from "../../views/LoadScreen/LoadScreen";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import ErrorScreen from "../../views/ErrorScreen/ErrorScreen";
import { PageRealoadDetector } from "../PageReloadDetector/PageReloadDetector";

interface intLayout {
  children?: React.ReactNode;
  className?: string;
}

function Layout({ children, className }: intLayout) {
  const { loaderScreen, errorScreen } = useContext(AppContext);

  if (loaderScreen) return <LoadScreen />;
  if (errorScreen) return <ErrorScreen />;
  return (
    <>
      <Header />
      <PageRealoadDetector />
      <div className={"contenedorPP" + " " + className}>{children}</div>
    </>
  );
}

export default Layout;
