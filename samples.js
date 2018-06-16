const { fonts, renderPNG } = require('./index');
const fs = require('fs');

Object.entries(fonts).forEach(([name, font]) => {
    renderPNG(
        `${name}: ABCDEFGHIJKLMNOPQRSTUVWXYZ! abcdefghijklmnopqrstuvwxyz.`,
        font,
        [255, 255, 255, 255],
        [0, 0, 0, 255]
    ).pipe(fs.createWriteStream(`./samples/${name}.png`));
});
