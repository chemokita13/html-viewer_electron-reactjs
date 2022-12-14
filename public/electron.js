const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs')
let main;

const newfile = () => dialog.showOpenDialogSync({
    properties: ['openFile', {
        filters: [
            { name: 'Html file', extensions: ['html'] },
        ]
    }]
})


const sendFileContent = (filepath) => {
    const fileContent = fs.readFileSync(filepath,{encoding:'utf8', flag:'r'})
    main.webContents.send('file:open', fileContent)
}

// Menu Template
const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New File',
                accelerator: 'Ctrl+N',
                click() {
                    //createNewProductWindow();
                    main.webContents.openDevTools();
                }
            },
            {
                label: 'Open file',
                accelerator: 'Ctrl+O',
                click() {
                    const newFilePath = newfile()
                    if (newFilePath) {
                        console.log('sending: '+ newFilePath)
                        sendFileContent(newFilePath[0])
                        console.log('sent: '+ newFilePath)
                    }
                }
            },
            {
                label: 'Save',
                accelerator: 'Ctrl+S',
                click(){
                    //TODO
                }
            }
        ]
    }
];

app.on('ready', () => {
    main = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    // Set The Menu to the Main Window
    Menu.setApplicationMenu(mainMenu);

    ///main.loadFile(__dirname + '/views/index.html')
    main.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        main.webContents.openDevTools();
    }
    
    main.once('ready-to-show', () => {
        main.show()
    })

    main.on('closed', () => {
        app.quit()
    })
})