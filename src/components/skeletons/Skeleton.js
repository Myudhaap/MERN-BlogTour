import React from "react";
import "./skeleton.css";

const Skeleton = ({ classes = "", style = {} }) => {
  const classNames = `skeleton ${classes} animate-pulse`;
  return <div className={classNames} style={style}></div>;
};

export default Skeleton;
