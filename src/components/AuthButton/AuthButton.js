import React from 'react';
import "./authButton.scss";

/**
 * Auth Button
 * @prop {string} hint text of the button
 * @prop {function} onClick event that triggers on button click
 * @prop {boolean} disabled button disabled if true
 */
const AuthButton = props => {
  let buttonStyle = props.disabled ? "authButton disabled" : "authButton";

  const handleClick = e => {
    if (!props.disabled) {
      props.onClick(e);
    }
  }

  return (
    <div className={buttonStyle} onClick={handleClick}>
      {props.hint}
    </div>
  )
}

export default AuthButton;