import React, { Fragment, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashBoardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./Header.css";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashBoardIcon />,
      name: "Dashbaord",
      func: dashboard,
    });
  }

  function orders() {
    history("/orders");
  }

  function account() {
    history("/account");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully...");
    history("/");
  }

  function dashboard() {
    history("/dashboard");
  }

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        direction="down"
        className="speedDial"
        style={{zIndex:"11"}}
        icon={
          <img
            src={
              user.avatar.url ? user.avatar.url : "../../../images/Profile.png"
            }
            className="speedDialIcon"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>

      <Toaster position="bottom-center" reverseOrder={false} />
    </Fragment>
  );
};

export default UserOptions;
