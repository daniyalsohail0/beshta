import React, { useEffect, useState } from "react";
import logo from "../assets/logo/webscript.png";
import user from "../assets/user.jpg";

import MenuItem from "./MenuItem";

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Clients",
    exact: true,
    to: `/clients`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Add Client Profile", to: "/client/add_profile" },
      { name: "Client Profile", to: "/client/client_profile" },
      { name: "Client Roster", to: "/client/client_roster" },
      { name: "Client Agreements", to: "/client/client_agreements" },
    ],
  },
  {
    name: "Employees",
    exact: true,
    to: `/employees`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Add Employee Profile", to: "/employee/add_profile" },
      { name: "Leaves Agreement", to: "/employee/leaves_agreement" },
      { name: "Employee Roster", to: "/employee/employee_roster" },
      { name: "Employee Agreements", to: "/employee/employee_agreements" },
    ],
  },
  {
    name: "Referrals",
    exact: true,
    to: "/referrals",
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Reporting",
    exact: true,
    to: `/clients`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Roster", to: "/reporting/roster" },
      { name: "Timesheet", to: "/reporting/timesheet" },
      { name: "Clients", to: "/reporting/clients" },
      { name: "Workers", to: "/reporting/workers" },
      { name: "Audit Reports", to: "reporting/audit_reports" },
      { name: "Dex Reports", to: "reporting/dex_reports" },
      { name: "Finances", to: "reporting/finances" },
      { name: "Form Reports", to: "reporting/form_reports"},
      { name: "Messages", to: "reporting/messages"},
    ],
  },
  {
    name: "Timesheet",
    exact: true,
    to: `/timesheet`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Clients", to: "/timesheet/clients" },
      { name: "Employees", to: "/timesheet/employees" },
    ],
  },
  {
    name: "Settings",
    exact: true,
    to: "/settings",
    iconClassName: "bi bi-speedometer2",
  },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}

          {/* <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-speedometer2"></i>
              </div>
              <span>Dashboard</span>
            </a>
          </li>
          <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          />
          <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-vector-pen"></i>
              </div>
              <span>Design</span>
            </a>
          </li> */}
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>User</h5>
          <p>user@beshta.com</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
