import React, { Component, Fragment } from "react";
import AutosizeTextarea from 'react-textarea-autosize';
import ReactJson from "react-json-view";
import "../styles/css/jsonContainer.css";
import AuthButton from './../components/AuthButton';

class JSONContainer extends Component {
  state = {
    showCreateNewModal: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeSubMenu !== this.props.activeSubMenu || prevProps.menuSelected !== this.props.menuSelected) {
      this.setState({ showCreateNewModal: false });
    }
  }

  newHueDataEditorRef = React.createRef();

  menuClick = menuIndex => this.props.subMenuClick(menuIndex);

  showCreateNewModal = showCreateNewModal => this.setState({ showCreateNewModal });

  menuItems = () => {
    if (!this.props.subMenuItems) return null;
    else {
      return (
        <div className="menuContainer">
          {this.props.subMenuItems.map((item, index) => (
            <MenuItem
              key={JSON.stringify(item)}
              onMenuClick={() => this.menuClick(index)}
              onDeleteClick={this.onDelete}
              isActive={index === this.props.activeSubMenu}
              index={index}
              menuTitle={item.name}
            />
          ))}
        </div>
      );
    }
  };

  constructQueryData = edit => {
    let query = this.props.jsonData.keyName + "/";

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

    let data = { [key]: value };

    if (edit.namespace[0] === "lightstates") {
      data = edit.updated_src.lightstates[edit.namespace[1]];
    }

    return { query, data };
  };

  onEdit = edit => {
    const queriedData = this.constructQueryData(edit);
    this.props.putHueData(queriedData.query, queriedData.data);
  };

  onEditDelete = del => {
    this.props.showSweetAlertDialog(
      "Are you sure?",
      "Are you sure you want to delete this?",
      () => {
        if (!this.props.jsonData.keyName)
          this.onConfigDelete(del);
        else this.onEdit(del);
      }
    );
    return false;
  };

  onConfigDelete = del => {
    if (del.namespace[0] !== "whitelist")
      this.props.writeToConsole([
        {
          "error": {
            "type": -1,
            "address": "/config",
            "description": "only properties in 'whitelist' can be deleted from config"
          }
        }
      ]);
    else
      this.props.deleteHueData("whitelist/" + del.name);
  };

  onDelete = () =>
    this.props.showSweetAlertDialog(
      "Are you sure?",
      "Are you sure you want to delete this?",
      () => this.props.deleteHueData(this.props.jsonData.keyName)
    );

  renderMenu = () => {
    if (!this.props.jsonData.keyName && this.props.jsonData.data) return null;
    return (
      <div className="menuWrapper">
        <div className="createNewItemButton" onClick={() => this.showCreateNewModal(true)}>
          <i className="material-icons createNewItemIcon">add_circle</i>
          Create new item
        </div>
        {this.menuItems()}
      </div>
    )
  }

  renderCreateNewModal = () => {
    return (
      <div className="jsonCreateModalWrapper">
        <div className="jsonCreateNewEditorContainer">
          <div className="jsonCreateNewCloseBtn" onClick={() => this.showCreateNewModal(false)}>
            <svg viewBox="0 0 40 40" fill="currentColor" preserveAspectRatio="xMidYMid meet" style={{verticalAlign: "middle", color: "rgb(56, 56, 48)", fontSize: "15px", transform: "rotate(45deg)", height: "1em", width: "1em"}}><g><path d="m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z"></path></g></svg>
          </div>
          <AutosizeTextarea 
            className="variable-editor jsonCreateNewEdtior" 
            ref={this.newHueDataEditorRef}
            />
          <AuthButton
            hint="Create new"
            onClick={() => {
              if (this.newHueDataEditorRef.current._ref.value) {
                try {
                  const newHueData = JSON.parse(this.newHueDataEditorRef.current._ref.value);
                  this.props.createNewHueData(newHueData);
                  this.setState({ showCreateNewModal: false });
                }
                catch (ex) {
                  this.newHueDataEditorRef.current._ref.style.border = '2px solid #932a2a';
                  this.props.writeToConsole([
                    {
                      "error": {
                        "type": -1,
                        "address": "<< create new item >>",
                        "description": ex
                      }
                    }
                  ]);
                }
              }
            }}
          />
        </div>
        <div className="jsonDataOverlay" onClick={() => this.showCreateNewModal(false)}></div>
      </div>
    )
  }

  renderJsonContent = () => {
    const jsonViewer = !this.props.jsonData.data
      ? <div className="emptyContainer">
          <div className="emptyText">No content to show</div>
        </div>
      : <ReactJson
          name={this.props.jsonData.keyName}
          src={this.props.jsonData.data}
          theme="monokai"
          onAdd={() => {}}
          onEdit={edit => this.onEdit(edit)}
          onDelete={del => this.onEditDelete(del)}
          collapsed={false}
          displayDataTypes={true}
          displayObjectSize={false}
          validationMessage=""
          enableClipboard
        />

      return (
        <div className="jsonDataWrapper">
          {this.state.showCreateNewModal && this.renderCreateNewModal()}
          <div className="jsonDataContainer">
            {jsonViewer}
          </div>
        </div>
      )
  }

  render() {
    return (
      <Fragment>
        <div className="contentContainer">
          {this.renderMenu()}
          <div
            style={
              !this.props.subMenuItems
                ? { width: "100%" }
                : { width: "75%" }
            }
          >
            {this.renderJsonContent()}
          </div>
        </div>
      </Fragment>
    );
  }
}

class MenuItem extends Component {
  deleteButton = () => (
    <div
      className="deleteButton"
      style={this.props.isActive ? { width: "35px" } : { width: 0 }}
      onClick={this.props.onDeleteClick}
    >
      <i className="material-icons">delete_forever</i>
    </div>
  );

  render() {
    const menuStyle = this.props.isActive
      ? "menuItem menuItemActive"
      : "menuItem";

    return (
      <div>
        {this.deleteButton()}
        <div className="itemContainer">
          <div onClick={this.props.onMenuClick} className={menuStyle}>
            {this.props.menuTitle}
          </div>
        </div>
      </div>
    );
  }
}

export default JSONContainer;
