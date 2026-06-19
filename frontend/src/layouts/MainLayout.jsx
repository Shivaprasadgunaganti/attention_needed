import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;