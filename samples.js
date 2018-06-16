const { fonts, renderImage } = require('./index');
const fs = require('fs');

Object.entries(fonts).forEach(([name, font]) => {
    renderImage(
        `Name: ${font.name}\n \nABCDEFGHIJKLMNOPQRSTUVWXYZ!\nabcdefghijklmnopqrstuvwxyz.`,
        font,
        {
            foreground: [0, 0, 0, 255],
            background: [255, 255, 255],
            scale: 3
        }
    ).pipe(fs.createWriteStream(`./samples/${name}.png`));
});
