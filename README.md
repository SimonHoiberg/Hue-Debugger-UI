# Hue Debugger UI [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Fan%20of%20Philips%20Hue?%20Check%20out%20Hue%20Debugger%20UI!&url=https://github.com/Silind/Hue-Debugger-UI&hashtags=philipshue,iot,developertool)

[![Github License](https://img.shields.io/github/license/Silind/Hue-Debugger-UI.svg)](https://github.com/Silind-Software/Hue-Debugger-UI/blob/master/LICENSE)
[![Build Status](https://travis-ci.com/Silind/Hue-Debugger-UI.svg?branch=master)](https://travis-ci.com/Silind/Hue-Debugger-UI)
[![React Version](https://img.shields.io/badge/react-v16.4.2-blue.svg)](https://github.com/facebook/react)
[![Electron Version](https://img.shields.io/badge/electron-v2.0.10-blue.svg)](https://github.com/electron/electron)

![example](https://silind-s3.s3.eu-west-2.amazonaws.com/icons-and-misc/laptop.png)

#### Graphical interface for observing and interacting directly with Hue API

## Table of content

- [**Getting Started**](#getting-started)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Get Help](#get-help)
- [Motivation](#motivation)
- [Acknowledgments](#acknowledgements)

## Getting Started
You can get up and running with Hue Debugger UI quickly in two ways

- **Install from executable .exe (Windows x64) or download archive (Linux x64 / macOS)**
- **Clone repository and run with Node**

### Download executable

#### [Download for Windows (x64)](https://github.com/Silind-Software/Hue-Debugger-UI/releases/download/v2.0.0/HueDebuggerUIInstaller.exe)

#### [Download for macOS (x64)](https://github.com/Silind-Software/Hue-Debugger-UI/releases/download/v2.0.0/Hue-Debugger-UI-mac.zip)

#### [Download for Linux (x64)](https://github.com/Silind-Software/Hue-Debugger-UI/releases/download/v2.0.0/Hue.Debugger.UI-linux-x64.zip)

### Run with Node
Clone this repository, and run Hue Debugger UI from a local server using Node.

#### Prerequisites
You need to have [Node](https://nodejs.org/en/) installed on your computer.

#### Installing
- Clone this repository
- Extract the files and navigate to folder from command prompt or terminal.  
- Use the command
```console
npm install
```
- After installing, start the local server by using the command
```console
npm start
```

Hue Debugger UI should prompt in your browser on [localhost:3000](http://localhost:3000/)
## Built With

#### [React](https://reactjs.org/)
A JavaScript library for building user interfaces

#### [Electron](https://electronjs.org/)
Build cross platform desktop apps with JavaScript, HTML, and CSS

## Contributing

#### Issues
In the case of a bug report, bugfix or a suggestions, please feel very free to open an issue.

#### Pull request
Pull requests are always welcome, and I'll do my best to do reviews as fast as I can.

## License

This project is licensed under the [MIT License](https://github.com/Silind/Hue-Debugger-UI/blob/master/LICENSE)

## Get Help
- Contact me on silindsoftwaredk@gmail.com
- If appropriate, [open an issue](https://github.com/Silind/Hue-Debugger-UI/issues) on GitHub

## Motivation
**An enhanced substitute for the API Debug Tool**  
Every Hue bridge comes with a simple web app built into it, the _API Debug Tool_, which you can use to learn how the Hue REST API works 'under the hood' and which can be useful to debug your app during development.

<img src="https://silind-s3.s3.eu-west-2.amazonaws.com/icons-and-misc/example-png.png" width="500" />

However, the _API Debug Tool_ quickly becomes tedious to use, and especially when doing continuous debugging of larger and more complex projects, debugging with this tool will feel cumbersome.

This is the main motivation for building an enhanced graphical user interface to interact with the Hue REST API in a much more convenient way.

## Acknowledgements

- [react-json-view](https://github.com/mac-s-g/react-json-view) - Amazing React component for visualizing JSON! Huge thumbs up!
- [react-json-editor-ajrm](https://github.com/AndrewRedican/react-json-editor-ajrm) - React component for editing, viewing and debugging Javascript objects.
- [SweetAlert](https://sweetalert.js.org/) - JavaScript library for showing alert boxes.
