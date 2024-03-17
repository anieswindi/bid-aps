import React from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import Head from "next/head";
import ModalLoader from "../components/Loader";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main>
      <Head>
        <title>Bid App</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ModalLoader />
    </main>
  );
};

export default App;
