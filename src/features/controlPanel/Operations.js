import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const Operations = (props) => {
  const operations = props.state;
  return (
    <div className="card">
      <div className="card-body">
        <span className="pe-1">
          <IconContext.Provider value={{ size: "2rem", color: "green" }}>
            <BsPlusCircleFill />
          </IconContext.Provider>
        </span>
        <span className="px-1">
          <IconContext.Provider value={{ size: "2rem", color: "green" }}>
            <BsPlusCircleFill />
          </IconContext.Provider>
        </span>
        <span className="px-1">
          <IconContext.Provider value={{ size: "2rem", color: "green" }}>
            <BsPlusCircleFill />
          </IconContext.Provider>
        </span>
        <span className="ps-1">
          <IconContext.Provider value={{ size: "2rem", color: "green" }}>
            <BsPlusCircleFill />
          </IconContext.Provider>
        </span>
      </div>
    </div>
  );
};

export default Operations;
