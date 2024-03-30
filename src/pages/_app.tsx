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
import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";
import useSidebarStore from "~/stores/sidebarStore";
import useAuth from "~/hooks/useAuth";
import { AccountType } from "~/gql/graphql";

const MyApp: AppType = ({ Component, pageProps }) => {
  const sidebarIsOpen = useSidebarStore((state) => state.isOpen);
  const closeSidebar = useSidebarStore((state) => state.close);
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const { logout } = useAuth();

  useEffect(() => {
    // Logic to retrieve the JWT token from local storage or any other source
    const token = localStorage.getItem("access_token");
    // Logic to decode the JWT token and extract the user ID
    const decodedToken = token
      ? jwtDecode<{ sub: string; exp: number; type: AccountType }>(token)
      : null;
    if (
      !decodedToken &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
      return;
    } else if (!decodedToken) {
      return;
    }
    const { sub, exp, type } = decodedToken;

    if ((exp ?? 0) > Date.now()) {
      localStorage.removeItem("access_token");

      // Redirect the user to the login page
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.href = "/login";
      }
    }

    if (window.location.pathname === "/admin") {
      if (type !== AccountType.Admin) {
        window.location.href = "/";
      }
    } else {
      if (type === AccountType.Admin) {
        window.location.href = "/admin";
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      toggleSidebar();
    }, 0.1);
    setTimeout(() => {
      closeSidebar();
    }, 0.5);
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
        <Sidebar
          toggled={sidebarIsOpen}
          breakPoint="all"
          onBackdropClick={closeSidebar}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#f9fafc",
            },
            fontFamily: "Trocchi, serif",
          }}
        >
          <Menu
            className="h-full"
            rootStyles={{
              ["ul"]: {
                display: "flex",
                flexDirection: "column",
                height: "100%",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                window.location.href = "/";
              }}
            >
              {" "}
              Dashboard{" "}
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/financial-goals";
              }}
            >
              {" "}
              Goals{" "}
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/ai-strategy";
              }}
            >
              {" "}
              AI Strategy{" "}
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/gamification";
              }}
            >
              {" "}
              Rewards{" "}
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = "/market";
              }}
            >
              {" "}
              Market{" "}
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
              }}
              className="mt-auto"
            >
              {" "}
              Logout{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
