import React from "react";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="navbar-main">
      <h2>Docs Clone</h2>
      <div className="input-align">
        <div className="icon-container">
          <IoSearchSharp size={20} />
        </div>
        <input placeholder="Search the Document" className="input-box" />
      </div>
      <div>
        <IoExtensionPuzzleSharp size={30} />
      </div>
    </div>
  );
};

export default Navbar;
