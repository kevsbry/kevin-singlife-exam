import React, { ReactNode } from "react";
import Header from "./Header";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-12  min-h-screen pt-4 bg-slate-100">
      <div className="col-span-10 col-start-2">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
