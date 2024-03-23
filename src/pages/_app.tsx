import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import "~/styles/globals.css";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import client from "~/apolloClient";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    // Logic to retrieve the JWT token from local storage or any other source
    const token = localStorage.getItem("access_token");
    // Logic to decode the JWT token and extract the user ID
    const decodedToken = token ? jwtDecode(token) : {};
    const { sub, exp } = decodedToken;

    console.log(sub, exp);
    if (!token || (exp ?? 0) > Date.now()) {
      localStorage.removeItem("access_token");

      // Redirect the user to the login page
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.href = "/login";
      }
    }
  }, []);

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
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
