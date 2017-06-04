var $ = require('jquery');
var opentype = require('opentype.js')
var onFontLoaded = require('./_modules/onFontLoad');

$(document).ready(function () {
  var fontname = '';

  function onReadFile(e) {
    // document.getElementById('font-name').innerHTML = '';
    var file = e.target.files[0];
    var reader = new FileReader();
    console.log(file);
    reader.onload = function(e) {
        font = opentype.parse(e.target.result);
        onFontLoaded(font);
        availableBuild();
    }

    reader.onerror = function(err) {
        // showErrorMessage(err.toString());
    }

    reader.readAsArrayBuffer(file);

    // // for demo
    // var fontname = file.name.replace(/\.[^/.]+$/, "");
    // fontname = fontname.split('-')[0];
    // var $buildButton = $('.build-button');
    // var oldHref = $buildButton.attr('href')
    // $buildButton.attr('href', oldHref + '?fontname=' + fontname);
  }

  var fontInput = $('#font-input');
  fontInput.on('change', onReadFile)


})

function availableBuild() {
  $('.build-button').removeAttr('disabled');
}
