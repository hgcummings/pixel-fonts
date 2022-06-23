const bench = require('nanobench')

bench('Two line text 100,000 times', function(b) {
    const text = "1: The quick brown fox\nran over the lazy dog.";
    const { fonts, renderPixels } = require('./index');

    b.start();

    for (let i = 0; i < 100000; ++i) {
        renderPixels(text, fonts.sevenPlus);
    }

    b.end();
});