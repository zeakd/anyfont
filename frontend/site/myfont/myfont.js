$ = require('jquery');
var glyphSize = 80;

function imagesName() {
  var names = [];
  for (var i = 0; i < 70; i++) {
    var numStrArr = ["0", "0", "0"];
    var numLen = i.toString().length;
    var args = [numStrArr.length - numLen, numLen].concat(i.toString().split(''))

    numStrArr.splice.apply(numStrArr, args);
    names.push('../images/generated/inferred_' + numStrArr.join("") + '9.png')
  }
  return names;
}

function putAllGlyphs() {
  var x = 0;
  var y = 0;
  var unicode = 0xAC00;
  var images = imagesName();
  var imagesIdx = 0;
  var $glyphs = $('.glyphs');
  while (unicode <= 0xD7A3) {
    var $glyph = $('<div></div>')
      .addClass('glyph')
      .attr('unicode', unicode)
      .attr('x', x)
      .attr('y', y)
      .css({
        'background-image': 'url(' + images[imagesIdx] + ')',
        'background-position': -x*glyphSize + 'px ' + -y*glyphSize + 'px'
      });
    // last image is small
    if (imagesIdx === images.length - 1) { $glyph.addClass('last')}
    $glyphs.append($glyph);

    y = (y + 1) % 16;
    if (y == 0) {
      x = (x + 1) % 10;
      if (x == 0) {
        imagesIdx++;
      }
    }
    unicode++;
  }
}

function init() {
  putAllGlyphs();
  /**
   * search
   */
  var $findCharacter = $('.find-character');
  var $findInput = $findCharacter.find('input');

  $findInput.on('change', function (e) {
    var text = e.target.value;
    var chars = text.split("");
    chars = chars.map(function(c) {
      return c.charCodeAt();
    })
    // var unicodeOfInput = text.charCodeAt()
    var $glyphs = $('.glyph');

    if (text === '') {
      $glyphs.css('display', 'inline-block')
    } else {
      $glyphs.filter(function (idx, elem) {
        var $elem = $(elem);
        if (chars.includes(Number($elem.attr('unicode')))) {
          $elem.css('display', 'inline-block');
        }
        return !chars.includes(Number($elem.attr('unicode')))
      }).css('display', 'none')
    }
  })

  var $glyphs = $('.glyph');
  var $detailModal = $('.detail-modal');
  var $detailModalClose = $detailModal.find('.close');

  $glyphs.on('click', function (e) {
    $detailModal.addClass('is-active');
    $('body').addClass('modal-open');
    $detailModal.find('.detail-glyph').css({
      'background-image': $(this).css('background-image'),
      'background-position': -200*$(this).attr('x') + 'px ' + -200*$(this).attr('y') + 'px'
    })
  })

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
}

$(document).ready(init)
