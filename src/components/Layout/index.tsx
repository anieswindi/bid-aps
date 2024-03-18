import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("bid-app-user")) {
    } else {
      router.push("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default Layout;
