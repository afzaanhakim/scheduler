import React from "react";
import classnames from "classnames";
import "components/Button.scss";
import { action } from "@storybook/addon-actions";


export default function Button(props) {
  const buttonClass =  classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
   });
console.log(buttonClass)
  return (
    <button
      onClick={props.onClick}
      className={buttonClass}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
