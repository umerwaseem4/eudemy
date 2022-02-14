import TopNav from "../components/TopNav";
import "../node_modules/antd/dist/antd.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
