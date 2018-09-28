import React, { Component } from "react";
import * as moment from "moment";
import "moment/locale/pt-br";
import "../styles/css/console.css";

class Console extends Component {
  state = {
    showFormatted: true
  };

  toggleFormatting = () =>
    this.setState({ showFormatted: !this.state.showFormatted });

  consoleOutput = () =>
    this.props.consoleOutput.map((o, index) => (
      <ConsoleOutput
        key={JSON.stringify(o).length * index}
        output={o}
        formatted={this.state.showFormatted}
      />
    ));

  render() {
    const formattedIcon = this.state.showFormatted ? "notes" : "sort";
    return (
      <div
        className={
          this.props.show
            ? "consoleWrapper consoleWrapperShow"
            : "consoleWrapper"
        }
      >
        <div
          className={
            this.props.show
              ? "consoleHeader consoleHeaderShow"
              : "consoleHeader"
          }
          onClick={this.props.toggleConsole}
        >
          Console
        </div>
        <div className="menuLine" data-title={this.state.showFormatted ? "No formatting" : "Formatting"}>
          <div className="menuButton" onClick={this.toggleFormatting}>
            <i className="material-icons">{formattedIcon}</i>
          </div>
        </div>
        <div className="consoleContent">{this.consoleOutput()}</div>
      </div>
    );
  }
}

class ConsoleOutput extends Component {
  state = {
    now: moment().format("h:mm:ss a")
  };

  formattedConsoleOutput = () => {
    const rawConsoleOutput = () => (
      <tbody>
        {this.formattedConsoleRow(this.state.now, "")}
        {this.formattedConsoleRow(
          "",
          JSON.stringify(this.props.output, null, 2)
        )}
      </tbody>
    );

    const outputContent = () => {
      if (this.props.output[0] === undefined)
        return (
          <tbody>
            {this.formattedConsoleRow(
              this.state.now,
              "error: undefined output"
            )}
          </tbody>
        );

      const logType = Object.keys(this.props.output[0])[0];
      if (logType === "success")
        return (
          <tbody>
            {this.formattedConsoleRow(this.state.now, "success:")}
            {this.formattedConsoleRow(
              "",
              JSON.stringify(this.props.output[0][logType], null, 2)
            )}
          </tbody>
        );
      else
        return (
          <tbody>
            {this.formattedConsoleRow(
              this.state.now,
              "error: type " + this.props.output[0][logType].type
            )}
            {this.formattedConsoleRow(
              "",
              "address: " + this.props.output[0][logType].address
            )}
            {this.formattedConsoleRow(
              "",
              "description: " + this.props.output[0][logType].description
            )}
          </tbody>
        );
    };

    if (this.props.formatted)
      return <table className="consoleTable">{outputContent()}</table>;
    else return <table className="consoleTable">{rawConsoleOutput()}</table>;
  };

  formattedConsoleRow = (firstCell, secondCell) => (
    <tr>
      <td>{firstCell}</td>
      <td>{secondCell}</td>
    </tr>
  );

  render() {
    return <div className="outputWrapper">{this.formattedConsoleOutput()}</div>;
  }
}

export default Console;
