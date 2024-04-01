import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import "~/styles/globals.css";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import client from "~/apolloClient";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useSidebarStore from "~/stores/sidebarStore";
import useAuth from "~/hooks/useAuth";
import { AccountType } from "~/gql/graphql";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { Drawer } from "@mui/material";
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  const sidebarIsOpen = useSidebarStore((state) => state.isOpen);
  const closeSidebar = useSidebarStore((state) => state.close);
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const [userType, setUserType] = useState<AccountType>(AccountType.User);
  const { logout } = useAuth();
  const router = useRouter();

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

    if (type) {
      setUserType(type);
    }

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

  return (
    <AppCacheProvider {...pageProps}>
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
        <Drawer open={sidebarIsOpen} onClose={closeSidebar}>
          {userType === AccountType.Admin ? (
            <div className="flex h-full w-48 flex-col items-center justify-start p-2">
              <NavButton
                onClick={() => {
                  void router.push("/admin");
                  closeSidebar();
                }}
                text="Admin Dashboard"
              />
              <NavButton
                onClick={() => {
                  logout();
                  closeSidebar();
                }}
                text="Logout"
                className="mt-auto"
              />
            </div>
          ) : (
            <div className="flex h-full w-48 flex-col items-center justify-start p-2">
              <NavButton
                onClick={() => {
                  void router.push("/");
                  closeSidebar();
                }}
                text="Dashboard"
              />
              <NavButton
                onClick={() => {
                  void router.push("/financial-goals");
                  closeSidebar();
                }}
                text="Goals"
              />
              <NavButton
                onClick={() => {
                  void router.push("/ai-strategy");
                  closeSidebar();
                }}
                text="AI Strategy"
              />
              <NavButton
                onClick={() => {
                  void router.push("/gamification");
                  closeSidebar();
                }}
                text="Rewards"
              />
              <NavButton
                onClick={() => {
                  void router.push("/market");
                  closeSidebar();
                }}
                text="Market"
              />
              <NavButton
                onClick={() => {
                  logout();
                  closeSidebar();
                }}
                text="Logout"
                className="mt-auto"
              />
            </div>
          )}
        </Drawer>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </AppCacheProvider>
  );
};

const NavButton = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={"btn btn-ghost w-full !text-black" + " " + className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyApp;
