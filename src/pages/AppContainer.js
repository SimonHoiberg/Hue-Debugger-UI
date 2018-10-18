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
    apiUrl: `http://${this.props.ip}/api/${this.props.token}`,
    failedLoading: false,
    failedMessage: "",
    hueData: [],
    subHueData: null,
    menuItems: [],
    subMenuItems: [],
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

  componentWillMount = () => {
    this.requestHueData();
    setInterval(() => {
      this.requestHueData();
    }, 2000);
  };

  requestHueData = async options => {
    try {
      let menuItems = await this.fetchMenuItems("");
      let subMenuItems = await this.fetchMenuItems(
        menuItems[this.state.activeMenu].id
      );

      let prepareSubHueData;

      if (menuItems[this.state.activeMenu].id === "config")
        prepareSubHueData = await this.fetchHueData(
          menuItems[this.state.activeMenu].id
        );
      else if (subMenuItems.length === 0) {
        subMenuItems = null;
        prepareSubHueData = null;
      } 
      else
        prepareSubHueData = await this.fetchHueData(
          menuItems[this.state.activeMenu].id +
            "/" +
            subMenuItems[this.state.activeSubMenu].id
        );

      const subHueData = {
        keyName: subMenuItems
          ? subMenuItems[this.state.activeSubMenu].id
          : null,
        data: prepareSubHueData
      };

      if (
        JSON.stringify(this.state.subHueData) !== JSON.stringify(subHueData) ||
        (options && options.force)
      )
        this.setState({ menuItems, subMenuItems, subHueData });
    } catch (e) {
      this.setState({
        failedLoading: true,
        failedMessage: e
      });
    }
  };

  getMenuItems = () =>
    Object.keys(this.state.hueData).map(item => ({
      name: item.replace(/^\w/, c => c.toUpperCase()),
      id: item
    }));

  fetchMenuItems = query =>
    new Promise((resolve, reject) => {
      service
        .getJSON(this.state.apiUrl + "/" + query)
        .then(res => {
          if (res[0]) reject(res[0].error.description);
          else if (query === "config") resolve();
          else {
            const menuItems = Object.keys(res).map(item => ({
              id: item,
              name: query
                ? item + " : " + res[item].name
                : item.replace(/^\w/, c => c.toUpperCase())
            }));
            resolve(menuItems);
          }
        })
        .catch(err => {
          reject("connection could not be obtained");
          console.log(err);
        });
    });

  fetchHueData = query =>
    new Promise((resolve, reject) => {
      service
        .getJSON(this.state.apiUrl + "/" + query)
        .then(res => {
          if (res[0]) reject(res[0].error.description);
          else resolve(res);
        })
        .catch(err => {
          reject("connection could not be obtained");
          console.log(err);
        });
    });

  putHueData = (query, data) => {
    const url =
      this.state.apiUrl +
      "/" +
      this.state.menuItems[this.state.activeMenu].id +
      "/" +
      query;

    service
      .putJSON(url, data)
      .then(res => {
        this.requestHueData({ force: true });
        this.writeToConsole(res);
      })
      .catch(err => this.writeToConsole(err))
  };

  deleteHueData = query => {
    const url =
      this.state.apiUrl +
      "/" +
      this.state.menuItems[this.state.activeMenu].id +
      "/" +
      query;

    service
      .deleteJSON(url)
      .then(res => {
        this.writeToConsole(res);
        this.requestHueData({ force: true });
      })
      .catch(err => this.writeToConsole(err))
  };

  createNewHueData = hueData => {
    service.postJSON(
      this.state.apiUrl +
        "/" +
        this.state.menuItems[this.state.activeMenu].id +
        "/",
      hueData
    )
    .then(res => {
      this.writeToConsole(res);
      this.requestHueData({ force: true })
    })
    .catch(err => this.writeToConsole(err))
  };

  writeToConsole = write =>
    this.setState(prevState => ({
      consoleOutput: [...prevState.consoleOutput, write]
    }));

  menuClick = menuIndex =>
    this.setState(
      { activeMenu: menuIndex, activeSubMenu: 0 },
      this.requestHueData
    );

  subMenuClick = menuIndex =>
    this.setState({ activeSubMenu: menuIndex }, this.requestHueData);

  consoleClick = () => this.setState({ showConsole: !this.state.showConsole });

  render() {
    if (!this.state.subHueData)
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
              jsonData={this.state.subHueData}
              subMenuItems={this.state.subMenuItems}
              menuSelected={this.state.menuItems.filter(
                (m, i) => i === this.state.activeMenu
              )}
              putHueData={this.putHueData}
              deleteHueData={this.deleteHueData}
              createNewHueData={this.createNewHueData}
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
