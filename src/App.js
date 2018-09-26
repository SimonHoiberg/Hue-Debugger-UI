import React, { Component } from "react";
import AppContainer from "./pages/AppContainer";
import "./styles/css/appContainer.css";
import Authenticate from "./pages/Authenticate";
import swal from "sweetalert";

class App extends Component {
  state = { 
    hueIp: null,
    authToken: null
  };

  componentWillMount() {
    if (localStorage.getItem("hueApiIp") && localStorage.getItem("hueApiAuthToken"))
      this.setState({ hueIp: localStorage.getItem("hueApiIp"), authToken: localStorage.getItem("hueApiAuthToken") });
  }

  setAuthentication = (hueIp, authToken) => {
    localStorage.setItem("hueApiIp", hueIp);
    localStorage.setItem("hueApiAuthToken", authToken);
    this.setState({ hueIp, authToken }); 
  }

  showSweetAlertDialog = (title, hint, action) =>
    swal({
      title: title,
      text: hint,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) action();
    });

  showSweetAlertWarning = warning => {
    swal(warning);
  };

  render() {
    if (this.state.hueIp && this.state.authToken)
      return <AppContainer 
        ip={this.state.hueIp}
        token={this.state.authToken}
        showSweetAlertDialog={this.showSweetAlertDialog} 
        />;
    else
      return (
        <Authenticate
          setAuthentication={this.setAuthentication}
          showSweetAlertWarning={this.showSweetAlertWarning}
        />
      );
  }
}

export default App;
