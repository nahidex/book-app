/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.scss';
const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
import 'jszip';
import * as ePub from 'epubjs';
var fs = require('fs');
var path = require("path");

var book = ePub.default();
var rendition;
var inputElement = document.getElementById("book-input");

inputElement.addEventListener('change', function (e) {
    var file = e.target.files[0];    
    if (window.FileReader) {
        var reader = new FileReader();
        reader.onload = openBook;
        reader.readAsArrayBuffer(file);
    }
});

function openBook(e) {
    var bookData = e.target.result;

    book.open(bookData);

    rendition = book.renderTo("viewer", {
        // method: "continuous",
        width: '100%',
        height: '100%'
    });
    // var displayed = rendition.display("epubcfi(/6/14[xchapter_001]!4/2/30/2[c001p0016]/1:47)");

    rendition.display();

    rendition.on('keyup', (e) => {

        if ((e.keyCode || e.which) == 37) {
            rendition.prev();
        }

        if ((e.keyCode || e.which) == 39) {
            console.log('right');
            rendition.next();
        }
        
    })
    // rendition.on("keyup", keyListener);
    // rendition.on("relocated", function (location) {
    //     console.log(location);
    // });

    // next.addEventListener("click", function (e) {
    //     rendition.next();
    //     e.preventDefault();
    // }, false);

    // prev.addEventListener("click", function (e) {
    //     rendition.prev();
    //     e.preventDefault();
    // }, false);

    // var keyListener = function (e) {

    //     // Left Key
    //     if ((e.keyCode || e.which) == 37) {
    //         rendition.prev();
    //     }

    //     // Right Key
    //     if ((e.keyCode || e.which) == 39) {
    //         rendition.next();
    //     }
    // };


    // document.addEventListener("keyup", keyListener, false);
}


// document.getElementById('btn-open-file').onclick = (event) => {
//     event.preventDefault();
//     dialog.showOpenDialog().then(result => {
//         // ipcRenderer.send('fileopened', result.filePaths[0]);

//         // var book = ePub.default(path.resolve(result.filePaths[0]));
//         // var rendition = book.renderTo("area", { width: 600, height: 400 });
//         // var displayed = rendition.display();

//     }).catch(err => {
//         console.log(err);
//     });
// }
