import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";

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
    <AuthProvider>
      <html lang="en">
        <body>
          <NavBar />

          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
