
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

          // To Do -> error
          fsnode.read( function( error, data ){
            // To Do -> error
            callback( null, data );
          });

        });

      }

    },

    // Create document and append default value
    function( value, callback ){

      $('.code-editor').css('display', 'none');

      var editorId  = documentCounter++;
      var editorElm = $( CODE_ELEMENT );

      $('.code-container').append( editorElm );

      var editor    = CodeMirror( editorElm[0], {

        lineNumbers    : true,
        theme          : 'monokai',
        scrollbarStyle : "simple"

      });

      editorElm.addClass( 'editor-' + editorId );
      var editorItem = $( editor.getWrapperElement() ).addClass( 'editor-' + editorId );

      editor.setValue( value );

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
