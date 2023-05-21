import Layout from "../../components/Layout/Layout";
import { InfinitySpin } from "react-loader-spinner";
import "./LoadScreen.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function LoadScreen() {
  return (
    <div className="container container-load-screen">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
}

export default LoadScreen;
