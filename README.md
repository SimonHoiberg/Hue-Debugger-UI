# Hue Debugger UI
#### An interactive graphical interface for observing and interacting with Philips Hue REST API

## Table of content

- [Preview](#Preview)
- [Motivation](#Motivation)
- [Getting Started](#Getting-Started)
- [Built With](#Built-With)
- [Contributing](#Contributing)
- [Authors](#Authors)
- [License](#License)
- [Get Help](#Getting-Help)
- [Acknowledgments](#Acknowledgments)

## Preview

![example-gif2.gif](https://silindstorage.blob.core.windows.net/hue-developer-api-container/example-gif2.gif)

## Motivation

**Philips Hue is awesome! Let's agree on that right away!**  
Not only is Philips Hue an IoT must-have, but as a developer it's especially exciting that you can get started on building your own apps and web services that controls your light system right away!  

Every Hue bridge comes with a simple web app built into it, the _API Debug Tool_, which you can use to learn how the Hue REST API works 'under the hood' and which can be useful to debug your app during development.

![SuccessResponse.png](https://www.developers.meethue.com/sites/default/files/SuccessResponse.png)

Yes, we all love Hue, but can we just agree that this debugger simply don't do Hue justice?  
If you think this looks tedious and unpractical to use, you're absolutely spot on.  
Indeed, this is not an end-user interface, but why should we developers suffer unnecessarily?

This is the main motivation for building an enhanced graphical user interface to interact with the Hue REST API in a much more satisfying way.

## Getting Started
You can get up and running with Hue Debugger UI quickly in two ways

- **Install from executable .exe (Windows) or .app (Mac)**
- **Clone repository and run with Node**

### Download executable

##### [Download for Windows](https://github.com/Silind/Hue-Debugger-UI)

##### [Download for Mac](https://github.com/Silind/Hue-Debugger-UI)

##### [Download for Linux](https://github.com/Silind/Hue-Debugger-UI)

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

## Author

**Silind Software**  
_Simon Høiberg_

## License

This project is licensed under the MIT License

## Get Help
- Contact me on silindsoftwaredk@gmail.com
- If appropriate, [open an issue](https://github.com/Silind/Hue-Debugger-UI/issues) on Github

## Acknowledgements

- [react-json-view](https://github.com/mac-s-g/react-json-view) - Amazing React component for visualizing JSON! Huge thumbs up!
- [SweetAlert](https://sweetalert.js.org/) - Awesome library for showing alert boxes.
