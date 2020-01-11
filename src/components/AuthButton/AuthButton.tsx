import React, { FC } from 'react';
import './authButton.scss';

interface IProps {
  hint: string;
  disabled?: boolean;
  onClick: () => void;
}

const AuthButton: FC<IProps> = (props) => {
  const buttonStyle = props.disabled ? 'authButton disabled' : 'authButton';

  const handleClick = () => {
    if (!props.disabled) {
      props.onClick();
    }
  };

  return (
    <div className={buttonStyle} onClick={handleClick}>
      {props.hint}
    </div>
  );
};

export default AuthButton;
