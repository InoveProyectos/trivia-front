import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import "./Layout.scss";
import { useAppContext } from "../../Contexts/AppContext";
import LoadScreen from "../../views/LoadScreen/LoadScreen";
import { useEffect } from "react";

interface intLayout {
  children?: React.ReactNode;
}

function Layout({ children }: intLayout) {
  return (
    <>
      <Header />
      <div className="contenedorPP">{children}</div>
    </>
  );
}

export default Layout;
