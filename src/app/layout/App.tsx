import React from "react";
import { Outlet } from "react-router-dom";
import { CompilationProvider } from "../../features/context/CompilationContext";

const App: React.FC = () => {
  return (
    <CompilationProvider>
      <Outlet />
    </CompilationProvider>
  );
};

export default App;
