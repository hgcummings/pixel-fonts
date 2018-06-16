const { fonts, renderImage } = require('./index');
const fs = require('fs');

let allCharacters = "";

for (let charCode = 33; charCode < 127; ++charCode) {
    if (charCode % 32 === 0) {
        allCharacters += "\n";
    }
    allCharacters += String.fromCharCode(charCode);
}

Object.entries(fonts).forEach(([name, font]) => {
    renderImage(
        `Font name: ${font.name}\n\nDescription: ${font.description}\n \n \n${allCharacters}`,
        font,
        {
            foreground: [0, 0, 0, 255],
            background: [255, 255, 255],
            scale: 2
        }
    ).pipe(fs.createWriteStream(`./samples/${name}.png`));
});
