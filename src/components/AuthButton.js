import React from 'react';
import "../styles/css/authButton.css";

/**
 * Auth Button
 * @prop {string} hint text of the button
 * @prop {function} onClick event that triggers on button click
 */
const AuthButton = props => {
  return (
    <div className="authButton" onClick={props.onClick}>
      {props.hint}
    </div>
  )
}

export default AuthButton;