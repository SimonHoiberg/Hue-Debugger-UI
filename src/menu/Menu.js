import React, { Component } from 'react';
import "../styles/css/menu.css";

class Menu extends Component {
  renderMenuItems = () => 
    this.props.menuItems.map((item, index) => (
      <MenuItem
        key={item.name + item.active}
        isActive={this.props.menuSelected === index}
        menuClick={() => this.props.menuClick(index)}
        label={item.name}
      />
    ))

  render() {
    return (
      <div className="mainMenuWrapper">
        {this.renderMenuItems()}
      </div>
    );
  }
}

const MenuItem = props => {
  return (
    <div 
      onClick={props.menuClick}
      className={props.isActive ? "mainMenuItem mainMenuItemActive" : "mainMenuItem"}>
        {props.label}
    </div>
  )
}
 
export default Menu;