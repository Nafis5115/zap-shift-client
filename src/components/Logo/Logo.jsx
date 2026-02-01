import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <Link to={"/"} className="flex items-end">
      <img src={logo} alt="" />
      <h1 className="text-2xl -ml-4 text-secondary font-bold">ZapShift</h1>
    </Link>
  );
};

export default Logo;
