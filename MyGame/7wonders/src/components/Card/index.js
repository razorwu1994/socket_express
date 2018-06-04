import React, { Component } from "react";
import "./styles.css";
import CONSTANTS from "../../constants";
export default function(props) {
  return (
    <div className="card">
      {CONSTANTS.suitMap[props.suit]}
      <h3>{CONSTANTS.cardMap[props.value]}</h3>
    </div>
  );
}
