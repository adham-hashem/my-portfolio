import React from "react";
import { Outlet } from "react-router-dom";
import { CompilationProvider } from "../../features/context/CompilationContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App: React.FC = () => {
  return (
    <CompilationProvider>
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </CompilationProvider>
  );
};

export default App;
