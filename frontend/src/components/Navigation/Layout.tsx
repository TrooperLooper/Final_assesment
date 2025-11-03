import NavigationBar from "./NavigationBar";
import Header from "./Header";

const Layout = ({ children }) => (
  <div className="flex min-h-screen">
    <NavigationBar />
    <div className="flex-1 flex flex-col">
      <div className="ml-10 sm:ml-20">
        {" "}
        {/* Sidebar width is w-20 */}
        <Header />
      </div>
      <main className="flex-1 px-4">{children}</main>
    </div>
  </div>
);
export default Layout;
