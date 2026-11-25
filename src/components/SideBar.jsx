
import { NavLink } from "react-router-dom";

function SideBar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-dashboard-3-fill"
    },
    {
      name: "Customers",
      path: "/customer",
      icon: "ri-group-fill"
    },
    {
      name: "Billing",
      path: "/bills",
      icon: "ri-bill-fill"
    }
  ];

  return (
    <aside className="
      w-full md:w-64
      md:min-h-screen
      bg-white
      border-b md:border-b-0 md:border-r
      border-gray-200
      flex flex-col
      justify-between
      p-3 sm:p-4 md:p-5
      shrink-0
    ">

      <div>

        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-5 md:mb-12">

          <div className="w-10 h-10 md:w-11 md:h-11 bg-black rounded-xl flex items-center justify-center text-white shrink-0">
            <i className="ri-scissors-cut-fill text-2xl"></i>
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-black">
              Darshan
            </h1>

            <p className="text-xs text-gray-500">
              Tailor Management
            </p>
          </div>

        </div>

        {/* Menu Heading */}
        <p className="hidden md:block text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">
          Main Menu
        </p>

        {/* Navigation */}
        <nav className="
          flex flex-row md:flex-col
          gap-2
          overflow-x-auto
          md:overflow-visible
        ">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 md:gap-4
                px-3 md:px-4 py-2.5 md:py-3
                rounded-lg md:rounded-xl
                font-semibold text-sm md:text-base
                whitespace-nowrap
                transition-all duration-200
                ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              <i className={`${item.icon} text-lg md:text-xl`}></i>
              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>

      </div>

      {/* Bottom Profile */}
      <div className="hidden md:block border-t border-gray-200 pt-5 mt-6">

        <div className="flex items-center gap-3 p-2">

          <div className="
            w-11 h-11 rounded-full
            bg-gray-100
            flex items-center justify-center
            text-black font-bold
          ">
            D
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-black">
              Darshan
            </h2>

            <p className="text-xs text-gray-500">
              Shop Owner
            </p>
          </div>

          <NavLink
            to="/login"
            title="Logout"
            className="
              text-gray-600
              hover:text-black
              hover:bg-gray-100
              p-2 rounded-lg
              transition
            "
          >
            <i className="ri-logout-box-r-line text-xl"></i>
          </NavLink>

        </div>

      </div>

    </aside>
  );
}

export default SideBar;
