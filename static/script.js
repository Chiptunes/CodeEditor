
// Libs
var Document = require('./modules/document.js');
var Sidebar = require('./modules/sidebar.js');
var TabBar = require('./modules/tabBar.js')
var sidebar = Sidebar('aside');

if ( params ) {
    Document( params && params.command === 'openFile' ? params.data : 0, function( error, doc ){
        TabBar.appendDocument( doc );
    });
}
