import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";
import "photoswipe/dist/photoswipe.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "@/assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { LeaseProvider } from "./customHooks/LeastContextApi";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryProvider from "./ReactQueryProvider";

const queryClient = new QueryClient();
export const metadata = {
  title: "Leaseease",
  description: "Leaseease",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <LeaseProvider>
        <AuthProvider>
          <html lang="en">
            <body>
              <NavBar />
              <main>{children}</main>
              <ToastContainer />
              <Footer />
            </body>
          </html>
        </AuthProvider>
      </LeaseProvider>
    </ReactQueryProvider>
  );
}
