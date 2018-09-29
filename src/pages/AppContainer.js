import React, { Component, Fragment } from "react";
import * as service from "../services/xs-json-requester";
import Menu from "../menu/Menu";
import JSONContainer from "./JSONContainer";
import Console from "../console/Console";
import "../styles/css/appContainer.css";
import "../styles/css/cssOverwrite.css";
import LoaderSpinner from "../components/loaderSpinner";

class AppContainer extends Component {
  state = {
    apiUrl: `http://${this.props.ip}/api/${this.props.token}/`,
    failedLoading: false,
    failedMessage: "",
    hueData: [],
    menuItems: [],
    activeMenu: 0,
    activeSubMenu: 0,
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
    setInterval(() => {
      this.updateHueData();
    }, 2000);
  };

  getMenuItems = () =>
    Object.keys(this.state.hueData).map(item => ({
      name: item.replace(/^\w/, c => c.toUpperCase()),
      link: item
    }));

  getHueData = () =>
    service
      .getJSON(this.state.apiUrl)
      .then(res => this.setHueData(res))
      .catch(() =>
        this.setState({
          failedLoading: true,
          failedMessage: "connection could not be obtained"
        })
      );

  updateHueData = () => {
    service
    .getJSON(this.state.apiUrl)
    .then(res => {
      if (this.hueDataDidUpdate(res))
        this.setHueData(res);
    })
    .catch(() =>
      this.setState({
        failedLoading: true,
        failedMessage: "connection has been lost"
      })
    );
  }

  putHueData = (query, data) => {
    const url =
      this.state.apiUrl +
      this.state.menuItems[this.state.activeMenu].link +
      "/" +
      query;

    service
      .putJSON(url, data)
      .then(res => this.writeToConsole(res))
      .then(() => this.getHueData())
      .catch(err => this.writeToConsole(err));
  };

  deleteHueData = query => {
    const url =
      this.state.apiUrl +
      this.state.menuItems[this.state.activeMenu].link +
      "/" +
      query;

    service
      .deleteJSON(url)
      .then(res => this.writeToConsole(res))
      .then(() => this.getHueData())
      .catch(err => this.writeToConsole(err));
  };

  writeToConsole = write =>
    this.setState(prevState => ({
      consoleOutput: [...prevState.consoleOutput, write]
    }));

  setHueData = newData => {
    if (newData[0])
      this.setState({
        failedLoading: true,
        failedMessage: newData[0].error.description
      });
    else 
      this.setState({ hueData: newData }, () => this.setState({ menuItems: this.getMenuItems() }));
  };

  hueDataDidUpdate = newData => {
    const filteredOldData = Object.values(this.getSubJsonData(this.state.hueData))[this.state.activeSubMenu];
    const filteredNewData = Object.values(this.getSubJsonData(newData))[this.state.activeSubMenu];

    return JSON.stringify(filteredOldData) !== JSON.stringify(filteredNewData);
  }

  menuClick = menuIndex => this.setState({ activeMenu: menuIndex, activeSubMenu: 0 });

  subMenuClick = menuIndex => this.setState({ activeSubMenu: menuIndex });

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
      );
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
              putHueData={this.putHueData}
              deleteHueData={this.deleteHueData}
              writeToConsole={this.writeToConsole}
              subMenuClick={this.subMenuClick}
              activeSubMenu={this.state.activeSubMenu}
              showVerificationModal={this.props.showVerificationModal}
              showSweetAlertDialog={this.props.showSweetAlertDialog}
              
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
