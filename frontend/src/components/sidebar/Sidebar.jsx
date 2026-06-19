import { NavLink } from "react-router-dom";
import { navigationItems } from "../../utils/navigation";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div>
        <h3 className="sidebar-logo">
          Attention Needed
        </h3>

        <nav>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="sidebar-link"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        className="btn btn-outline-danger w-100"
        onClick={logout}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;