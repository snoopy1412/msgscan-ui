"use client";

import * as React from "react";
import AppQueryClientProvider from "./AppQueryClientProvider";
import AppThemeProvider from "./AppThemeProvider";

const AppProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <AppQueryClientProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </AppQueryClientProvider>
  );
};

export default AppProvider;
