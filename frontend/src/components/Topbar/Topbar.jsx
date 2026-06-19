import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="topbar">
      <div>
        Welcome, {user?.email}
      </div>
    </header>
  );
};

export default Topbar;