const menuTemplate = [
  {
    label: "File",
    submenu: [
      { label: "Settings" },
      { type: "separator" },
      { role: "minimize" },
      { role: "close" }
    ]
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "togglefullscreen" },
      { type: "separator" },
      {
        label: "Advanced",
        submenu: [
          { 
            label: "Clear developer tokens",
            click() {
              localStorage.removeItem("hueApiIp");
              localStorage.removeItem("hueApiAuthToken");
            } }, 
          { role: "toggledevtools" }]
      }
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Github",
        click() {
          require("electron").shell.openExternal(
            "https://github.com/Silind/Hue-debugger-UI"
          );
        }
      }
    ]
  }
];

module.exports = {
  menu: menuTemplate
};
