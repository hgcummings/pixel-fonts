# js-pixel-fonts
Pixel fonts in pure JS

[![npm version](https://badge.fury.io/js/js-pixel-fonts.svg)](https://badge.fury.io/js/js-pixel-fonts)

![Sample of Seven plus font](https://github.com/hgcummings/pixel-fonts/raw/master/samples/sevenPlus.png)

## Installation

```npm install js-pixel-fonts --save```

## Usage

### Examples

Render as an array of pixels, for using elsewhere (e.g. drawing to canvas, controlling LEDs):

```javascript
const { fonts, renderPixels } = require('js-pixel-fonts');

const pixels = renderPixels("Hi!", fonts.sevenPlus);

/**
 * pixels === [
 *   [ 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1 ],
 *   [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ],
 *   [ 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1 ],
 *   [ 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1 ],
 *   [ 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1 ],
 *   [ 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 ],
 *   [ 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1 ]
 * ]
 */
```

Render as a PNG: see [samples.js](https://github.com/hgcummings/pixel-fonts/blob/master/samples.js).

### API

#### `fonts`

Set of available fonts. Each font has a `glyphs` property describing the font, but all you need to do is pass the whole font object into one of the `render...` methods.

#### `renderPixels(text, font)`

Renders the supplied `text` string in the specified `font` as an array of arrays of pixels. Each array represents a single row, with each element (`1` or `0`) representing whether the pixel should be active or not.

#### `renderImage(text, font, renderOptions)`

Renders the supplied `text` string in the specified `font` as an image. Returns a stream of PNG data that can be piped to a file or elsewhere. `fontOptions` takes the following properties:

* `foreground`: array of RGB(A) values, 0-255 (alpha channel defaults to 255 if not specified) for the text colour
* `background`: array of RGB(A) values, 0-255 (alpha channel defaults to 255 if not specified) for the background colour of the image
* `scale` (default `1`): scaling factor (number of pixels per single pixel in the underlying font)
