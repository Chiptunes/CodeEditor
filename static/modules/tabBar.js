
var Tab = require('./tab.js');

module.exports = {

  appendDocument : function( document ){

    if ( typeof document !== 'number' ) {
        if ( typeof document === 'string' ) {
            document = parseInt( document );
        } else  {
            document = document.id;
        }

    }

    var tab = new Tab( document );

  }

};
