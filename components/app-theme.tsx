import * as React from "react";

import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

export default function AppTheme({ children }: any) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
