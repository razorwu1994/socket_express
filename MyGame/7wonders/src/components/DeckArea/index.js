import React, { Component } from "react";
import "./styles.css";
export default function(props) {
  return (
    <div className={`${props.yourDeck ? "bottomDeck" : "upDeck"}`}>
      <h3>Player Deck Area</h3>
      {props.children}
    </div>
  );
}
