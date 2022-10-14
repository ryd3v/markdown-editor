const { app, Menu, shell, ipcMain } = require('electron');

ipcMain.on('editor-reply', (event, arg) => {
  console.log(`Received reply from web page: ${arg}`);
});

const template = [
  {
    role: 'help',
    submenu: [
      {
        label: 'About Editor Component',
        click() {
          shell.openExternal('https://simplemde.com');
        },
      },
    ],
  },
];

if (process.env.DEBUG) {
  template.push({
    label: 'Debugging',
    submenu: [
      {
        label: 'Dev Tools',
        role: 'toggleDevTools',
      },

      { type: 'separator' },
      {
        role: 'reload',
        accelerator: 'Alt+R',
      },
    ],
  });
}

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
  });
}

const menu = Menu.buildFromTemplate(template);

module.exports = menu;
