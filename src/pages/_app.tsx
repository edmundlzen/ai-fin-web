import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>AI Financial Planner</title>
        <meta name="description" content="AI Financial Planner" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Trocchi&display=swap&apos;)
        </style>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
