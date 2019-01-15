const menuTemplate = [
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "togglefullscreen" },
      { type: "separator" },
      { role: "minimize" },
      { role: "close" }
    ]
  },
  {
    label: "Advanced",
    submenu: [
      { role: "toggledevtools" }
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "GitHub",
        click() {
          require("electron").shell.openExternal(
            "https://github.com/Silind/Hue-debugger-UI"
          );
        }
      },
      {
        label: "Raise an issue",
        click() {
          require("electron").shell.openExternal(
            "https://github.com/Silind/Hue-Debugger-UI/issues/new"
          );
        }
      }
    ]
  }
];

module.exports = {
  menu: menuTemplate
};
