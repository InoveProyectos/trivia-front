import { Watch } from "react-loader-spinner";
import Layout from "../../components/Layout/Layout";
import "./Wating.scss";
import useTextos from "../../hooks/useTextos";

function Wating() {
  const { searchTextByKey } = useTextos();
  return (
    <div className="cont-wating">
      {/* <Layout> */}
      <h2>{searchTextByKey("comp.wating.text")}</h2>
      <Watch
        height="60"
        width="60"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        visible={true}
      />
      {/* </Layout> */}
    </div>
  );
}

export default Wating;
