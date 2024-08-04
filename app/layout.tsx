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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <NavBar />
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
