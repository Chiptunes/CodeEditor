
// Import module
var CodeMirror = require('../bower_components/codemirror/lib/codemirror.js');

// Enable addons
require('../bower_components/codemirror/addon/scroll/simplescrollbars.js');

// Enable modes
require('../bower_components/codemirror/mode/javascript/javascript.js');
require('../bower_components/codemirror/mode/htmlmixed/htmlmixed.js');
require('../bower_components/codemirror/mode/css/css.js');

module.exports = CodeMirror;
