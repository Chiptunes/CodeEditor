
// Modules
var async = require('../bower_components/async/dist/async.js');
var CodeMirror = require('./codemirror.js');

// Variables
var documentCounter = 0;

// Elementos
var CODE_ELEMENT = '<section class="code-editor"></section>';

// Main module
module.exports = function( id, callback ){

  async.waterfall([

    // Get default value
    function( callback ){

      if( !id ){
        return callback( null, '' );
      }else{

        wz.fs( id, function( error, fsnode ){
            // To do  -> error
            callback( null, fsnode );
        });

      }

    },

    // Create document and append default value
    function( fsnode, callback ){

      $('.code-editor').css('display', 'none');

      var editorId  = documentCounter++;
      var editorElm = $( CODE_ELEMENT );

      $('.code-container').append( editorElm );

      var extension = fsnode.name.split('.')[1];
      var mode;

      if (extension === 'html') {
          mode = 'htmlmixed';
      } else if (extension === 'css') {
          mode = 'css';
      } else {
          mode = 'javascript';
      }

      var editor = CodeMirror( editorElm[0], {

          lineNumbers    : true,
          theme          : 'monokai',
          scrollbarStyle : "simple",
          mode           : mode

      });

      editor.setOption('extraKeys', {
          'Ctrl-S': function () {

              fsnode.write( editor.getValue(), function () {
                  $('.tab.active').removeClass('hasChanged');
              });

          },
          'Ctrl-W': function () {

              var id   = $('.tab.active').attr('data-id');
              var next = ($('.tab.active').prev().length) ? $('.tab.active').prev() : $('.tab.active').next();

              $('.tab.active').remove();
              $('.editor-' + next.addClass('active').attr('data-id')).show().focus();

              $('.editor-' + id).remove();

          }
      });

      editorElm.addClass( 'editor-' + editorId );
      var editorItem = $( editor.getWrapperElement() ).addClass( 'editor-' + editorId );

      fsnode.read(function( error, data ) {
          editor.setValue( data );

          editor.on('change', function (cm, change) {
              $('.tab.active').addClass('hasChanged');
          });
      });

      callback( null, {
          id      : editorId,
          editor  : editor,
          element : editorItem
      });

    }

  ], function( error, document ){
    callback( error, document );
  });

};
