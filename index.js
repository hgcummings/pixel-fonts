const log = require('loglevel');
const { PNG } = require('node-png');

const fonts = {
    sevenPlus: require('./data/seven-plus.json')
};

const gap = [[0]];

const render = (text, font) => {
    const letters = text.split("");
    const characters = [];
    let maxHeight = 0;
    for (let letter of letters) {
        let glyph = font[""];
        if (font[letter]) {
            glyph = font[letter]
        } else {
            log.warn(`Missing letter ${letter}`)
        }
        let newCharacter = [];
        glyph.pixels.forEach((row, index) => {
            newCharacter[index + glyph.offset] = row;
        });
        maxHeight = Math.max(maxHeight, newCharacter.length);
        if (characters.length) {
            characters.push(gap);
        }
        characters.push(newCharacter);
    }
    return characters.reduce((acc, cur) => {
        const blankRow = Array(cur[cur.length - 1].length).fill(0);
        for (let i = 0; i < maxHeight; ++i) {
            const row = cur[i] || blankRow;
            acc[i].push(...row);
        }
        return acc;
    }, Array(maxHeight).fill(0).map(_ => []));
};

const renderPNG = (text, font, background, foreground) => {
    const pixels = render(text, font);
    const png = new PNG({
        width: pixels[0].length,
        height: pixels.length
    });
    for (let y = 0; y < png.height; ++y) {
        for(let x = 0; x < png.width; ++x) {
            const colour = pixels[y][x] ? foreground : background;
            for(let component = 0; component < 4; ++component) {
                png.data[((x + (y * png.width)) << 2) + component] = colour[component] || 0;
            }
        }
    }
    return png.pack();
}

module.exports = {
    fonts,
    render,
    renderPNG
}