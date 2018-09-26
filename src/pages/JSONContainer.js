import React, { Component, Fragment } from "react";
import ReactJson from "react-json-view";
import "../styles/css/jsonContainer.css";

class JSONContainer extends Component {
  state = {
    selectedSubItem: 0
  };
  
  updateButtonRef = React.createRef();
  saveButtonRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.jsonData !== this.props.jsonData)
      this.setState({ selectedSubItem: 0 });
  }

  menuClick = menuIndex => this.setState({ selectedSubItem: menuIndex });

  menuItems = () => {
    if (
      this.props.menuSelected[0].link === "" ||
      this.props.menuSelected[0].link === "config"
    )
      return null;
    else {
      return (
        <div className="menuContainer">
          {Object.values(this.props.jsonData).map((item, index) => (
            <MenuItem
              key={JSON.stringify(item + index + this.state.selectedSubItem)}
              onMenuClick={() => this.menuClick(index)}
              onDeleteClick={this.onDelete}
              isActive={index === this.state.selectedSubItem}
              index={index}
              item={item}
            />
          ))}
        </div>
      );
    }
  };

  getSrcData = () => {
    if (
      this.props.menuSelected[0].link === "" ||
      this.props.menuSelected[0].link === "config"
    ) 
      return this.props.jsonData;
    else return Object.values(this.props.jsonData)[this.state.selectedSubItem];
  };

  getSrcKey = () => {
    if (
      this.props.menuSelected[0].link === "" ||
      this.props.menuSelected[0].link === "config"
    )
      return "root";
    else return Object.keys(this.props.jsonData)[this.state.selectedSubItem];
  };

  constructQueryData = edit => {
    let query = this.getSrcKey() + "/";
    let currentLevel = edit.updated_src;
    let key = edit.name;
    let value = edit.new_value;

    for (let i = 0; i < edit.namespace.length; i++) {
      currentLevel = currentLevel[edit.namespace[i]];
      if (Array.isArray(currentLevel)) {
        key = edit.namespace[i];
        value = currentLevel;
        break;
      }
      query += edit.namespace[i] + "/";
    }

    return {
      query: query,
      data: {
        [key]: value
      }
    }
  }

  onEdit = edit => {
    const queriedData = this.constructQueryData(edit);
    this.props.putHueData(queriedData.query, queriedData.data);
  }

  onEditDelete = del => {
    this.props.showSweetAlertDialog(
      "Are you sure?",
      "Are you sure you want to delete this?",
      () => this.onEdit(del)
    );
    return false;
  }

  onDelete = () => 
    this.props.showSweetAlertDialog(
      "Are you sure?",
      "Are you sure you want to delete this?",
      () => this.props.deleteHueData(this.getSrcKey())
    );

  render() {
    if (this.getSrcData() === undefined)
      return (
        <div className="emptyContainer">
          <div className="emptyText">No content to show</div>
        </div>
      )
    else 
      return (
      <Fragment>
        <div className="contentContainer">
          {this.menuItems()}
          <div
            style={this.getSrcKey() === "root" ? {width: "100%"} : {width: "75%"} }
          >
            <div className="jsonDataContainer">
              <ReactJson
                name={this.getSrcKey()}
                src={this.getSrcData()}
                theme="monokai"
                onAdd={() => {}}
                onEdit={edit => this.onEdit(edit)}
                onDelete={del => this.onEditDelete(del)}
                collapsed={this.props.menuSelected[0].link === "" ? 1 : false}
                displayDataTypes={true}
                displayObjectSize={false}
                validationMessage=""
                enableClipboard
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

class MenuItem extends Component {
  state = {
    active: this.props.isActive
  };

  deleteButton = () => {
    return (
      <div 
        className="deleteButton"
        style={this.props.isActive ? {width: "35px"} : {width: 0}}
        onClick={this.props.onDeleteClick}
      >
        <i className="material-icons">delete_forever</i>
      </div>
    )
  }
     
  render() {
    const menuStyle = this.state.active
      ? "menuItem menuItemActive"
      : "menuItem"

    return (
      <div>
        {this.deleteButton()}
        <div className="itemContainer">
          <div
            onClick={this.props.onMenuClick}
            className={menuStyle}
          >
            {this.props.item.name}
          </div>
        </div>
      </div>
    );
  }
}

export default JSONContainer;
