import Header from "../Header/Header";
import SpacialHeader from "../Header/SpecialHeader";
import "./Layout.scss";

interface intLayout {
  children?: React.ReactNode;
}

function SpecialLayout({ children }: intLayout) {
  return (
    <>
      <SpacialHeader />
      <div className="contenedorPP contenedorPPSpecial">{children}</div>
    </>
  );
}

export default SpecialLayout;
