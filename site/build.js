var $ = require('jquery');
var opentype = require('opentype.js')
var onFontLoaded = require('./_modules/onFontLoad');
var getParameterByName = require('./_modules/getParameterByName');

$(document).ready(function () {
  var $detailModal = $('.detail-modal');
  var $detailModalClose = $detailModal.find('.close');

  /**
   * for demo
   */
  var fontname = getParameterByName('fontname');
  var filename = getFilenameByFontname(fontname);
  var filepath = 'fonts/' + filename + '.ttf';

  opentype.load(filepath, function(err, font) {
    if (err) {
      alert('Could not load font: ' + err);
    } else {
      onFontLoaded(font);
      var $glyphs = $('.glyph');
      $glyphs.on('click', function (e) {
        $detailModal.addClass('is-active');
        $('body').addClass('modal-open');

        drawLargeGlyph($(this).data('index'), font)
      })
    }
  })

  if (filename) {
    var $otfDownloadButton = $('.download-otf');
    $otfDownloadButton.attr("href", 'fonts/' + filename + '.otf')
    var $ttfDownloadButton = $('.download-ttf');
    $ttfDownloadButton.attr("href", 'fonts/' + filename + '.ttf')
  }

  $('.test-modal textarea').css('font-family', fontname);

  /**
   * download
   */
  var $downloadButton = $('.download-button');
  var $downloadModal = $('.download-modal');
  var $downloadModalClose = $downloadModal.find('.close');

  $downloadButton.on('click', function (e) {
    $downloadModal.addClass('is-active');
    // $(window).on('scroll', preventScroll);
    // downloadModal.on('scroll', preventScroll);
    $('body').addClass('modal-open');
  })

  $downloadModalClose.on('click', function (e) {
    $downloadModal.removeClass('is-active');
    $('body').removeClass('modal-open');
  })

  /* test */
  var $testButton = $('.test-button');
  var $testModal = $('.test-modal');
  var $testModalClose = $testModal.find('.close');
  $testButton.on('click', function (e) {
    $testModal.addClass('is-active');
    // $(window).on('scroll', preventScroll);
    // downloadModal.on('scroll', preventScroll);
    $('body').addClass('modal-open');
  })

  $testModalClose.on('click', function (e) {
    $testModal.removeClass('is-active');
    $('body').removeClass('modal-open');
  })

  /**
   * glyph detail
   */
  $detailModalClose.on('click', function (e) {
    $detailModal.removeClass('is-active');
    $('body').removeClass('modal-open');
  })


  /**
   * search
   */
  var virtualBoard = $('div');
  var $findCharacter = $('.find-character');
  var $findInput = $findCharacter.find('input');

  $findInput.on('change', function (e) {
    var text = e.target.value
    var unicodeOfInput = text.charCodeAt()
    var $glyphs = $('.glyph');

    if (text === '') {
      $glyphs.css('display', 'inline-block')
    } else {
      $glyphs.filter(function (idx, elem) {
        var $elem = $(elem);
        if ($elem.data('unicode') === unicodeOfInput) {
          $elem.css('display', 'inline-block');
        }
        return $elem.data('unicode') !== unicodeOfInput
      }).css('display', 'none')
    }
  })
})

function getFilenameByFontname(fontname) {
  if (fontname === 'koverwatch') {
    return 'koverwatch'
  } else if (fontname === 'hanna') {
    return 'BMHANNA_11yrs'
  }
}

function drawLargeGlyph(index, font) {
  var canv = $('.detail-modal canvas')[0];
  var ctx = canv.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canv.width, canv.height);
  var glyph = font.glyphs.get(index);

  var cellWidth = 0.8 * canv.width;
  var cellHeight = 0.8 * canv.height;
  var fontScale = Math.min(cellWidth/(glyph.xMax - glyph.xMin), cellHeight/(glyph.yMax - glyph.yMin));
  var glyphWidth = glyph.advanceWidth * fontScale;

  var baseline = cellHeight * 0.1 + cellHeight * glyph.yMax / (glyph.yMax - glyph.yMin);

  glyph.draw(ctx, cellWidth * 0.1 + ((cellWidth - glyphWidth) / 2), baseline, fontScale * font.unitsPerEm)
}
