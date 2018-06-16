const { fonts, renderPNG } = require('./index');
const fs = require('fs');

Object.entries(fonts).forEach(([name, font]) => {
    renderPNG(
        `Name: ${font.name}\n \nABCDEFGHIJKLMNOPQRSTUVWXYZ!\nabcdefghijklmnopqrstuvwxyz.`,
        font,
        [255, 255, 255, 255],
        [0, 0, 0, 255],
        3
    ).pipe(fs.createWriteStream(`./samples/${name}.png`));
});
