import React, { Component, Fragment } from "react";
import * as service from "../services/xs-json-requester";
import Menu from "../menu/Menu";
import JSONContainer from "./JSONContainer";
import Console from "../console/Console";
import '../styles/css/appContainer.css';
import '../styles/css/cssOverwrite.css';
import LoaderSpinner from "../components/loaderSpinner";

class AppContainer extends Component {
  state = {
    apiUrl: `http://${this.props.ip}/api/${this.props.token}/`,
    failedLoading: false,
    failedMessage: "",
    hueData: [],
    menuItems: [],
    activeMenu: 0,
    showConsole: false,
    consoleOutput: [],
    verificationModal: {
      show: false,
      title: "",
      hint: "",
      action: null
    }
  };

  componentDidMount = () => {
    this.getHueData();
  };

  getMenuItems = () =>
    Object.keys(this.state.hueData).map(item => ({
      name: item.replace(/^\w/, c => c.toUpperCase()),
      link: item
    }));

  getHueData = () => 
    service
      .getJSON(
        this.state.apiUrl
      )
      .then(res => {
        if (res[0]) {
          this.setState({ failedLoading: true, failedMessage: res[0].error.description })
          return false;
        }
        return this.setHueData(res);
      })
      .then(suc => suc && this.setState({ menuItems: this.getMenuItems() }))
      .catch(() => this.setState({ failedLoading: true, failedMessage: "connection could not be obtained" }));

  putHueData = (query, data) => {
    const url = this.state.apiUrl +
          this.state.menuItems[this.state.activeMenu].link +
          "/" +
          query;

    service
      .putJSON(
        url,
        data
      )
      .then(res => this.writeToConsole(res))
      .then(() => this.getHueData())
      .catch(err => this.writeToConsole(err));
  };

  deleteHueData = (query) => {
    const url = this.state.apiUrl +
          this.state.menuItems[this.state.activeMenu].link +
          "/" +
          query;

    service
      .deleteJSON(url)
      .then(res => this.writeToConsole(res))
      .then(() => this.getHueData())
      .catch(err => this.writeToConsole(err));
  }

  writeToConsole = write => {
    this.setState(prevState => ({ 
      consoleOutput: [...prevState.consoleOutput, write]
    }))
  }

  setHueData = newData => {
    if (JSON.stringify(newData) !== JSON.stringify(this.state.hueData)) {
      this.setState({ hueData: newData });
      return true;
    }
    else
      return false;
  };

  menuClick = menuIndex => this.setState({ activeMenu: menuIndex });

  consoleClick = () => this.setState({ showConsole: !this.state.showConsole });

  getSubJsonData = jsonData =>
    this.state.menuItems[this.state.activeMenu].link === ""
      ? jsonData
      : jsonData[this.state.menuItems[this.state.activeMenu].link];

  render() {
    if (this.state.hueData.length === 0 || this.state.menuItems.length === 0)
      return (
        <LoaderSpinner 
          isLoading={!this.state.failedLoading}
          failMessage={this.state.failedMessage}
          backAction={this.props.removeAuthentication}
        />
      )
    else
      return (
        <Fragment>
          <div className="mainContainer">
            <Menu
              key={this.state.activeMenu}
              menuItems={this.state.menuItems}
              menuClick={this.menuClick}
              menuSelected={this.state.activeMenu}
            />
            <JSONContainer
              jsonData={this.getSubJsonData(this.state.hueData)}
              menuSelected={this.state.menuItems.filter(
                (m, i) => i === this.state.activeMenu
              )}
              update={this.getHueData}
              writeToConsole={this.writeToConsole}
              putHueData={this.putHueData}
              showVerificationModal={this.props.showVerificationModal}
              showSweetAlertDialog={this.props.showSweetAlertDialog}
              deleteHueData={this.deleteHueData}
            />
          </div>
          <Console
            show={this.state.showConsole}
            toggleConsole={this.consoleClick}
            consoleOutput={this.state.consoleOutput}
          />
        </Fragment>
      );
  }
}

export default AppContainer;
