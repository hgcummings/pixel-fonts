const log = require('loglevel');
const { PNG } = require('pngjs');

const fonts = {
    sevenPlus: require('./data/seven-plus.json'),
    slumbers: require('./data/slumbers.json')
};

const gap = [[0]];

const areTouching = (first, second) => {
    for (let i = 0; i < first.length; ++i) {
        if (first[i] && first[i][first[i].length - 1] === 1) {
            for (j = -1; j <= 1; ++j) {
                if (second[i+j] && second[i+j][0] === 1) {
                    return true;
                }
            }
        }
    }
}

const renderLine  = (text, font) => {
    const letters = text.split("");
    const characters = [];
    let maxHeight = 0;
    for (let letter of letters) {
        let glyph = font.glyphs[""];
        if (font.glyphs[letter]) {
            glyph = font.glyphs[letter]
        } else {
            log.warn(`Missing letter ${letter}`)
        }
        let newCharacter = [];
        glyph.pixels.forEach((row, index) => {
            newCharacter[index + glyph.offset] = row;
        });
        maxHeight = Math.max(maxHeight, newCharacter.length);
        if (font.isFixedWidth ||
            (characters.length && areTouching(characters[characters.length-1], newCharacter))) {
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
}

const renderPixels = (text, font) => {
    const lines = text.split("\n").map(line => [[0]].concat(renderLine(line, font)));
    lines[0].shift();
    return [].concat(...lines);
};

const withAlpha = ([r, g, b, a = 255]) => [r, g, b, a];

const renderImage = (text, font, { foreground, background, scale = 1}) => {
    const pixels = renderPixels(text, font);
    const width = pixels.reduce((acc, cur) => Math.max(acc, cur.length), 0);
    const height = pixels.length;
    const png = new PNG({
        width: width * scale,
        height: height * scale
    });

    const foregroundColour = withAlpha(foreground);
    const backgroundColour = withAlpha(background);
    for (let y = 0; y < height; ++y) {
        for(let x = 0; x < width; ++x) {
            const colour = pixels[y][x] ? foregroundColour : backgroundColour;
            for(let j = 0; j < scale; ++j) {
                for (let i = 0; i < scale; ++i) {
                    for(let component = 0; component < 4; ++component) {
                        png.data[(((x * scale + i) + ((y * scale + j) * png.width)) << 2) + component] =
                            colour[component];
                    }
                }
            }
        }
    }
    return png.pack();
}

module.exports = {
    fonts,
    renderPixels,
    renderImage
}