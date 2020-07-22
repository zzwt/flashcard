import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Layout } from "Context";
import Spinner from "./Components/@vuexy/spinner/Fallback-spinner";
import "./index.scss";

ReactDOM.render(
  // <React.StrictMode>
  <Suspense fallback={<Spinner />}>
    <Layout>
      <App />
    </Layout>
  </Suspense>,
  // </React.StrictMode>,
  document.getElementById("root")
);
