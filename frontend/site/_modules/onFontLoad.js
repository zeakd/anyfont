var $ = require('jquery')

module.exports = function onFontLoaded(font) {
  var glyphsDiv, i, x, y, fontSize;
  var $board = $('.board')
  $board.html('')
  console.log("-- onFontLoaded")

  var
    fontSize = 30,
    x = 0,
    y = fontSize,
    glyphCanvasWidth = 80;
  ;

  var count = 0;
  var glyphLength = font.glyphs.length ;

  for (i = 0; i < glyphLength; i++) {
    // get a glyph
    glyph = font.glyphs.get(i);
    // console.log(glyph)
    // empty glyph check
    if (
      glyph.unicode >= 44032 && // 가
      glyph.path &&
      glyph.path.commands.length > 0
    ) {
      console.log(glyph)
      var $glyph = $('<div></div>').addClass('glyph');
      var canv = createGlyphCanvas(glyphCanvasWidth);
      var ctx = canv.getContext('2d')
      glyph.draw(ctx, x, y, fontSize);

      $glyph.append(canv)
      $glyph.data('unicode', glyph.unicode)
      $glyph.data('index', i)
      $board.append($glyph)
      count++;
    }

    if (count > 1000 - 11) break;
    // glyph.drawPoints(ctx, x, y, fontSize);
    // glyph.drawMetrics(ctx, x, y, fontSize);
  }
  // var glyph = font.glyphs.get(1500);
      // glyphWidth = glyph.advanceWidth * glyphScale,
      // xmin = (width - glyphWidth)/2,
      // xmax = (width + glyphWidth)/2,
      // x0 = xmin;
}

function createGlyphCanvas(size) {
  var canvas = $('<canvas>').attr({
    width: size,
    height: size
  })

  return canvas[0];
}
