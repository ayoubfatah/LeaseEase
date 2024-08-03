import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NavBar />
          </ThemeProvider>
        </AppRouterCacheProvider>
        <main>{children}</main>
      </body>
    </html>
  );
}
