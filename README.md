# Hue Debugger UI   
[![Github License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Silind/Hue-Debugger-UI/blob/master/LICENSE)
[![React Version](https://img.shields.io/badge/react-v16.4.2-blue.svg)](https://github.com/facebook/react)
[![Electron Version](https://img.shields.io/badge/electron-v2.0.10-blue.svg)](https://github.com/electron/electron)
[![Build Status](https://travis-ci.com/Silind/Hue-Debugger-UI.svg?branch=master)](https://travis-ci.com/Silind/Hue-Debugger-UI)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

#### An interactive graphical interface for observing and interacting with Philips Hue REST API

## Table of content

- [Preview](#preview)
- [**Getting Started**](#getting-started)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Get Help](#get-help)
- [Motivation](#motivation)
- [Acknowledgments](#acknowledgements)

## Preview

![example-gif2.gif](https://silindstorage.blob.core.windows.net/hue-developer-api-container/example-gifv101.gif)

## Getting Started
You can get up and running with Hue Debugger UI quickly in two ways

- **Install from executable .exe (Windows x64) or download archive (Linux x64)**
- **Clone repository and run with Node**

### Download executable

#### [Download for Windows (x64)](https://github.com/Silind/Hue-Debugger-UI/releases/download/v1.0.1/HueDebuggerUIInstaller.exe)

#### [Download for Linux (x64)](https://github.com/Silind/Hue-Debugger-UI/releases/download/v1.0.1/Hue-Debugger-UI-linux-x64.zip)

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
**An enhanced substitute for the API Debug Tool!**  
Every Hue bridge comes with a simple web app built into it, the _API Debug Tool_, which you can use to learn how the Hue REST API works 'under the hood' and which can be useful to debug your app during development.

![SuccessResponse.png](https://www.developers.meethue.com/sites/default/files/SuccessResponse.png)

However, the _API Debug Tool_ quickly becomes tedious to use, and especially when doing continuous debugging of larger and more complex projects, debugging with this tool will feel cumbersome.

This is the main motivation for building an enhanced graphical user interface to interact with the Hue REST API in a much more convenient way.

## Acknowledgements

- [react-json-view](https://github.com/mac-s-g/react-json-view) - Amazing React component for visualizing JSON! Huge thumbs up!
- [SweetAlert](https://sweetalert.js.org/) - Awesome library for showing alert boxes.
