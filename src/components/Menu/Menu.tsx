import React, { FC } from 'react';
import './menu.scss';

interface IMenuProps {
  menuItems: Array<{ name: string; active: boolean }>;
  menuSelected: number;
  menuClick: (menuNumber: number) => void;
}

const Menu: FC<IMenuProps> = (props) => {
  const renderMenuItems = () => {
    return props.menuItems.map((item, index) => {
      const handleMenuClick = () => {
        props.menuClick(index);
      };

      return (
        <MenuItem
          key={item.name + item.active}
          isActive={props.menuSelected === index}
          menuClick={handleMenuClick}
          label={item.name}
        />
      );
    });
  };

  return <div className='mainMenuWrapper'>{renderMenuItems()}</div>;
};

interface IMenuItemProps {
  label: string;
  isActive: boolean;
  menuClick: () => void;
}

const MenuItem: FC<IMenuItemProps> = (props) => {
  const classes = props.isActive ? 'mainMenuItem mainMenuItemActive' : 'mainMenuItem';

  return (
    <div onClick={props.menuClick} className={classes}>
      {props.label}
    </div>
  );
};

export default Menu;
