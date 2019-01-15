import React, { Component } from "react";
import * as service from "../services/xs-json-requester";
import "../styles/css/authenticate.css";
import AuthButton from './../components/AuthButton';

class Authenticate extends Component {
  state = {
    inputIp: "",
    inputDevName: "",
    authenticateWaiter: false,
    authenticateTimeout: null,
  };

  validateInput = async () => {
    await this.setState({ inputIp: this.state.inputIp.replace(/[a-zA-Z]|:|\//g, "") });

    if (!this.state.inputIp)
      this.props.showSweetAlertWarning(
        "Fill the IP address of your HUE bridge"
      );
    else if (!this.validateIfIp(this.state.inputIp))
      this.props.showSweetAlertWarning("Doesn't seem like that IP is right");
    else if (!this.state.inputDevName)
      this.props.showSweetAlertWarning("Choose a cool developer name");
    else if (!this.validateDevName(this.state.inputDevName))
      this.props.showSweetAlertWarning("Developer name is not accepted");
    else this.beginCountdown();
  };

  startAuthenticateProbing = () => {
    const probe = setInterval(() => {
      if (this.state.authenticateWaiter)
        this.authorizeNewUser();
      else
        clearInterval(probe);
    }, 1500);
  }

  authorizeNewUser = () => {
    service
      .postJSON("http://" + this.state.inputIp + "/api", {
        devicetype: "hue_debugger_ui#" + this.state.inputDevName
      })
      .then(res => (
        Object.keys(res[0]).forEach(key => {
          if (key === "success") {
            clearTimeout(this.state.authenticateTimeout);
            this.props.setAuthentication(
              this.state.inputIp,
              res[0]["success"]["username"]
            )
          }
          else 
            return;
        }
      )))
      .catch(e => console.log(e.message))
  };

  renderInputFields = () => (
    <div className="authContainer">
      <div className="authHeadline">Enter bridge IP</div>
      <input
        value={this.state.inputIp}
        onChange={this.onInputChange("inputIp")}
        type="text"
        className="authInput"
        placeholder="e.g. 192.168.0.100"
      />

      <div className="authHeadline">Developer name</div>
      <input
        value={this.state.inputDevName}
        onChange={this.onInputChange("inputDevName")}
        type="text"
        className="authInput"
        placeholder="Choose a developer name"
      />

      <AuthButton 
        hint="Begin"
        onClick={this.validateInput}
      />
      
    </div>
  );

  renderCountdown = () => (
    <div className="authContainer">
      <div className="countdownLine">
        <div className="countdownProcess" />
      </div>

      <div className="bridgePushRow">
        <div className="bridgePushIcon" />
        <div className="bridgePushText">
          Go and press the Hue Bridge button to authenticate!
        </div>
      </div>
    </div>
  );

  validateIfIp = sequence => {
    let isIp = true;
    sequence.split(".").forEach(block => {
      if (isNaN(block) || block < 0 || block > 255) isIp = false;
    });
    return isIp;
  };

  validateDevName = name => {
    return /^[a-zA-ZæøåÆØÅ]+$/gm.test(name);
  };

  onInputChange = input => e => this.setState({ [input]: e.target.value });

  beginCountdown = async () => {
    await this.setState({ authenticateWaiter: true });
    await this.setState({ authenticateTimeout: setTimeout(() => this.endCountdown(), 15500) });
    this.startAuthenticateProbing();
  };

  endCountdown = async () => {
    await this.setState({ authenticateWaiter: false });
    this.props.showSweetAlertWarning("Hue failed to authenticate!\nDid you press the button on the bridge?");
  }

  render() {
    if (this.state.authenticateWaiter)
      return this.renderCountdown();
    else
      return this.renderInputFields();
  }
}

export default Authenticate;
