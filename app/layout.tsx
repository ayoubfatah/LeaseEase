import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

export const metadata = {
  title: "LeaseEase",
  description:
    "LeaseEase is a modern property rental platform that simplifies the rental process for both property owners and potential tenants. Explore, manage, and list rental properties with ease.",
};
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
