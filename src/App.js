import React from "react";
import { SnackbarProvider } from "notistack";
import RoutesContainer from "./containers/routes";

export default function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      hideIconVariant
      preventDuplicate
    >
      <RoutesContainer />
    </SnackbarProvider>
  );
}
