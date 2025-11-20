import { ReactNode } from "react";
import NavigationBar from "./NavigationBar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen">
    <NavigationBar />
    <div className="flex-1 flex flex-col">
      <div className="ml-10 sm:ml-20">
        <Header />
      </div>
      <main className="flex-1 px-4 ml-0 sm:ml-20">{children}</main>
    </div>
  </div>
);

export default Layout;
